# Quick Start Guide

## For Development

```bash
# Install dependencies
npm install

# Start backend with hot-reload
npm run dev

# Open http://localhost:3001 in your browser
```

## For Production

```bash
# Install dependencies
npm install

# Build frontend
npm run build

# Start production server
npm start

# Open http://localhost:3001 in your browser
```

## API Quick Reference

### Get all persons
```bash
curl http://localhost:3001/api/persons
```

### Get one person
```bash
curl http://localhost:3001/api/persons/1
```

### Add a new person
```bash
curl -X POST http://localhost:3001/api/persons \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","number":"555-1234"}'
```

### Delete a person
```bash
curl -X DELETE http://localhost:3001/api/persons/1
```

### Get phonebook info
```bash
curl http://localhost:3001/info
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Fly.io and Render instructions.
