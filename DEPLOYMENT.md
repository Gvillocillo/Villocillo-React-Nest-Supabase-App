# 🚀 Deployment Guide - Fix Your Vercel 500 Error

This guide explains how to properly fix the **500 error on Vercel** and deploy your Guest Book application to production.

## ❌ Why You're Getting a 500 Error

Your app crashes because of **3 critical misconfigurations**:

1. **CORS is hardcoded to `localhost`** - Backend rejects requests from your Vercel domain
2. **Frontend API URL isn't set** - Frontend can't find the backend
3. **Environment variables missing** - The app can't connect to Supabase or your backend

---

## ✅ Solution: Proper Production Deployment

### Option A: Backend on Railway/Heroku + Vercel Frontend (Recommended)

#### **Step 1: Deploy Backend to Railway**

1. Go to [railway.app](https://railway.app)
2. Create an account and new project
3. Select "Deploy from GitHub"
4. Connect your repository
5. **Fork this repository's `/backend` folder** or create new service
6. Set environment variables in Railway dashboard:
   ```
   SUPABASE_URL=https://ftolrironsobyxibypzc.supabase.co
   SUPABASE_KEY=sb_publishable_PtBKJRftnBA4nfBoFWqtig_SGs-8tjw
   PORT=3001
   FRONTEND_URL=https://your-app.vercel.app  # Update with your Vercel domain
   NODE_ENV=production
   ```
7. Railway will give you a public URL like: `https://backend-abc123.railway.app`
8. Copy this URL

#### **Step 2: Deploy Frontend to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Create account and click "Import Project"
3. Import your GitHub repository
4. Select the root directory (not just `frontend/`)
5. In "Build and Output Settings", set:
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
6. In Environment Variables, add:
   ```
   NEXT_PUBLIC_API_URL=https://backend-abc123.railway.app
   ```
   Replace `backend-abc123.railway.app` with your actual Railway backend URL
7. Click "Deploy"

#### **Step 3: Update Backend CORS**

The backend now listens for requests from your Vercel domain instead of localhost.

The fix is already in place - just make sure `FRONTEND_URL` environment variable is set correctly in Railway.

---

### Option B: Monorepo on Single Vercel Deployment (Advanced)

If you want everything on Vercel, you need API Routes:

1. Create `/frontend/src/app/api/comments/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.INTERNAL_BACKEND_URL;

export async function GET() {
  const response = await fetch(`${BACKEND_URL}/comments`);
  return NextResponse.json(await response.json());
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const response = await fetch(`${BACKEND_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return NextResponse.json(await response.json());
}
```

2. Update frontend API URL to: `NEXT_PUBLIC_API_URL=/api/comments`
3. Set Vercel env var: `INTERNAL_BACKEND_URL=http://localhost:3001`

---

## 🔍 What Each Environment Variable Does

### Frontend (Vercel) - `NEXT_PUBLIC_API_URL`

The URL where your backend API lives. Must be publicly accessible.

**Examples:**
- Local dev: `http://localhost:3001`
- Railway: `https://guest-book-backend-prod.railway.app`
- Heroku: `https://guest-book-backend.herokuapp.com`
- DigitalOcean: `https://api.guestbook.yourdomain.com`

### Backend (Railway/Heroku) - `FRONTEND_URL`

The URL where your frontend is hosted. Backend uses this for CORS.

**Examples:**
- Vercel: `https://guestbook.vercel.app`
- Custom domain: `https://guestbook.yourdomain.com`

### Backend - `SUPABASE_URL` & `SUPABASE_KEY`

Your database credentials (already configured).

### Backend - `PORT`

The port the server listens on. Default: `3001`

---

## 🧪 Test It Works

### 1. Check Backend Health
```bash
curl https://your-backend-url.railway.app/health
# Should return: {"status":"ok","timestamp":"..."}
```

### 2. Check CORS
Open your Vercel app console (F12 → Console tab) and look for:
- ✅ No CORS errors = Success!
- ❌ CORS errors = Update FRONTEND_URL in backend environment variables

### 3. Test API Call
```bash
curl https://your-backend-url.railway.app/comments
# Should return: [] or [list of comments]
```

---

## 🐛 Troubleshooting

### Error: "Failed to fetch comments"
- Check that `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Verify the backend URL is publicly accessible
- Check browser console for CORS errors

### Error: "CORS error" or "blocked by CORS policy"
- Verify `FRONTEND_URL` environment variable is set in backend
- Make sure it matches your Vercel domain exactly (including `https://`)
- Wait 5-10 minutes for changes to take effect

### 500 Error on page load
- Check that `NEXT_PUBLIC_API_URL` ends without a trailing slash
- Verify backend is running and healthy: `curl your-api-url/health`
- Check Vercel logs: Deployment → View Logs

### Supabase connection fails
- Verify `SUPABASE_URL` and `SUPABASE_KEY` are correct
- Check that Supabase credentials haven't expired
- In Railway/Heroku, confirm environment variables are saved

---

## 📝 Quick Checklist

- [ ] Backend deployed to Railway/Heroku (or similar)
- [ ] Backend URL copied (e.g., `https://backend.railway.app`)
- [ ] Frontend deployed to Vercel
- [ ] `NEXT_PUBLIC_API_URL` set in Vercel environment variables
- [ ] `FRONTEND_URL` set in backend environment variables
- [ ] Backend `/health` endpoint returns `{"status":"ok"}`
- [ ] Frontend loads without CORS errors in console
- [ ] Can see comments from Supabase
- [ ] Can create new comments

---

## 🆘 Still Not Working?

1. **Check Vercel Logs**: Dashboard → Deployment → Logs tab
2. **Check Railway/Backend Logs**: Service → Deployments → Logs tab
3. **Test API directly**: Use Postman or curl to test backend endpoints
4. **Browser Console**: F12 → Console tab for network errors
5. **Network Tab**: F12 → Network tab → Filter as Fetch/XHR to see requests

---

## 🔐 Security Notes

- Never commit `.env.local` files with real secrets
- Use Vercel's encrypted environment variables
- Rotate Supabase keys periodically
- Use HTTPS everywhere (all URLs should start with `https://`)
- Don't change `SUPABASE_KEY` unless necessary - create a new service key if needed
