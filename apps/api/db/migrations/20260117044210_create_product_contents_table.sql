-- migrate:up
CREATE TABLE product_contents (
  id VARCHAR(255) PRIMARY KEY,
  product_id VARCHAR(255) NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('file', 'rich_text')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 1,
  -- AUDIT
	is_enabled BOOLEAN DEFAULT TRUE,
	is_deleted BOOLEAN DEFAULT FALSE,
	created_by VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT now(),
	updated_by VARCHAR(255) NOT NULL,
	updated_at TIMESTAMP DEFAULT now(),
	deleted_by VARCHAR(255),
	deleted_at TIMESTAMP,
  CONSTRAINT fk_product_contents_products
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- migrate:down
DROP TABLE "product_contents"