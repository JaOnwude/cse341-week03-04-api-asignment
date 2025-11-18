# Rural HealthConnect API (Starter)

This is a starter Node.js + Express + Mongoose backend for the Rural HealthConnect project.
It includes two collections (Patients, Consultations), full CRUD, validation, error handling,
JWT authentication (users), Swagger docs, and a seed script with sample data.

## Quick start
1. Copy `.env.example` to `.env` and populate `MONGODB_URI` and `JWT_SECRET`.
2. `npm install`
3. `npm run seed`  # inserts sample patients + consultations
4. `npm start`
5. API docs available at `http://localhost:8080/api-docs`

## Endpoints (summary)
- /auth/register (POST)   register user (patient or doctor)
- /auth/login (POST)      login -> returns JWT
- /patients (GET/POST)
- /patients/:id (GET/PUT/DELETE)
- /consultations (GET/POST)  (POST protected)
- /consultations/:id (GET/PUT/DELETE) (protected for write operations)
