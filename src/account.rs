use axum::{Extension, Json};

use crate::db::model::User;
use serde::Serialize;

#[derive(Serialize)]
pub struct UserDetails {
    pub id: String,
    pub username: String,
}

pub async fn me(Extension(user): Extension<User>) -> Json<UserDetails> {
    Json(UserDetails {
        id: user.id.to_string(),
        username: user.username,
    })
}
