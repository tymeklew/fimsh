use axum::{http::StatusCode, response::IntoResponse};
use bcrypt::BcryptError;
use diesel_async::pooled_connection::{bb8::RunError, PoolError};
use std::env::VarError;
use tracing::error;
use uuid::Error as UuidError;
use validator::ValidationErrors;

use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("Failed to load env vars from .env : {0}")]
    Dotenv(#[from] dotenvy::Error),
    #[error("Failed to load enviroment variable : {0}")]
    VarError(#[from] VarError),
    #[error("Pool error : {0}")]
    PoolError(#[from] PoolError),
    #[error("Some run error : {0}")]
    RunError(#[from] RunError),
    #[error("Diesel fucked something up : {0}")]
    Diesel(#[from] diesel::result::Error),
    #[error("Some validation errorr : {0}")]
    Validate(#[from] ValidationErrors),
    #[error("Bcrypt errror : {0}")]
    Bcrypt(#[from] BcryptError),
    #[error("Failed to parse uuid : {0}")]
    Uuid(#[from] UuidError),
    #[error("Just some status code : {0}")]
    Status(StatusCode),
}

impl IntoResponse for AppError {
    fn into_response(self) -> axum::response::Response {
        error!("Error : {}", self);

        match self {
            AppError::Status(status) => status.into_response(),
            AppError::Validate(_) => StatusCode::BAD_REQUEST.into_response(),
            _ => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
        }
    }
}

impl From<StatusCode> for AppError {
    fn from(value: StatusCode) -> Self {
        AppError::Status(value)
    }
}
