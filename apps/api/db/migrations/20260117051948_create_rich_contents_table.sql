-- migrate:up
CREATE TABLE rich_contents (
  id VARCHAR(255) PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('Product', 'ProductContent')),
  entity_id VARCHAR(255) NOT NULL,
  description JSONB NOT NULL,
  -- AUDIT
	is_enabled BOOLEAN DEFAULT TRUE,
	is_deleted BOOLEAN DEFAULT FALSE,
	created_by VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT now(),
	updated_by VARCHAR(255) NOT NULL,
	updated_at TIMESTAMP DEFAULT now(),
	deleted_by VARCHAR(255),
	deleted_at TIMESTAMP
);

-- migrate:down
DROP TABLE rich_contents