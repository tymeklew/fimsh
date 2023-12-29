CREATE TABLE IF NOT EXISTS users (
	id uuid NOT NULL,
	email varchar(255) NOT NULL,
	username varchar(20) NOT NULL,
	password varchar(72) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS sessions (
	id uuid NOT NULL,
	user_id uuid NOT NULL,
	created_at timestamp NOT NULL,
	expires_at timestamp NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);
