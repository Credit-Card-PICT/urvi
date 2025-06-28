# AI Recommender System

This is a full-stack AI recommendation system with separate frontend and backend applications.

## Project Structure

```
AIRecommender/
├── AIRecommender-Backend/     # Backend server (Port: 3001)
├── AIRecommender-Frontend/    # Frontend application (Port: 5173)
└── README.md                  # This file
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd AIRecommender-Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```bash
PORT=3001
MONGODB_URI=mongodb://localhost:27017/airecommender
NODE_ENV=development
```

4. Start the development server:

```bash
npm run dev
```

The backend will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd AIRecommender-Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```bash
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=AI Recommender
```

4. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Development

### Backend Development

- **Port**: 3001 (configurable via `PORT` environment variable)
- **Hot Reload**: Yes (using tsx)
- **API Endpoints**:
  - `GET /` - Health check
  - `POST /api/classify` - Intent classification
  - `POST /api/tasks` - Task management

### Frontend Development

- **Port**: 5173 (configurable via Vite)
- **Hot Reload**: Yes (Vite HMR)
- **Framework**: React + TypeScript + Vite
- **UI Library**: Radix UI + Tailwind CSS

## Deployment

### Backend Deployment

1. Build the project:

```bash
cd AIRecommender-Backend
npm run build
```

2. Start production server:

```bash
npm start
```

### Frontend Deployment

1. Build the project:

```bash
cd AIRecommender-Frontend
npm run build
```

2. The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Environment Variables

### Backend (.env)

- `PORT` - Server port (default: 3001)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)

- `VITE_API_URL` - Backend API URL
- `VITE_APP_NAME` - Application name

## Troubleshooting

### Port Conflicts

If you encounter port conflicts:

- Backend: Change `PORT` in backend `.env` file
- Frontend: Change port in `vite.config.ts` or use `--port` flag

### CORS Issues

The backend is configured with CORS enabled. If you change the frontend URL, update the CORS configuration in `AIRecommender-Backend/index.ts`.

### Database Connection

Ensure MongoDB is running and accessible at the URI specified in your backend `.env` file.

## Contributing

1. Make changes in the appropriate directory (Backend or Frontend)
2. Test your changes
3. Commit and push to the appropriate branch:
   - Backend changes: `BE_urvi` branch
   - Frontend changes: `FE_urvi` branch
