# 🚀 Vercel + Render Deployment - Quick Start

## 📋 What You're Deploying

- **Frontend**: React + Vite app → **Vercel**
- **Backend**: Node.js Express API → **Render**

---

## ⚡ Quick Summary

| Step | Where | Action |
|------|-------|--------|
| 1️⃣ | Render | Create web service, deploy backend |
| 2️⃣ | Vercel | Connect repo, set environment variable |
| 3️⃣ | Vercel | Deploy frontend |
| 4️⃣ | Your App | Test features end-to-end |

---

## 🔗 Expected URLs After Deployment

```
Frontend:  https://ecommerce-admin-portal.vercel.app
Backend:   https://ecommerce-admin-backend.onrender.com
API:       https://ecommerce-admin-backend.onrender.com/products
```

(Names may vary based on your Render/Vercel project names)

---

## 📝 Configuration Needed

### For Vercel Deployment

Set this environment variable in Vercel project settings:

```
VITE_API_BASE_URL = https://ecommerce-admin-backend.onrender.com
```

Replace `ecommerce-admin-backend` with your actual Render service name.

---

### For Render Deployment

No configuration needed! The server.js is already configured to:
- Read PORT from environment
- Enable CORS
- Load db.json
- Handle all API routes

---

## ✅ Verification Checklist

After deployment:

- [ ] Backend URL loads in browser (should show JSON)
- [ ] Frontend loads without errors
- [ ] Can view products list
- [ ] Can add a new product
- [ ] Can edit a product
- [ ] Can delete a product
- [ ] Can search products

---

## 🆘 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Frontend loads but "Cannot connect to backend" | Check `VITE_API_BASE_URL` in Vercel is correct |
| Backend returns 404 | Verify Render service is running (check dashboard) |
| CORS error in browser console | CORS is enabled in server.js ✅ (should work) |
| Products list is empty | Normal! Add products via UI. Data is in-memory. |

---

## 📊 Real Deployment URLs (Examples)

```bash
# After deployment, your URLs might look like:

Frontend:
https://ecommerce-admin-portal.vercel.app
https://ecommerce-admin-portal-production.up.railway.app

Backend:
https://ecommerce-admin-backend.onrender.com
https://coffee-api.onrender.com

API Calls:
GET  https://ecommerce-admin-backend.onrender.com/products
POST https://ecommerce-admin-backend.onrender.com/products
```

---

## 🔧 For Detailed Steps

See: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

This file has step-by-step instructions for:
- Creating Render account & deploying backend
- Creating Vercel account & deploying frontend
- Configuring environment variables
- Troubleshooting
- Making updates after deployment

---

## 💡 Key Things to Remember

1. **Render service URL**: You'll get this after deploying to Render
2. **Use that URL** in Vercel's `VITE_API_BASE_URL` environment variable
3. **Rebuild on Vercel** after setting the environment variable
4. **Test each feature** - create, read, update, delete products

---

## 🎯 Next Action

1. Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step instructions
2. Deploy backend to Render first
3. Deploy frontend to Vercel second
4. Share your app URL with the world! 🎉

