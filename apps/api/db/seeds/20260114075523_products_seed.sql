-- migrate:up
INSERT INTO products (
  id,
  seller_id,
  title,
  description,
  price_cents,
  status,
  created_by,
  updated_by
)
VALUES
(
  '7d5d89e5-552d-48e6-a1c2-0d7f301d2c57',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57',
  'Admin Starter Guide',
  'Official admin-written starter guide.',
  1999,
  'published',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57'
),
(
  'fcb261fb-cd06-45e3-a635-8dbb69c500ee',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57',
  'System Setup Checklist',
  'Checklist for configuring a production system.',
  999,
  'draft',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57'
),
(
  'd299b763-cabc-455c-8005-b68402451512',
  'afae806d-f661-4227-a494-c965a51db5ee',
  'Personal Finance Tracker',
  'Track expenses and income easily.',
  4999,
  'published',
  'afae806d-f661-4227-a494-c965a51db5ee',
  'afae806d-f661-4227-a494-c965a51db5ee'
),
(
  'c6e22ed7-db4d-4e21-b330-f86305e156dc',
  'afae806d-f661-4227-a494-c965a51db5ee',
  'Daily Productivity Planner',
  'Boost productivity with daily planning.',
  2999,
  'draft',
  'afae806d-f661-4227-a494-c965a51db5ee',
  'afae806d-f661-4227-a494-c965a51db5ee'
),
(
  '07542c4b-f0c0-4806-a205-2ac0a1a5e2a7',
  'afae806d-f661-4227-a494-c965a51db5ee',
  'Minimal Resume Template',
  'Clean and minimal resume template.',
  1500,
  'published',
  'afae806d-f661-4227-a494-c965a51db5ee',
  'afae806d-f661-4227-a494-c965a51db5ee'
),
(
  '34d62bfe-0947-45a5-96da-4b6edd32d492',
  '0041d5de-6cf9-4e00-b3b7-675f19bb9771',
  'Coffee Lovers Recipe Book',
  'A collection of coffee recipes from around the world.',
  2599,
  'published',
  'afae806d-f661-4227-a494-c965a51db5ee',
  'afae806d-f661-4227-a494-c965a51db5ee'
),
(
  'ffa94d30-b2fa-429a-b45c-a9cff284518b',
  '0041d5de-6cf9-4e00-b3b7-675f19bb9771',
  'JavaScript Cheatsheet',
  'Quick reference for modern JavaScript.',
  1200,
  'draft',
  '0041d5de-6cf9-4e00-b3b7-675f19bb9771',
  '0041d5de-6cf9-4e00-b3b7-675f19bb9771'
),
(
  '853b3927-cf0e-4fc1-b313-639a12b9adc2',
  '0041d5de-6cf9-4e00-b3b7-675f19bb9771',
  'TypeScript Advanced Patterns',
  'Deep dive into advanced TypeScript usage.',
  4500,
  'published',
  '0041d5de-6cf9-4e00-b3b7-675f19bb9771',
  '0041d5de-6cf9-4e00-b3b7-675f19bb9771'
),
(
  '10bf2398-8d92-419c-9161-fbf02c9f2a1a',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57',
  'Infrastructure Security Basics',
  'Learn the fundamentals of securing infrastructure.',
  3499,
  'published',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57',
  '0bb35df6-c89c-4520-a7f0-0bd727a49c57'
),
(
  '05868cb0-a5fa-4a82-9172-e89af5e89f64',
  'afae806d-f661-4227-a494-c965a51db5ee',
  'Remote Work Handbook',
  'Best practices for effective remote work.',
  2799,
  'draft',
  'afae806d-f661-4227-a494-c965a51db5ee',
  'afae806d-f661-4227-a494-c965a51db5ee'
);

-- migrate:down
DELETE FROM products
WHERE id IN (
  '7d5d89e5-552d-48e6-a1c2-0d7f301d2c57',
  'fcb261fb-cd06-45e3-a635-8dbb69c500ee',
  'd299b763-cabc-455c-8005-b68402451512',
  'c6e22ed7-db4d-4e21-b330-f86305e156dc',
  '07542c4b-f0c0-4806-a205-2ac0a1a5e2a7',
  '34d62bfe-0947-45a5-96da-4b6edd32d492',
  'ffa94d30-b2fa-429a-b45c-a9cff284518b',
  '853b3927-cf0e-4fc1-b313-639a12b9adc2',
  '10bf2398-8d92-419c-9161-fbf02c9f2a1a',
  '05868cb0-a5fa-4a82-9172-e89af5e89f64'
);