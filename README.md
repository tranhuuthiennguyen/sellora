# Sellora

Sellora is an E-Commerce platform selling digital products inspired by GumRoad built with React and Fastify

## Installation

1. Install Taskfile:

   ```
   npm install -g @go-task/cli
   ```

   Install Taskfile using other methods: [Taskfile Installation](https://taskfile.dev/docs/installation)
2. Install & Setup Docker
3. Docker Instruction:

   * Start project in dev mode with files hot reload:

   ```
   task up
   ```

   * Start project in prod mode:

   ```
   task up-prod
   ```

## Backlog

### Configuration

* [X] Setup project environment (turborepo with husky + typescript server)
* [X] Setup database (drizzle)
* [X] Setup Docker + Nginx environment

### API

* [X] Authentication (JWT)
* [ ] OAuth2
* [X] Routes
* [X] Controllers
* [X] Models & Services
* [X] Central error handler
* [X] Schema validation * serialization (Typebox)
* [X] CORS
* [ ] Rate Limiter
* [ ] Helmet
* [ ] Event polling
* [ ] Pagination

### WEB

* [X] Register/Login/Logout
* [X] User Profile Management
  * [X] Local: time zone, currency
  * [X] Password
  * [X] Personal details
* [ ] Products Management
  * [ ] User create products
  * [ ] User modify products
  * [ ] User delete products
* [ ] Products Search
* [ ] Orders
* [ ] Payments
* [ ] Analytics
