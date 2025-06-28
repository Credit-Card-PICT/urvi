# AI Recommender Frontend

This is the frontend application for the AI Recommender system.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=AI Recommender
```

3. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server (default port: 5173)
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Port Configuration

The frontend runs on port 5173 by default. Make sure this port is available and not used by other services.

## API Configuration

The frontend is configured to communicate with the backend on port 3001. Update the `VITE_API_URL` in your `.env` file if the backend is running on a different port.
