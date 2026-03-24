# Taska — Todo App with Authentication

A full-stack task management application built with the MERN stack. Users can register, log in, and manage their personal tasks with full CRUD functionality.

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

**Frontend**
- React (Vite)
- Tailwind CSS + shadcn/ui
- Axios
- React Router DOM
- next-themes (dark/light mode)

## Folder Structure
```
taska/
├── server/         # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
├── client/         # React frontend
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── index.html
└── README.md
```

## Prerequisites

Make sure you have the following installed:
- Node.js v18+
- MongoDB (local) or a MongoDB Atlas connection string
- npm

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Shah-Ajmal/taska.git
cd taska
```

### 2. Setup the backend
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```
MONGO_URI=mongodb://localhost:27017/taska
JWT_SECRET=your_jwt_secret_key
PORT=4000
```

Start the backend server:
```bash
npm run dev
```

Server will run on `http://localhost:4000`

### 3. Setup the frontend
```bash
cd client
npm install
```

Create a `.env` file inside `client/`:
```
VITE_API_URL=http://localhost:4000
```

Start the frontend:
```bash
npm run dev
```

App will run on `http://localhost:5173`

## Environment Variables

### server/.env.example

| Variable | Description |
|---|---|
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for signing JWT tokens |
| PORT | Port the server runs on |

### client/.env.example

| Variable | Description |
|---|---|
| VITE_API_URL | Base URL of the backend API |

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /auth/register | Register a new user | No |
| POST | /auth/login | Login and receive JWT | No |

### Tasks

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /tasks | Create a new task | Yes |
| GET | /tasks | Get all tasks for logged in user | Yes |
| PUT | /tasks/:id | Update a task | Yes |
| DELETE | /tasks/:id | Delete a task | Yes |

All protected routes require an `Authorization: Bearer <token>` header.

## Features

- User registration and login with JWT authentication
- Passwords hashed with bcryptjs
- Create, read, update and delete tasks
- Tasks are private — users only see their own
- Task status: Pending, In Progress, Done
- Dark and light mode toggle
- Responsive UI

## Screenshots

> Add screenshots here after deployment

## Deployment

- Frontend: Vercel
- Backend: Render

> Deployment URLs will be updated after deployment