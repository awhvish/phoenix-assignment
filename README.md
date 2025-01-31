# Gadget Management API

## Overview
This project is an API for managing gadgets, built as part of an internship assignment. It provides endpoints to create, update, and retrieve gadget details.

## Features
- CRUD operations for gadgets
- Uses Prisma as ORM for database interactions
- REST API built with Express.js and TypeScript
- Error handling and validation

## Tech Stack
- **Backend:** Node.js, Express.js, Zod, Bcrypt, Swagger
- **Database:** PostgreSQL 
- **ORM:** Prisma

## Setup Instructions
### 1. Clone the repository
```bash
git clone https://github.com/awhvish/phoenix-assignment.git
cd phoenix-assignment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the environment variables
Copy the `.env.example` file and rename it to `.env`:
```bash
cp .env.example .env
```
Update the `.env` file with your database connection details.

### 4. Set up the database
1. Ensure PostgreSQL is running.
2. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```
3. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

### 5. Run the application
```bash
npm run dev
```

## API Documentation
API documentation is available at `/api-docs`. You can access it by running the server and navigating to:
```
http://localhost:PORT/api-docs
```
This documentation provides details on all available endpoints and their request/response formats.

## Troubleshooting
- Ensure `.env` is properly configured with the correct `DATABASE_URL`.
- Run `npx prisma studio` to visually inspect database records.
- Check logs for any database errors.

## License
This project is for internship evaluation purposes only.

---

