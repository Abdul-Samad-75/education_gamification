# Educational Gamification App

A comprehensive MERN stack application that revolutionizes learning through gamification.

## Features

- Interactive Quizzes and Challenges
- Real-time Progress Tracking
- Badge and Trophy System
- Dynamic Leaderboards
- User Authentication and Profiles

## Tech Stack

- MongoDB: Database
- Express.js: Backend Framework
- React.js: Frontend Library
- Node.js: Runtime Environment
- Redux Toolkit: State Management
- JWT: Authentication
- Material-UI: UI Components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd frontend
   npm install
   ```
3. Create a .env file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   NODE_ENV=development
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
education-gamification/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── features/
│       ├── pages/
│       ├── services/
│       └── utils/
├── package.json
└── README.md
```
