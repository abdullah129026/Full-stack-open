# MongoDB Atlas Setup Guide

## Current Status

The phonebook backend is configured to work with **MongoDB Atlas** with an automatic fallback to **in-memory storage** if the database connection fails.

### Storage Mode Detection

- **Primary:** MongoDB Atlas (if connection successful)
- **Fallback:** In-memory storage (if connection fails or URI not set)

## MongoDB Atlas Credentials

Database: `Abdullah`  
Cluster: `abdullah.4bclmmk.mongodb.net`  
Username: `abdullahshaak_db_user`

**Global Config Location:** `~/.claude/config/mongodb-config.env`

## Environment Configuration

The MongoDB URI is stored in `.env` file:

```
MONGODB_URI=mongodb+srv://abdullahshaak_db_user:Asdzxcvb00@abdullah.4bclmmk.mongodb.net/?appName=Abdullah
PORT=3001
```

## Troubleshooting

### Connection Issues

If you see: `✗ MongoDB connection failed: bad auth : authentication failed`

**Possible causes:**
1. Credentials are incorrect
2. IP whitelist needs updating in MongoDB Atlas
3. Network connectivity issues

**Solutions:**
1. Verify credentials in MongoDB Atlas console
2. Add your IP to the IP whitelist in MongoDB Atlas
3. Ensure your internet connection is active
4. Check if the database user has the correct permissions

### Using MongoDB

Once connected, the application will:
- Automatically use MongoDB for all data storage
- Validate phone numbers with format: `XX-XXX` or `XXX-XXXX`
- Ensure unique names (unique index on name field)
- Store all persons in MongoDB

### Data Schema

```javascript
{
  _id: ObjectId,
  name: String (required, unique, min 3 chars),
  number: String (required, min 8 chars, format: XX-XXX)
}
```

## Commands

```bash
# Start with automatic MongoDB/in-memory detection
npm start

# Development mode with auto-reload
npm run dev

# Build frontend
npm run build
```

## Deployment

When deploying to Fly.io or Render:

1. Set the `MONGODB_URI` environment variable in deployment settings
2. Add your deployment server's IP to MongoDB Atlas IP whitelist
3. The application will automatically detect and use MongoDB when available

## Testing

```bash
# Test with current storage mode
npm start

# Check logs to see which storage mode is active
# Should see either:
# ✓ Connected to MongoDB Atlas
# OR
# ⚠️  Falling back to in-memory storage
```
