-- migrate:up
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
	created_at TIMESTAMP DEFAULT now(),
	updated_by VARCHAR(255) NOT NULL,
	updated_at TIMESTAMP DEFAULT now(),
	deleted_by VARCHAR(255),
	deleted_at TIMESTAMP,
	CONSTRAINT users_email_unique UNIQUE("email"),
	CONSTRAINT users_username_unique UNIQUE("username")
);

-- migrate:down
DROP TABLE users