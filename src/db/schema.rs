use diesel::prelude::*;

table! {
    users (id) {
        id -> Uuid,
        // Varchar(20)
        username -> VarChar,
        // Varchar(255)
        email -> VarChar,
        // Varchar (25)
        password -> VarChar,
    }
}

table! {
    sessions (id) {
        id -> Uuid,
        user_id  -> Uuid,
        created_at -> Timestamp,
        expires_at -> Timestamp
    }
}

diesel::joinable!(sessions -> users (user_id));
diesel::allow_tables_to_appear_in_same_query!(sessions, users);
