-- migrate:up
INSERT INTO roles (name, description) VALUES
  ('admin', 'Full platform access'),
  ('user', 'Creator and buyer');

-- Insert permissions
INSERT INTO permissions (name, description) VALUES
  ('create_products', 'Can create products'),
  ('update_products', 'Can update products'),
  ('buy_products', 'Can purchase products'),
  ('manage_users', 'Can manage platform users'),
  ('view_analytics', 'Can view analytics'),
  ('manage_roles', 'Can manage roles and permissions'),
  ('manage_platform', 'Can manage platform settings');

-- Assign all permissions to admin role
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'admin';

-- Assign basic permissions to user role
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'user' AND p.name IN ('create_products', 'buy_products', 'view_analytics');

INSERT INTO users (
  id,
  email,
  password_hash,
  username,
  display_name,
  bio,
  currency_type,
  profile_picture_url,
  country,
  state,
  city,
  zip_code,
  street_address,
  created_by,
  updated_by
)
VALUES
(
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57',
  'admin@example.com',
  '$2a$10$8vkiYN0js.odlUu52TI7zey2NFKlEmShoiuUkfF1xTixM6RQIHsNm',
  'admin_user',
  'Admin User',
  'System administrator account',
  'USD',
  'https://example.com/images/admin.png',
  'USA',
  'California',
  'San Francisco',
  '94105',
  '1 Market Street',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57'
),
(
  '22222222-2222-2222-2222-222222222222',
  'john.doe@example.com',
  '$2b$10$abcdefghijklmnopqrstuvJohnHash1',
  'johndoe',
  'John Doe',
  'Just a normal user',
  'USD',
  'https://example.com/images/john.png',
  'USA',
  'New York',
  'New York',
  '10001',
  '123 Main St',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57'
),
(
  '33333333-3333-3333-3333-333333333333',
  'jane.doe@example.com',
  '$2b$10$abcdefghijklmnopqrstuvJaneHash2',
  'janedoe',
  'Jane Doe',
  'Loves coding and coffee',
  'EUR',
  'https://example.com/images/jane.png',
  'Germany',
  'Bavaria',
  'Munich',
  '80331',
  'Marienplatz 1',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57'
);

-- Assign roles to users
INSERT INTO user_roles (user_id, role_id)
VALUES
  ('0bb35df6-c89c-4520-a7f0-0bd727a49c57', (SELECT id FROM roles WHERE name = 'admin')),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM roles WHERE name = 'user')),
  ('33333333-3333-3333-3333-333333333333', (SELECT id FROM roles WHERE name = 'user'));

-- migrate:down
DELETE FROM user_roles;
DELETE FROM users;
DELETE FROM role_permissions;
DELETE FROM permissions;
DELETE FROM roles;
