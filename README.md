# Book Review API

A full-featured NestJS backend API for managing books and reviews using PostgreSQL and Redis. Built with scalability, caching, and testing in mind.

---

## ✅ Features

* **Books & Reviews CRUD**
* **PostgreSQL** via TypeORM
* **Redis Caching** for book listing
* **Swagger API Docs**
* **Unit Testing** with Jest
* **Environment Variables** via dotenv
* **Docker Support** (Postgres & Redis)

---

## 🏗️ Tech Stack

* **Framework**: NestJS (TypeScript)
* **ORM**: TypeORM
* **DB**: PostgreSQL (with Neon optional)
* **Cache**: Redis
* **API Docs**: Swagger
* **Testing**: Jest + Supertest
* **Validation**: class-validator

---

## 🚀 Quick Start

### Prerequisites

* Node.js (v18+)
* Docker Desktop (for Postgres & Redis)

### Clone & Install

```bash
# Clone project
https://github.com/vivek-singh-rajawat/book-review.git
cd book-review-api

# Install dependencies
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Update `.env` with your values:

```env
DATABASE_URL= // Neon DB url
REDIS_HOST=
REDIS_PORT=
```

---

## 🐳 Run with Docker

Create `docker-compose.yml`:

```yml
version: '3.8'
services:
  db:
    image: postgres:14
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: book_review
    ports:
      - '5432:5432'

  redis:
    image: redis:6
    ports:
      - '6379:6379'
```

Start services:

```bash
docker-compose up -d
```

---

## 🏁 Run the App

```bash
# Start dev mode
npm run start:dev

# Or build & run prod
npm run build
npm run start:prod
```

---

## 📚 API Endpoints

### Books

* `GET /books` — List all books *(cached)*
* `POST /books` — Create book

### Reviews

* `GET /books/:id/reviews` — List reviews for book
* `POST /books/:id/reviews` — Add a review

### Swagger Docs

* `GET /api` — OpenAPI UI

---

## ✅ Testing

### Run All Tests

```bash
npm run test
```

### Watch Mode

```bash
npm run test:watch
```

### Coverage

```bash
npm run test:cov
```

### Sample Test Structure

* `books.controller.spec.ts`
* `reviews.service.spec.ts`

---

## 🧪 Test Example

```ts
it('should create a book', async () => {
  const dto = { title: 'Test', author: 'John' };
  const result = await controller.create(dto);
  expect(result).toEqual({ id: 1, ...dto });
});
```

---

## 🧠 Caching Strategy

* Redis used for `GET /books`
* Cache Key: `books`
* TTL: 300s
* Cache is invalidated on `POST /books`
* If Redis is down, app falls back to DB

---

## 📂 Folder Structure

```
src/
├── books/
│   ├── dto/
│   ├── entities/
│   ├── books.controller.ts
│   └── books.service.ts
├── reviews/
├── cache/
├── main.ts
├── app.module.ts
```

---

## 🌐 Connect NeonDB

In `.env`, use:

```
DATABASE_URL=postgres://<user>:<password>@<host>/<db>
```

Update TypeORM setup in `app.module.ts` to use `url:` if needed.

---

## 🧰 Useful Commands

```bash
# Lint
npm run lint

# Format
npm run format

# Generate migration (if using TypeORM migrations)
npx typeorm migration:generate -d src/migrations/BookInit
```

---

## ✅ Conclusion

This is a complete backend for a book review system built with NestJS. It includes cache, DB, testing, docs, and is production-ready.

Let me know if you want a frontend or deployment setup added!
