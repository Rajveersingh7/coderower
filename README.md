# CodeRower Assignment - MERN Stack

## Setup Instructions

1. Clone repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Create `.env` file in backend
5. Paste the content of `.env.example` to `.env`
6. Change the MONGODB_URI in `.env` to MongoDB connection string
7. Run backend: `npm run dev` (port 8080)
8. Run frontend: `npm run dev` (port 5173)

## Technologies Used

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: React, Vite, Tailwind CSS, Axios, React Router

## API Endpoints

- GET `/api/configurations/{id}` - Fetch 2D array
- PUT `/api/configurations/{id}` - Update remark
