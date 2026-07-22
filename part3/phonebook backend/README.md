# Phonebook Backend

A full-stack phonebook application with React frontend and Node.js/Express backend.

## Features

- View all phonebook entries
- Add new entries with validation
- Delete entries
- Filter entries by name
- Responsive web interface
- RESTful API with error handling
- Request logging with Morgan

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

```bash
npm install
```

## Development

Start the backend server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3001`

## Production Build

Build the frontend:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## API Endpoints

- `GET /api/persons` - Get all phonebook entries
- `GET /api/persons/:id` - Get a specific entry
- `POST /api/persons` - Create a new entry
- `DELETE /api/persons/:id` - Delete an entry
- `GET /info` - Get phonebook info (count and timestamp)

## Frontend

The React frontend is built with Vite and serves the phonebook interface. It communicates with the backend API for all operations.

### Frontend Development

To develop the frontend locally with hot-reload while the backend runs, you may need to start two terminals or configure CORS appropriately.

## Deployment

This application is deployed at: [Add your deployment URL here]

### Deploying to Fly.io or Render

1. Ensure `dist` directory is not in `.gitignore`
2. Build the frontend: `npm run build`
3. Commit and push to your repository
4. Deploy using your platform's CLI or web interface
