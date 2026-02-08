-- migrate:up
INSERT INTO product_contents (
  id,
  product_id,
  content_type,
  title,
  description,
  position,
  created_by,
  updated_by
) VALUES
(
  '801fdf19-41f1-434e-a202-18d99f98b6a0',
  '7d5d89e5-552d-48e6-a1c2-0d7f301d2c57',
  'rich_text',
  'Test Title',
  'Test description',
  0,
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57'
);

-- migrate:down
DELETE FROM product_contents
WHERE id IN (
  '801fdf19-41f1-434e-a202-18d99f98b6a0'
);