-- migrate:up
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
  created_at,
  updated_at
)
VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'admin@example.com',
  '$2b$10$abcdefghijklmnopqrstuvAdminHash',
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
  NOW(),
  NOW()
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
  NOW(),
  NOW()
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
  NOW(),
  NOW()
);

-- migrate:down

