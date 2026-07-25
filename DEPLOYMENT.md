# JournalX Deployment Guide

This guide covers deploying JournalX to Vercel (Frontend), Render (Backend), and MongoDB Atlas (Database).

## Prerequisites

- GitHub account with your repository
- Vercel account
- Render account
- MongoDB Atlas account
- Cloudinary account for image uploads

## 📊 Architecture Overview

```
┌─────────────────────┐
│   MongoDB Atlas     │
│    (Database)       │
└──────────┬──────────┘
           │
           │
┌──────────▼──────────┐       ┌──────────────────┐
│  Render Backend     │◄──────┤  Vercel Frontend │
│  (Node.js/Express)  │       │  (React/Vite)    │
└─────────────────────┘       └──────────────────┘
```

---

## 1. MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project
4. Create a new cluster (Free tier available)
5. Choose cloud provider and region (closer to your users)
6. Wait for cluster to be created (5-10 minutes)

### Step 2: Create Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create username and strong password
4. Set privileges to "Read and write to any database"
5. Add IP address (0.0.0.0/0 for development, restrict in production)

### Step 3: Get Connection String

1. Go to "Clusters" and click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `myFirstDatabase` with `journalx`

**Example:**
```
mongodb+srv://username:password@cluster.mongodb.net/journalx?retryWrites=true&w=majority
```

---

## 2. Render Backend Deployment

### Step 1: Prepare Your Backend

1. Ensure `server/.env.example` exists with all variables
2. Update `server/server.js` to handle CORS:

```javascript
const cors = require('cors');

app.use(cors({
   origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

3. Push code to GitHub

### Step 2: Deploy on Render

**Option A: Using render.yaml (Recommended)**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Select the branch (main)
5. Click "Deploy"
6. Render will automatically create the backend service and database

**Option B: Manual Deployment**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `journalx-api`
   - **Environment:** Node
   - **Region:** Choose closest to your users
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid for better performance)

### Step 3: Add Environment Variables

1. In Render dashboard, go to your service
2. Click "Environment"
3. Add all variables from `server/.env.example`:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a strong secret key
   - `CLOUD_NAME`: Your Cloudinary name
   - `CLOUDINARY_API_KEY`: Your API key
   - `CLOUDINARY_API_SECRET`: Your API secret
   - `CORS_ORIGIN`: (Update after Vercel deployment)

### Step 4: Monitor Deployment

1. Check "Logs" in Render dashboard
2. Wait for build to complete (2-5 minutes)
3. Your API will be available at: `https://journalx-api.onrender.com`

---

## 3. Vercel Frontend Deployment

### Step 1: Prepare Your Frontend

1. Ensure `client/vercel.json` exists
2. Update `client/.env.example` with production API URL
3. Push code to GitHub

### Step 2: Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the `client` folder as root directory:
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Add Environment Variables

1. In Vercel project settings, go to "Environment Variables"
2. Add: - `VITE_API_BASE_URL`: `https://journalx-api.onrender.com` (your Render backend URL)

### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment to complete (1-3 minutes)
3. Your frontend will be available at: `https://journalx.vercel.app`

---

## 4. Update Backend CORS

After Vercel deployment:

1. Go back to Render dashboard
2. Update `CORS_ORIGIN` environment variable to: `https://journalx.vercel.app`
3. Service will automatically redeploy with new configuration

---

## 5. Testing Deployment

### Test Backend

```bash
curl https://journalx-api.onrender.com/api/posts
```

Should return an empty array or error message (not a network error).

### Test Frontend

1. Visit `https://journalx.vercel.app`
2. Try registering a new account
3. Create a blog post
4. Test bookmarks and comments

---

## 6. Common Issues & Solutions

### Issue: Backend shows "Internal Server Error"

**Solution:**
- Check Render logs for error messages
- Verify MongoDB URI is correct
- Ensure all environment variables are set
- Check if MongoDB Atlas firewall allows Render IP

### Issue: Cannot connect to backend from frontend

**Solution:**
- Verify `VITE_API_BASE_URL` in Vercel environment variables
- Check backend `CORS_ORIGIN` matches frontend URL
- Ensure backend service is running (check Render logs)

### Issue: Image uploads fail

**Solution:**
- Verify Cloudinary credentials are correct
- Check Cloudinary has available upload quota
- Ensure image file size is within limits

### Issue: Login not working

**Solution:**
- Check MongoDB connection string
- Verify JWT_SECRET is set consistently
- Check browser DevTools for API error messages

---

## 7. Database Management

### Backup MongoDB

1. Go to MongoDB Atlas
2. Click your cluster
3. Go to "Backup" tab
4. Create manual backup before major changes

### Monitor Database

1. In MongoDB Atlas, check:
   - Connection usage
   - Query performance
   - Storage size
   - Active connections

---

## 8. Performance Optimization

### Frontend (Vercel)

- Enable "Edge Functions" for faster API responses
- Use Vercel Analytics to monitor performance
- Implement image optimization

### Backend (Render)

- Upgrade to paid plan for better CPU/RAM
- Enable auto-scaling
- Add database indexes for frequently queried fields

### Database (MongoDB)

- Create indexes on frequently searched fields
- Monitor slow queries
- Archive old data periodically

---

## 9. Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Restrict MongoDB IP whitelist to Render server IP
- [ ] Enable 2FA on MongoDB Atlas
- [ ] Set strong database user password
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Set CORS_ORIGIN to specific domain (not *)
- [ ] Regularly update dependencies

---

## 10. Monitoring & Logs

### Render Logs
- Dashboard → Your Service → Logs
- Check for errors, warnings, and request patterns

### Vercel Logs
- Dashboard → Your Project → Deployments → Select Deployment → Logs

### MongoDB Logs
- MongoDB Atlas → Your Cluster → Logs
- Monitor slow queries and connections

---

## 11. Updating Deployed Code

### Push Updates

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

3. Services will automatically redeploy:
   - **Vercel:** Auto-deploys on push to main
   - **Render:** Auto-deploys if webhook is connected

### Manual Redeploy

- **Vercel:** Dashboard → Deployments → Redeploy
- **Render:** Dashboard → Service → Manual Deploy

---

## 12. Cost Optimization

| Service | Free Tier | Cost |
|---------|-----------|------|
| MongoDB Atlas | 512MB storage | $0-57/month |
| Render | Limited resources, no free database | $7+/month |
| Vercel | 100GB bandwidth | $0-20/month |
| Cloudinary | 25 credits/month | $0-99/month |

**Estimated Monthly Cost:** $7-20 (minimal usage)

---

## Quick Reference

| Component | Service | URL |
|-----------|---------|-----|
| Database | MongoDB Atlas | `mongodb+srv://...` |
| Backend API | Render | `https://journalx-api.onrender.com` |
| Frontend | Vercel | `https://journalx.vercel.app` |

---

## Need Help?

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://www.mongodb.com/docs/atlas
- **MERN Stack Guide:** Check our README.md

Happy Deploying! 🚀
