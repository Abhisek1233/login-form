# Login & Registration System (React + Node.js + MongoDB + JWT)

A full-stack authentication app. Users can register, log in, stay logged in after a page refresh, and log out. Passwords are hashed, and protected routes are secured with JSON Web Tokens (JWT).

## Features

- User registration with name, email and password
- User login with JWT authentication
- Password hashing with bcrypt
- Protected API route (token verification middleware)
- Auto-login on page refresh (token check)
- Logout
- Form validation and error messages
- Clean, responsive UI

## Tech Stack

| Layer          | Technology                      |
| -------------- | ------------------------------- |
| Frontend       | React (JavaScript), Vite, Axios |
| Backend        | Node.js, Express                |
| Database       | MongoDB, Mongoose               |
| Authentication | JWT (jsonwebtoken), bcryptjs    |

## Project Structure

```
auth-app/
├── server/
│   ├── server.js            # Express app + MongoDB connection
│   ├── models/User.js       # User schema
│   ├── middleware/auth.js   # JWT verification middleware
│   ├── routes/auth.js       # register, login, me routes
│   ├── .env.example         # sample environment variables
│   └── package.json
└── client/
    ├── src/
    │   ├── App.jsx          # checks token, switches views
    │   ├── AuthForm.jsx     # login / register form
    │   ├── Dashboard.jsx    # page shown after login
    │   ├── api.js           # Axios instance (adds token to requests)
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- MongoDB, either:
  - installed locally ([MongoDB Community Server](https://www.mongodb.com/try/download/community)), or
  - a free cloud database on [MongoDB Atlas](https://www.mongodb.com/atlas)

## Setup and Run

### 1. Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder (copy from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/auth_demo
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

You should see:

```
MongoDB connected
Server running on http://localhost:5000
```

### 2. Frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## Environment Variables

| Variable         | Description                                         |
| ---------------- | --------------------------------------------------- |
| `PORT`           | Port the backend runs on                            |
| `MONGO_URI`      | MongoDB connection string (local or Atlas)          |
| `JWT_SECRET`     | Secret key used to sign and verify tokens           |
| `JWT_EXPIRES_IN` | Token validity (for example `1d`, `2h`)             |
| `CLIENT_URL`     | Frontend URL allowed by CORS                        |

Using MongoDB Atlas? Set `MONGO_URI` like this:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/auth_demo
```

Also add your IP address under **Network Access** in Atlas.

> Never commit your real `.env` file to GitHub. Add `.env` to `.gitignore`.

## How It Works

1. **Register:** the password is hashed with bcrypt and the user is saved in MongoDB. A JWT is returned.
2. **Login:** the server compares the password with the stored hash. If it matches, a JWT is returned.
3. **Token storage:** the frontend saves the token in `localStorage` and sends it as `Authorization: Bearer <token>` with every request.
4. **Protected route:** the `auth` middleware verifies the token before `/api/auth/me` returns user data.
5. **Page refresh:** the app calls `/api/auth/me` with the saved token to keep the user logged in.
6. **Logout:** the token is removed from `localStorage`.

## API Endpoints

| Method | Endpoint             | Auth | Body                          | Description            |
| ------ | -------------------- | ---- | ----------------------------- | ---------------------- |
| POST   | `/api/auth/register` | No   | `{ name, email, password }`   | Create a new account   |
| POST   | `/api/auth/login`    | No   | `{ email, password }`         | Log in, returns token  |
| GET    | `/api/auth/me`       | Yes  | none                          | Get logged-in user     |

### Example response (login / register)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "665f...", "name": "Abhisek", "email": "abhisek@example.com" }
}
```

## Troubleshooting

| Problem                          | Cause and fix                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `ERR_CONNECTION_REFUSED` on port 5000 | Backend is not running. Start it with `npm run dev` in `server`.                          |
| `MongoDB connection error`       | MongoDB is not running or `MONGO_URI` is wrong. Start MongoDB or check your Atlas string.       |
| CORS error in browser            | `CLIENT_URL` in `.env` must match the frontend URL (`http://localhost:5173`).                   |
| `Invalid or expired token`       | Log in again to get a new token.                                                                |

## Future Improvements

- Store the JWT in an httpOnly cookie instead of `localStorage`
- Rate limiting on the login route
- Forgot / reset password via email
- Role-based access (admin / user)

## Author

Abhisek
