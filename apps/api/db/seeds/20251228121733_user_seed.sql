-- migrate:up
INSERT INTO roles (name, description) VALUES
  ('admin', 'Full platform access'),
  ('user', 'Creator and buyer');

-- Insert permissions
INSERT INTO permissions (name, description) VALUES
  ('product.create', 'Create own products'),
  ('product.view.own', 'View own non-deleted products'),
  ('product.update.own', 'Update own products'),
  ('product.delete.own', 'Delete own products'),
  ('product.view.any', 'View any non-deleted products'),
  ('product.update.any', 'Update any products'),
  ('product.delete.any', 'Delete any products'),
  ('product.view.deleted', 'View deleted products'),
  ('product.buy', 'Can purchase products'),
  ('user.create', 'Create own user'),
  ('user.update.own', 'Update own user'),
  ('user.delete.own', 'Delete own user'),
  ('user.update.any', 'Update any user'),
  ('user.delete.any', 'Delete any user');

-- Assign all permissions to admin role
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'admin';

-- Assign basic permissions to user role
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'user' AND p.name IN (
  'product.create',
  'product.view.own',
  'product.update.own',
  'product.delete.own',
  'user.create',
  'user.update.own'
);

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
  'sysadmin@sellora.com',
  '$2a$10$8vkiYN0js.odlUu52TI7zey2NFKlEmShoiuUkfF1xTixM6RQIHsNm', -- Thientai@123
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
  'afae806d-f661-4227-a494-c965a51db5ee',
  'john.doe@example.com',
  '$2a$10$eyMwr0doRYWcIzl9CULyZ.2qYRvVbPz6M8XMhWjF4FXdpgkzzwdyG', -- John@123
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
  '0041d5de-6cf9-4e00-b3b7-675f19bb9771',
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
  ('afae806d-f661-4227-a494-c965a51db5ee', (SELECT id FROM roles WHERE name = 'user')),
  ('0041d5de-6cf9-4e00-b3b7-675f19bb9771', (SELECT id FROM roles WHERE name = 'user'));

-- migrate:down
DELETE FROM user_roles;
DELETE FROM users;
DELETE FROM role_permissions;
DELETE FROM permissions;
DELETE FROM roles;
