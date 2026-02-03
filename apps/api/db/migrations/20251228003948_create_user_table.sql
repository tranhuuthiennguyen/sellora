-- migrate:up
CREATE TABLE roles (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	description TEXT,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE permissions (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	description TEXT,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE role_permissions (
	role_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
	permission_id INT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
	PRIMARY KEY(role_id, permission_id)
);

CREATE TABLE users (
	id VARCHAR(255) PRIMARY KEY NOT NULL,
	email VARCHAR(255) NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	username VARCHAR(50) NOT NULL,
	display_name VARCHAR(100),
	bio VARCHAR(255),
	currency_type VARCHAR(10) DEFAULT 'USD' NOT NULL,
	profile_picture_url VARCHAR,
	country VARCHAR(50),
	state VARCHAR(50),
	city VARCHAR(50),
	zip_code VARCHAR(20),
	street_address VARCHAR(100),
	time_zone VARCHAR(255) DEFAULT 'Pacific Time (US & Canada)' NOT NULL,
	token_version INTEGER DEFAULT 1 NOT NULL,
	-- AUDIT
	is_enabled BOOLEAN DEFAULT TRUE,
	is_deleted BOOLEAN DEFAULT FALSE,
	created_by VARCHAR(255) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT now(),
	updated_by VARCHAR(255) NOT NULL,
	updated_at TIMESTAMPTZ DEFAULT now(),
	deleted_by VARCHAR(255),
	deleted_at TIMESTAMPTZ,
	CONSTRAINT users_email_unique UNIQUE("email"),
	CONSTRAINT users_username_unique UNIQUE("username")
);

CREATE TABLE user_roles (
	user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	role_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
	PRIMARY KEY(user_id, role_id)
);

-- migrate:down
DROP TABLE user_roles;
DROP TABLE users
DROP TABLE role_permissions
DROP TABLE permissions
DROP TABLE roles