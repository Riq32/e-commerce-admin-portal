# 🔧 Configure Vercel + Render Backend - Detailed Steps

## Your URLs

- **Frontend (Vercel)**: `https://e-commerce-admin-portal-git-main-riq32s-projects.vercel.app`
- **Backend API (Render)**: `https://e-commerce-admin-go4j.onrender.com`

---

## ✅ Step 1: Open Vercel Dashboard

1. Go to https://vercel.com
2. Log in with your GitHub account
3. You should see your projects list

---

## ✅ Step 2: Select Your Project

1. Look for project: **`e-commerce-admin-portal`**
2. Click on it to open the project dashboard

You should see:
- Project name
- Deployment history
- Domains tab
- Settings tab

---

## ✅ Step 3: Navigate to Environment Variables

1. In the project dashboard, click on **Settings** (top navigation)
2. On the left sidebar, click on **Environment Variables**

You should see a form with fields:
- Name
- Value
- Environment (Preview, Production, Development)

---

## ✅ Step 4: Add Environment Variable

### Option A: Add New Variable (Recommended)

1. Click **"Add New"** button
2. Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | `VITE_API_BASE_URL` |
| **Value** | `https://e-commerce-admin-go4j.onrender.com` |
| **Environment** | Select all (Preview, Production, Development) or just **Production** |

3. Click **"Save"** button

**Result**: Variable is saved to Vercel

---

### Option B: Edit Existing Variable (If Already Set)

If `VITE_API_BASE_URL` already exists:

1. Find it in the list
2. Click the **three dots (⋮)** menu
3. Click **"Edit"**
4. Change the value to: `https://e-commerce-admin-go4j.onrender.com`
5. Click **"Save"**

---

## ✅ Step 5: Redeploy Frontend

Now Vercel needs to rebuild with the new environment variable.

### Method 1: Trigger Redeploy from Dashboard (Easiest)

1. Go to **Deployments** tab (top navigation)
2. Find your most recent deployment (should be at top)
3. Look for the **three dots (⋮)** menu on the right side
4. Click on **"Redeploy"**
5. A dialog appears asking to confirm redeploy
6. Click **"Redeploy"** button

**Wait**: Vercel will rebuild (~1-2 minutes)
- You'll see: "Building..." → "Ready"
- When complete, you'll see a green checkmark ✅

---

### Method 2: Push a New Commit (Alternative)

If Method 1 doesn't work, make a small change and push:

```bash
# In your terminal
cd /home/enrique/ecommerce-admin-portal

# Make a small change (comment)
echo "# Updated $(date)" >> README.md

# Commit and push
git add README.md
git commit -m "Trigger Vercel redeploy with Render backend"
git push origin main
```

Vercel will automatically redeploy when it detects the push.

---

## ✅ Step 6: Verify Deployment Success

After redeployment completes:

1. Check the Deployments tab
2. Your latest deployment should show:
   - ✅ Status: **"Ready"** (green checkmark)
   - ✅ Environment Variables populated

---

## ✅ Step 7: Test Your Full Stack

### Test 1: Open Frontend
Open your Vercel URL in browser:
```
https://e-commerce-admin-portal-git-main-riq32s-projects.vercel.app
```

You should see:
- ✅ Landing page loads
- ✅ No "Cannot connect to server" errors

---

### Test 2: Check Browser Console for Errors

1. Press **F12** (or right-click → Inspect)
2. Go to **Console** tab
3. Look for errors (red text)
4. Common errors to check for:
   - ❌ `Cannot connect to https://e-commerce-admin-go4j.onrender.com`
   - ❌ `CORS error`
   - ❌ `404 Not Found`

If you see errors, scroll down to **Troubleshooting** section.

---

### Test 3: Load Products Page

1. Click **"Products"** in navigation
2. Products list should load from Render backend
3. You should see a grid of products (or empty if no products added yet)

---

### Test 4: Add a New Product

1. Click **"Add New Product"** button
2. Fill in the form:
   - Name: `Test Product`
   - Price: `9.99`
   - Stock: `50`
   - Description: `Testing deployment`
3. Click **"Submit"**

**Expected**: Product appears in the list ✅

---

### Test 5: Edit Product

1. Click on a product card
2. Click **"Edit"** button
3. Change a value (e.g., price)
4. Click **"Save"**

**Expected**: Product updates in list ✅

---

### Test 6: Delete Product

1. Click on a product card
2. Click **"Delete"** button
3. Confirm deletion

**Expected**: Product removed from list ✅

---

### Test 7: Verify Backend API Directly

Open your backend URL in a new tab:
```
https://e-commerce-admin-go4j.onrender.com/products
```

**Expected**: You see JSON array of products (or empty array `[]`)

---

## 🆘 Troubleshooting

### Issue 1: "Cannot connect to backend" Error

**Cause**: Environment variable not set or Render backend is down

**Fix**:
1. Verify environment variable in Vercel:
   - Go to Settings → Environment Variables
   - Check `VITE_API_BASE_URL` = `https://e-commerce-admin-go4j.onrender.com`
2. Check Render backend status:
   - Open https://e-commerce-admin-go4j.onrender.com/products
   - Should return JSON
3. If Render shows error, check Render dashboard for service status

---

### Issue 2: CORS Error in Console

**Error message**: 
```
Access to XMLHttpRequest at 'https://e-commerce-admin-go4j.onrender.com/products' 
from origin 'https://e-commerce-admin-portal-git-main-riq32s-projects.vercel.app' 
has been blocked by CORS policy
```

**Cause**: Backend doesn't have CORS enabled

**Fix**:
1. Check your `server.js` has CORS:
   ```javascript
   import cors from 'cors';
   app.use(cors());
   ```
2. If not, add it and redeploy Render backend
3. (Your current server.js should have this already ✅)

---

### Issue 3: 404 Error on API Call

**Error message**:
```
GET https://e-commerce-admin-go4j.onrender.com/products 404
```

**Cause**: Wrong backend URL or endpoint doesn't exist

**Fix**:
1. Double-check backend URL has no typos:
   - Should be: `https://e-commerce-admin-go4j.onrender.com`
   - Not: `http://` (must be HTTPS)
   - Not: `localhost:5000`
2. Test endpoint directly: https://e-commerce-admin-go4j.onrender.com/products

---

### Issue 4: Products List is Empty

**This is normal!** Your database is in-memory.

**Solution**: Add products via the UI:
1. Click "Add New Product"
2. Fill in the form
3. Submit

Each new product will be added to the in-memory database.

**Note**: Products are cleared when Render backend restarts (cold start after 15 min inactivity on free tier).

---

### Issue 5: Vercel Deployment Failed

**Error message**:
```
Build failed or Deployment error
```

**Fix**:
1. Go to Deployments tab
2. Click on failed deployment
3. Scroll down to see error logs
4. Common issues:
   - Missing `VITE_API_BASE_URL` variable
   - Invalid environment variable name
   - Build script error

---

## 📊 Vercel Settings Checklist

After completing these steps:

- ✅ Project: `e-commerce-admin-portal`
- ✅ Environment Variable Added:
  - Name: `VITE_API_BASE_URL`
  - Value: `https://e-commerce-admin-go4j.onrender.com`
- ✅ Redeployed
- ✅ Deployment Status: Ready (green checkmark)
- ✅ Frontend loads: https://e-commerce-admin-portal-git-main-riq32s-projects.vercel.app
- ✅ Backend reachable: https://e-commerce-admin-go4j.onrender.com/products

---

## 🔄 Making Updates After Deployment

### If you update frontend code:

```bash
cd /home/enrique/ecommerce-admin-portal
git add .
git commit -m "Update feature"
git push origin main
```

→ Vercel automatically redeploys in ~2-3 minutes

---

### If you update backend code:

```bash
cd /home/enrique/ecommerce-admin-portal
git add .
git commit -m "Update backend"
git push origin main
```

→ Render automatically redeploys in ~2-3 minutes

---

## ✨ Your Live E-Commerce App

**Fully deployed! 🎉**

- Frontend: https://e-commerce-admin-portal-git-main-riq32s-projects.vercel.app
- Backend: https://e-commerce-admin-go4j.onrender.com
- Can manage products (create, read, update, delete)
- Search products
- Responsive design

---

## 📞 Next Steps

1. ✅ Complete the steps above
2. ✅ Test all features work
3. ✅ Share your app URL with others
4. ✅ For production improvements:
   - Connect real database (PostgreSQL, MongoDB)
   - Add user authentication
   - Add payment processing

