# React + Node + MongoDB + JWT Login

## 1. Backend
cd server
npm install
# edit .env (set MONGO_URI and JWT_SECRET)
npm run dev        # http://localhost:5000

## 2. Frontend
cd client
npm install
npm run dev        # http://localhost:5173

## API
POST /api/auth/register  { name, email, password }
POST /api/auth/login     { email, password }
GET  /api/auth/me        (Authorization: Bearer <token>)
