# Render Deployment - Free Tier Limitation Workaround

## Issue
Render free tier only allows **one PostgreSQL database** per account. Since you already have an existing free database, we need to either:
1. Use your existing database
2. Delete the old database and create a new one
3. Deploy without Blueprint (manual setup)

## Solution: Updated render.yaml

I've updated the `render.yaml` to deploy only the web services (backend + frontend) without creating a new database.

### Steps to Deploy:

#### Option A: Use Existing Database

1. **Find your existing database**:
   - Go to Render Dashboard
   - Click on your existing PostgreSQL database
   - Copy the **Internal Database URL**

2. **Deploy using Blueprint**:
   - Go to Render → New → Blueprint
   - Connect repository: `jiya-22/Fake_newsDetection`
   - Branch: `v1`
   - Click "Apply"

3. **Configure DATABASE_URL**:
   - After deployment, go to `fake-news-backend` service
   - Go to "Environment" tab
   - Find `DATABASE_URL` variable
   - Paste your database URL
   - Save changes
   - Service will automatically redeploy

#### Option B: Delete Old Database & Use Blueprint

1. **Delete existing database**:
   - Go to Render Dashboard
   - Find your old PostgreSQL database
   - Click Settings → Delete Database

2. **Use original render.yaml**:
   ```bash
   git checkout 57e9112  # Previous commit with database config
   git push -f
   ```

3. **Deploy Blueprint** - it will create everything

#### Option C: Manual Deployment (No Blueprint)

1. **Create/Use Database**:
   - Use existing database OR
   - Delete old one and create new: `fake-news-db`

2. **Deploy Backend**:
   - New → Web Service
   - Repository: `jiya-22/Fake_newsDetection`
   - Branch: `v1`
   - Root Directory: `backend`
   - Environment: Docker
   - Dockerfile Path: `backend/Dockerfile`
   - Environment Variables:
     - `DATABASE_URL`: (your database internal URL)
     - `FLASK_ENV`: `production`
     - `PORT`: `5001`

3. **Deploy Frontend**:
   - New → Web Service
   - Repository: `jiya-22/Fake_newsDetection`
   - Branch: `v1`
   - Root Directory: `NoCap`
   - Environment: Docker
   - Dockerfile Path: `NoCap/Dockerfile`
   - Environment Variables:
     - `VITE_API_URL`: (your backend URL from step 2)

## Recommended Approach

**Option A** is the easiest - use your existing database and just deploy the web services.

## Next Steps

Choose one of the options above and let me know if you need help with any step!
