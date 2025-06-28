# AI Recommender Backend

This is the backend server for the AI Recommender application.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/airecommender
NODE_ENV=development
```

3. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm start` - Start production server
- `npm test` - Run tests

## API Endpoints

- `GET /` - Health check
- `POST /api/classify` - Intent classification
- `POST /api/tasks` - Task management endpoints

## Port Configuration

The backend runs on port 3001 by default. Make sure this port is available and not used by other services.
