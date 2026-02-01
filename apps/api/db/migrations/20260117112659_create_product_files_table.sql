-- migrate:up
CREATE TABLE product_files (
  product_id VARCHAR(255) NOT NULL,
  url VARCHAR(1024) PRIMARY KEY,
  file_type TEXT,
  size BIGINT,
  page_count INTEGER DEFAULT 0,
  duration INTEGER,
  width INTEGER,
  height INTEGER,
  -- AUDIT
	is_enabled BOOLEAN DEFAULT TRUE,
	is_deleted BOOLEAN DEFAULT FALSE,
	created_by VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT now(),
	updated_by VARCHAR(255) NOT NULL,
	updated_at TIMESTAMP DEFAULT now(),
	deleted_by VARCHAR(255),
	deleted_at TIMESTAMP,
  CONSTRAINT fk_product_files_products
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- migrate:down
DROP TABLE product_files