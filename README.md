# School Management API

## Endpoints

### POST `/addSchool`
- Body: `{ "name": "...", "address": "...", "latitude": 00.00, "longitude": 00.00 }`

### GET `/listSchools?latitude=00.00&longitude=00.00`

## Setup

```bash
npm install
cp .env.example .env
node app.js
```

## MySQL Table

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```