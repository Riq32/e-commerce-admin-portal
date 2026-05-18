# ✅ Pre-Deployment Checklist

This checklist verifies your app is ready for Vercel + Render deployment.

---

## 🔍 Backend Configuration (Render)

- ✅ **server.js exists** - Express server with all CRUD endpoints
- ✅ **CORS enabled** - `app.use(cors())` allows frontend to call API
- ✅ **PORT from environment** - `process.env.PORT || 5000`
- ✅ **Listens on 0.0.0.0** - Required for Render deployment
- ✅ **db.json support** - Loads initial data
- ✅ **Error handling** - Returns 404 for missing resources
- ✅ **Data types** - Proper number parsing for price/stock
- ✅ **Endpoints tested** - All CRUD routes working

**Backend Status**: ✅ Ready for Render

---

## 🔍 Frontend Configuration (Vercel)

### Code Changes
- ✅ **API URLs are dynamic** - Uses `VITE_API_BASE_URL` environment variable
- ✅ **Development proxy** - `/api` proxies to localhost:5000 via Vite config
- ✅ **Production URLs** - Automatically uses `VITE_API_BASE_URL` when set
- ✅ **Consistent API calls** - All requests go through the api.js helper

### Build Configuration
- ✅ **vite.config.js** - Proxy configured for local dev
- ✅ **vercel.json** - SPA routing configured
- ✅ **package.json** - Build & start scripts defined
- ✅ **.env.example** - Deployment environment variables documented

### Build Test
- ✅ **`npm run build` succeeds** - No errors or warnings
- ✅ **dist/ folder generated** - Ready for Vercel

**Frontend Status**: ✅ Ready for Vercel

---

## 🔍 Environment Configuration

- ✅ **.env.example created** - Shows required variables
- ✅ **API URL logic** - Handles both dev and production scenarios
- ✅ **VITE_API_BASE_URL documented** - Clear what to set in production

---

## 📋 Files to Commit to GitHub

Make sure these are committed before deploying:

```bash
# Core app files (already committed)
src/
public/
package.json
vite.config.js
server.js
db.json
vercel.json
index.html
eslint.config.js

# New deployment files (commit these!)
.env.example
DEPLOYMENT_GUIDE.md
DEPLOYMENT_QUICKSTART.md
PRE_DEPLOYMENT_CHECKLIST.md
```

---

## 🚀 Deployment Steps Checklist

### Step 1: Deploy Backend to Render
- [ ] Create Render account (render.com)
- [ ] Connect GitHub repository
- [ ] Create new Web Service
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `node server.js`
- [ ] Deploy
- [ ] Get backend URL: `https://xxx.onrender.com`

### Step 2: Deploy Frontend to Vercel
- [ ] Create Vercel account (vercel.com)
- [ ] Connect GitHub repository
- [ ] Set Build Command: `npm run build`
- [ ] Set Output Directory: `dist`
- [ ] Add Environment Variable:
  - Name: `VITE_API_BASE_URL`
  - Value: `https://xxx.onrender.com` (your Render URL)
- [ ] Deploy
- [ ] Get frontend URL: `https://xxx.vercel.app`

### Step 3: Test Deployed App
- [ ] Open frontend URL in browser
- [ ] Check landing page loads
- [ ] Check products list loads (or shows empty)
- [ ] Try adding a new product
- [ ] Try editing a product
- [ ] Try deleting a product
- [ ] Try searching products

---

## 📊 Expected Results

| Feature | Expected Behavior |
|---------|-------------------|
| Frontend loads | Landing page appears |
| Products route | Grid of products loads (might be empty) |
| Add product | Form appears, submit works, product added |
| Edit product | Can change details and save |
| Delete product | Product removed from list |
| Search | Filters products by name/description |
| Backend API | Accessible from browser (if opened directly) |

---

## 🆘 Troubleshooting Reference

### If products don't load:
1. Check browser DevTools Network tab
2. Look for failed requests to backend
3. Verify `VITE_API_BASE_URL` in Vercel matches Render URL
4. Check Render service is running (dashboard)

### If backend returns 500 error:
1. Check Render logs in dashboard
2. Verify `npm install` ran successfully
3. Ensure server.js is syntactically correct
4. Check db.json exists (or fallback data is used)

### If CORS error appears:
1. Check browser console for exact error
2. Verify `cors()` middleware is in server.js
3. Verify frontend and backend URLs are different (this is normal)

---

## 📝 Notes

- **Data is in-memory**: Resets when Render service restarts or during deploys
- **Cold start delay**: Free Render tier has ~30 second startup after inactivity
- **Free tier**: Both Vercel & Render free tiers include this app
- **Scaling**: All features work on free tier for typical usage

---

## ✨ What's Different in Production

| Aspect | Local Dev | Production |
|--------|-----------|------------|
| Frontend URL | http://localhost:3000 | https://*.vercel.app |
| Backend URL | http://localhost:5000 | https://*.onrender.com |
| API proxy | /api → localhost:5000 | Direct to onrender.com |
| Data storage | db.json in-memory | db.json in-memory |
| CORS | Not needed | Enabled (✅ configured) |
| HTTPS | No | Yes (✅ automatic) |

---

## 📞 Having Issues?

Refer to:
1. [DEPLOYMENT_QUICKSTART.md](./DEPLOYMENT_QUICKSTART.md) - Quick reference
2. [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed step-by-step guide
3. Check the Troubleshooting sections in DEPLOYMENT_GUIDE.md

---

## 🎯 You're All Set!

Your app is configured and ready for deployment. Follow the deployment steps above and you'll have a live e-commerce admin portal! 🚀

