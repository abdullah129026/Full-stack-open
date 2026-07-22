# Deployment Guide

## Pre-Deployment Checklist

- [x] Backend API endpoints working (3.3-3.6)
- [x] Morgan logging configured (3.7-3.8)
- [x] Frontend integrated (3.9)
- [x] Frontend built (`npm run build`)
- [x] dist directory created and populated
- [x] Backend serves frontend from dist
- [x] README.md created

## Deployment Steps

### Option 1: Deploy to Fly.io

1. Install Fly CLI: https://fly.io/docs/hands-on/install-flyctl/

2. Login to Fly.io:
   ```bash
   flyctl auth login
   ```

3. Create a Fly app:
   ```bash
   flyctl launch
   ```

4. Ensure dist directory is in git:
   ```bash
   git add dist/
   git commit -m "Add production build"
   ```

5. Deploy:
   ```bash
   flyctl deploy
   ```

6. Check logs:
   ```bash
   flyctl logs
   ```

### Option 2: Deploy to Render

1. Push code to GitHub

2. Go to https://render.com and sign up/login

3. Create new "Web Service"

4. Connect your GitHub repository

5. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node

6. Deploy

7. Monitor logs in Render dashboard

## Post-Deployment Testing

After deployment:

1. Test API endpoints:
   ```bash
   curl https://your-app-url/api/persons
   curl https://your-app-url/api/persons/1
   ```

2. Test frontend loads at root:
   ```bash
   curl https://your-app-url/
   ```

3. Test in browser at your deployment URL

4. Monitor backend logs for errors

## Troubleshooting

- **Port Issues:** Ensure your app listens on the PORT environment variable or port 3001
- **Missing dist:** Make sure dist directory is committed and not in .gitignore
- **Build fails:** Run `npm run build` locally to test
- **API errors:** Check backend logs for validation or connection issues

