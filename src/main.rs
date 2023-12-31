mod account;
mod auth;
mod db;
mod error;
mod util;

use axum::middleware;
use axum::routing::get;
use axum::{routing::post, Router};
use diesel_async::pooled_connection::{bb8::Pool, AsyncDieselConnectionManager};
use diesel_async::AsyncPgConnection;
use error::AppError;
use std::env::var;
use tower_http::services::{ServeDir, ServeFile};
use tower_http::trace::{self, TraceLayer};
use tracing::Level;

#[derive(Clone)]
pub struct AppState {
    pool: Pool<AsyncPgConnection>,
}

impl AppState {
    async fn connect() -> Result<AppState, AppError> {
        // Setup database connection
        let config = AsyncDieselConnectionManager::<AsyncPgConnection>::new(var("DB_URL")?);

        let pool = Pool::builder().build(config).await?;

        Ok(AppState { pool })
    }
}

#[tokio::main]
async fn main() -> Result<(), AppError> {
    dotenvy::dotenv()?;

    tracing_subscriber::fmt()
        .with_target(false)
        .with_writer(std::io::stderr)
        .init();

    let state = AppState::connect().await?;

    let app = Router::new()
        .nest(
            "/api",
            Router::new()
                .route("/account/me", get(account::me))
                .route("/auth/logout", post(auth::sign_out))
                .route_layer(middleware::from_fn_with_state(
                    state.clone(),
                    util::authorization,
                ))
                .route("/auth/signup", post(auth::sign_up))
                .route("/auth/login", post(auth::login)),
        )
        .nest_service(
            "/",
            ServeDir::new("./client/dist")
                .not_found_service(ServeFile::new("./client/dist/index.html")),
        )
        .with_state(state)
        .layer(
            TraceLayer::new_for_http()
                .on_request(trace::DefaultOnRequest::new().level(Level::INFO))
                .on_response(trace::DefaultOnResponse::new().level(Level::INFO)),
        );

    let listener = tokio::net::TcpListener::bind(var("PORT")?).await.unwrap();

    axum::serve(listener, app).await.unwrap();

    Ok(())
}
