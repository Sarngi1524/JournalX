# Pre-Deployment Checklist

Complete this checklist before deploying to Vercel, Render, and MongoDB Atlas.

## Backend Preparation

- [ ] All dependencies installed (`npm install`)
- [ ] No console.log statements left (use logging library)
- [ ] Error handling implemented for all endpoints
- [ ] CORS properly configured in server.js
- [ ] Environment variables have default values
- [ ] Database connection error handling
- [ ] File upload limits configured
- [ ] Rate limiting implemented
- [ ] Input validation on all routes
- [ ] Authentication middleware applied to protected routes
- [ ] `.env.example` file created and committed
- [ ] `package.json` has correct "start" script
- [ ] All routes tested locally
- [ ] No hardcoded URLs (use environment variables)

## Frontend Preparation

- [ ] All dependencies installed (`npm install`)
- [ ] No console.log statements left (use logging libraries)
- [ ] API_BASE_URL uses environment variable
- [ ] Build optimized (`npm run build` works)
- [ ] No development-only code in production build
- [ ] Error boundaries implemented
- [ ] Loading states for all API calls
- [ ] `.env.example` file created and committed
- [ ] All pages tested locally
- [ ] Images optimized for web
- [ ] No hardcoded URLs (use environment variables)
- [ ] Mobile responsive design verified

## Database

- [ ] MongoDB Atlas account created
- [ ] Cluster created (Free tier OK)
- [ ] Database user created with strong password
- [ ] Connection string tested locally
- [ ] Database indexes created (if needed)
- [ ] Backup strategy planned

## Services Setup

### Render
- [ ] Render account created
- [ ] GitHub repository connected
- [ ] render.yaml file in root directory
- [ ] Backend service configured
- [ ] Environment variables configured
- [ ] Backend URL obtained

### Vercel
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] vercel.json file in client directory
- [ ] Root directory set to "client"
- [ ] Build settings configured
- [ ] Environment variables configured

### Cloudinary
- [ ] Cloudinary account created
- [ ] API credentials obtained
- [ ] Upload settings configured
- [ ] Transformation URLs configured (if used)

## Pre-Deployment Testing

### Backend Tests
- [ ] Test auth endpoints (register/login)
- [ ] Test CRUD operations on posts
- [ ] Test comments functionality
- [ ] Test bookmarks functionality
- [ ] Test image upload
- [ ] Test protected routes return 401 without token
- [ ] Test input validation (empty strings, special chars, etc.)
- [ ] Test database connectivity
- [ ] Monitor error logs for issues

### Frontend Tests
- [ ] Test all pages load
- [ ] Test authentication flow (register → login → logout)
- [ ] Test creating a blog post
- [ ] Test editing a blog post
- [ ] Test deleting a blog post
- [ ] Test bookmarking a post
- [ ] Test commenting on a post
- [ ] Test search/filter functionality
- [ ] Test responsive design on mobile
- [ ] Check browser console for errors
- [ ] Test with different screen sizes

### Integration Tests
- [ ] Frontend can communicate with backend
- [ ] Token refresh works correctly
- [ ] CORS issues resolved
- [ ] Images upload and display correctly
- [ ] Database persistence works
- [ ] Session management works across page refreshes

## Security Checklist

- [ ] JWT_SECRET is strong (32+ characters, mixed case, numbers, symbols)
- [ ] No secrets committed to git (.env files in .gitignore)
- [ ] CORS_ORIGIN restricted to frontend domain
- [ ] Passwords hashed with bcrypt
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS prevention (React auto-escapes)
- [ ] CSRF tokens implemented (if needed)
- [ ] Input sanitization on all endpoints
- [ ] Rate limiting on auth endpoints
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] Sensitive data not logged
- [ ] API keys not exposed in frontend
- [ ] MongoDB firewall whitelist IP addresses

## Performance Optimization

- [ ] Frontend minified and optimized
- [ ] Database indexes on frequently queried fields
- [ ] Pagination implemented for large datasets
- [ ] Images optimized/compressed
- [ ] Unused dependencies removed
- [ ] Bundle size analyzed
- [ ] Lazy loading implemented for routes
- [ ] Caching strategy implemented (if applicable)

## Deployment Steps

1. **Prepare Code**
   - [ ] All changes committed to git
   - [ ] No uncommitted changes
   - [ ] Branch is main/master
   - [ ] Code reviewed

2. **Deploy Backend (Render)**
   - [ ] Push code to GitHub
   - [ ] Connect render.yaml or configure manually
   - [ ] Add all environment variables
   - [ ] Monitor deployment logs
   - [ ] Verify API is accessible
   - [ ] Note backend URL

3. **Deploy Frontend (Vercel)**
   - [ ] Push code to GitHub
   - [ ] Set root directory to "client"
   - [ ] Add VITE_API_BASE_URL environment variable
   - [ ] Monitor deployment logs
   - [ ] Verify frontend is accessible

4. **Post-Deployment**
   - [ ] Test full user flow on production
   - [ ] Check performance metrics
   - [ ] Monitor error logs
   - [ ] Set up monitoring/alerts
   - [ ] Document any issues

## Rollback Plan

- [ ] Know how to quickly revert to previous version
- [ ] Test rollback procedure before deployment
- [ ] Keep backup of production database
- [ ] Document critical configurations

## Monitoring & Maintenance

- [ ] Set up error tracking (Sentry, DataDog, etc.)
- [ ] Monitor response times
- [ ] Track database performance
- [ ] Check storage usage
- [ ] Plan for regular backups
- [ ] Schedule dependency updates

## Documentation

- [ ] Deployment guide updated
- [ ] API documentation current
- [ ] Environment variables documented
- [ ] Troubleshooting guide written
- [ ] Team has access to credentials (secure storage)

---

## Sign-Off

- **Deployed By:** _________________
- **Date:** _________________
- **Production URL:** _________________
- **Backend URL:** _________________
- **Notes:** _________________

---

Good luck! 🚀
