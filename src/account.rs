use axum::{Extension, Json};

use crate::{db::model::User, error::AppError};
use serde::Serialize;

#[derive(Serialize)]
pub struct UserDetails {}

pub async fn me(Extension(user): Extension<User>) -> Result<Json<UserDetails>, AppError> {
    todo!()
}
