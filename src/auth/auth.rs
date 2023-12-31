use std::time::{Duration, SystemTime};

use crate::{
    db::{
        model::{Session, User},
        schema::{sessions, users},
    },
    error::AppError,
    AppState,
};
use axum::{extract::State, http::StatusCode, response::Redirect, Extension, Json};
use axum_extra::extract::{cookie::Cookie, CookieJar};
use bcrypt::{hash, verify, DEFAULT_COST};
use diesel::{BoolExpressionMethods, ExpressionMethods, OptionalExtension, QueryDsl};
use diesel_async::RunQueryDsl;
use serde::Deserialize;
use uuid::Uuid;
use validator::Validate;

#[derive(Debug, Deserialize, Validate)]
pub struct SignUpForm {
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 3, max = 20))]
    pub username: String,
    #[validate(length(min = 3, max = 25))]
    pub password: String,
}

pub async fn sign_up(
    State(state): State<AppState>,
    Json(form): Json<SignUpForm>,
) -> Result<StatusCode, AppError> {
    form.validate()?;

    let mut conn = state.pool.get().await?;

    let count = users::table
        .filter(
            users::email
                .eq(&form.email)
                .or(users::username.eq(&form.username)),
        )
        .count()
        .get_result::<i64>(&mut conn)
        .await?;

    if count != 0 {
        return Err(StatusCode::CONFLICT.into());
    }

    let user = User {
        id: Uuid::new_v4(),
        username: form.username,
        email: form.email,
        password: hash(form.password, DEFAULT_COST)?,
    };

    diesel::insert_into(users::table)
        .values(user)
        .execute(&mut conn)
        .await?;

    Ok(StatusCode::CREATED)
}

#[derive(Deserialize)]
pub struct LoginForm {
    pub detail: String,
    pub password: String,
}

pub async fn login(
    State(state): State<AppState>,
    jar: CookieJar,
    Json(form): Json<LoginForm>,
) -> Result<CookieJar, AppError> {
    let mut conn = state.pool.get().await?;

    let user = users::table
        .filter(
            users::email
                .eq(&form.detail)
                .or(users::username.eq(&form.detail)),
        )
        .first::<User>(&mut conn)
        .await
        .optional()?
        .ok_or(StatusCode::UNAUTHORIZED)?;

    if !verify(form.password, &user.password)? {
        return Err(StatusCode::UNAUTHORIZED.into());
    }

    let session = Session {
        id: Uuid::new_v4(),
        user_id: user.id,
        created_at: SystemTime::now(),
        expires_at: SystemTime::now() + Duration::from_secs(60 * 60 * 24 * 14),
    };

    diesel::insert_into(sessions::table)
        .values(&session)
        .execute(&mut conn)
        .await?;

    let mut cookie = Cookie::new("session_id", session.id.to_string());
    cookie.set_path("/");
    cookie.set_http_only(true);

    Ok(jar.add(cookie))
}

pub async fn sign_out(
    State(state): State<AppState>,
    jar: CookieJar,
) -> Result<CookieJar, AppError> {
    let session_id = Uuid::parse_str(
        jar.get("session_id")
            .ok_or(StatusCode::UNAUTHORIZED)?
            .value(),
    )?;

    let mut conn = state.pool.get().await?;

    diesel::delete(sessions::table)
        .filter(sessions::id.eq(session_id))
        .execute(&mut conn)
        .await?;

    Ok(jar.remove(Cookie::from("session_id")))
}
