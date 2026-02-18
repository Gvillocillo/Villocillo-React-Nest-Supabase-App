# Backend - Guest Book API

NestJS backend for the Guest Book application with Supabase integration.

## Features

- RESTful API for guest book comments
- Input validation with class-validator
- Supabase (PostgreSQL) database integration
- CORS enabled for frontend communication
- Clean, modular architecture
- Error handling and logging

## Tech Stack

- NestJS 10
- TypeScript 5
- Supabase Client
- class-validator

## Project Structure

```
src/
├── comments/              # Comments module
│   ├── dto/              # Data Transfer Objects
│   ├── entities/         # Entity definitions
│   ├── comments.controller.ts
│   ├── comments.service.ts
│   └── comments.module.ts
├── supabase/             # Supabase client
│   └── supabase.service.ts
├── app.controller.ts     # Root controller
├── app.service.ts        # Root service
├── app.module.ts         # Root module
└── main.ts              # Application entry point
```

## API Endpoints

### GET / 
Welcome message and API info

### GET /health
Health check endpoint

### GET /comments
Fetch all comments (sorted newest first)

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "message": "string",
    "created_at": "timestamp"
  }
]
```

### POST /comments
Create a new comment

**Request Body:**
```json
{
  "name": "string (1-100 chars, required)",
  "message": "string (1-500 chars, required)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "message": "string",
  "created_at": "timestamp"
}
```

## Environment Variables

Create a `.env` file:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3001
```

## Scripts

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod

# Testing
npm run test

# Linting
npm run lint
```

## Validation Rules

**Name:**
- Required
- String type
- Maximum 100 characters

**Message:**
- Required
- String type
- Maximum 500 characters

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful GET request
- `201 Created` - Successful POST request
- `400 Bad Request` - Validation error
- `500 Internal Server Error` - Server error

## Development

1. Install dependencies: `npm install`
2. Set up Supabase and add credentials to `.env`
3. Run in dev mode: `npm run start:dev`
4. API will be available at `http://localhost:3001`

## Testing

Test endpoints using curl, Postman, or Thunder Client:

```bash
# Get all comments
curl http://localhost:3001/comments

# Create a comment
curl -X POST http://localhost:3001/comments \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","message":"Hello World"}'
```
