-- migrate:up
CREATE TABLE products (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  seller_id VARCHAR(255) NOT NULL,
  title VARCHAR NOT NULL,
  description VARCHAR,
  price_cents INTEGER DEFAULT 0 NOT NULL,
  status TEXT CHECK (status IN ('draft', 'published')),
  content_updated_at TIMESTAMPTZ DEFAULT now(),
  -- AUDIT
	is_enabled BOOLEAN DEFAULT TRUE,
	is_deleted BOOLEAN DEFAULT FALSE,
	created_by VARCHAR(255) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT now(),
	updated_by VARCHAR(255) NOT NULL,
	updated_at TIMESTAMPTZ DEFAULT now(),
	deleted_by VARCHAR(255),
	deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_products_sellers
    FOREIGN KEY (seller_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- migrate:down
DROP TABLE products