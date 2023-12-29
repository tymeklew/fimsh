use std::time::SystemTime;

use super::schema::*;
use diesel::prelude::*;
use uuid::Uuid;

#[derive(Debug, Clone, Insertable, Queryable, PartialEq, Identifiable, Selectable)]
#[diesel(table_name=users)]
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Clone, Insertable, Queryable, Associations, PartialEq, Identifiable)]
#[diesel(table_name=sessions)]
#[diesel(belongs_to(User))]
pub struct Session {
    pub id: Uuid,
    pub user_id: Uuid,
    pub created_at: SystemTime,
    pub expires_at: SystemTime,
}
