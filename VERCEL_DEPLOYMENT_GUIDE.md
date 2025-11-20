# 🚀 Vercel Deployment Guide - Website

## ✅ **Prerequisites**

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ Vercel account (free tier works)
- ✅ Website code pushed to GitHub repository
- ✅ Backend deployed on Render (✅ Already done!)

---

## 📋 **Step-by-Step Deployment**

### **Step 1: Push Website to GitHub**

If you haven't already, push your website code to GitHub:

```bash
cd website

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Vercel deployment"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/nullscape1/nullscape-website.git

# Push to GitHub
git push -u origin main
```

**Note**: If you already have a separate `nullscape-website` repository, use that instead.

---

### **Step 2: Connect to Vercel**

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in with GitHub (or create account)

2. **Import Project**
   - Click **"Add New..."** → **"Project"**
   - Select **"Import Git Repository"**
   - Choose `nullscape-website` repository (or your website repo)
   - Click **"Import"**

---

### **Step 3: Configure Project Settings**

Vercel will auto-detect the settings. Verify:

- **Project Name**: `nullscape-website` (or your preferred name)
- **Framework Preset**: `Other` (Static Site)
- **Root Directory**: `.` (root of repository)
- **Build Command**: Leave empty (no build needed)
- **Output Directory**: `public`
- **Install Command**: Leave empty

**Important**: Make sure **Output Directory** is set to `public`

---

### **Step 4: Environment Variables (Optional)**

If you want to override the backend URL, add environment variable:

- **Key**: `NULLSCAPE_API_BASE`
- **Value**: `https://nullscape-backend.onrender.com/api/v1`

**Note**: This is optional - the website auto-detects production URL. Only add if you want to override.

To add:
1. Click **"Environment Variables"** in project settings
2. Click **"Add New"**
3. Add variable (see above)
4. Click **"Save"**

---

### **Step 5: Deploy**

1. Click **"Deploy"** button
2. Wait for deployment to complete (1-2 minutes)
3. You'll get a preview URL like: `https://nullscape-website-xxx.vercel.app`

---

### **Step 6: Custom Domain Setup (nullscape.in)**

Once deployment is successful:

1. **Go to Project Settings** → **"Domains"**
2. **Add Domain** → Enter: `nullscape.in`
3. **Add Another Domain** → Enter: `www.nullscape.in`
4. Vercel will show DNS configuration

#### **DNS Configuration on GoDaddy**

Add the following DNS records in GoDaddy:

**Option 1: CNAME (Recommended)**
- **Type**: `CNAME`
- **Name**: `@` (or leave blank)
- **Value**: `cname.vercel-dns.com`
- **TTL**: `1 hour` (or auto)

- **Type**: `CNAME`
- **Name**: `www`
- **Value**: `cname.vercel-dns.com`
- **TTL**: `1 hour` (or auto)

**Option 2: A Records (Alternative)**
- **Type**: `A`
- **Name**: `@`
- **Value**: `76.76.21.21` (Vercel IP - check Vercel docs for latest)
- **TTL**: `1 hour`

- **Type**: `A`
- **Name**: `www`
- **Value**: `76.76.21.21`
- **TTL**: `1 hour`

5. **Wait for DNS Propagation** (5-60 minutes)
6. **Verify in Vercel** - status should change to "Valid Configuration"
7. **SSL Certificate** - Vercel automatically provisions SSL (HTTPS)

---

## ✅ **Post-Deployment Checklist**

### **1. Test Website**
- ✅ Visit: `https://your-site.vercel.app`
- ✅ Test homepage loads correctly
- ✅ Test blog page: `https://your-site.vercel.app/blog`
- ✅ Test 404 page: `https://your-site.vercel.app/non-existent`

### **2. Test API Integration**
- ✅ Check browser console for API calls
- ✅ Verify services section loads data
- ✅ Test contact form submission
- ✅ Test newsletter subscription

### **3. Test Custom Domain (After DNS Setup)**
- ✅ Visit: `https://nullscape.in`
- ✅ Visit: `https://www.nullscape.in`
- ✅ Verify SSL certificate (HTTPS padlock)
- ✅ Test all pages work

### **4. Update Backend CORS**

After deployment, update backend CORS to allow your Vercel URLs:

1. **Go to Render Dashboard** → Your backend service
2. **Environment Variables** → Edit `CORS_ORIGIN`
3. **Add Vercel URLs**:
   ```
   https://nullscape.in,https://www.nullscape.in,https://your-site.vercel.app
   ```
4. **Save** and **Redeploy** backend

---

## 🔧 **Configuration Files**

### **vercel.json**
```json
{
  "version": 2,
  "outputDirectory": "public",
  "rewrites": [
    {
      "source": "/blog",
      "destination": "/blog.html"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "cleanUrls": true,
  "trailingSlash": false
}
```

---

## 🌐 **URLs After Deployment**

### **Preview URL** (Immediate)
```
https://nullscape-website-xxx.vercel.app
```

### **Custom Domain** (After DNS Setup)
```
https://nullscape.in
https://www.nullscape.in
```

---

## 🔄 **Auto-Deployment**

Vercel automatically deploys when you push to GitHub:

1. **Push to main branch** → Production deployment
2. **Push to other branches** → Preview deployment
3. **Every commit** → New deployment

**To disable auto-deploy**: Go to Project Settings → Git → Disable auto-deploy

---

## 📊 **Deployment Status**

After deployment, check:

1. **Deployments Tab** - See all deployments
2. **Analytics** - View traffic (Pro plan)
3. **Logs** - View build and runtime logs
4. **Domains** - Manage custom domains

---

## 🐛 **Troubleshooting**

### **Issue: 404 on routes**
- **Solution**: Check `vercel.json` rewrites configuration
- Verify `outputDirectory` is set to `public`

### **Issue: API calls failing**
- **Solution**: Check browser console for CORS errors
- Update backend `CORS_ORIGIN` to include Vercel URLs
- Verify backend URL is correct in HTML

### **Issue: Assets not loading**
- **Solution**: Check asset paths in HTML (should be `/assets/...`)
- Verify files are in `public/assets/` directory

### **Issue: Custom domain not working**
- **Solution**: Wait for DNS propagation (up to 24 hours)
- Verify DNS records in GoDaddy
- Check domain status in Vercel dashboard

---

## ✅ **Summary**

1. ✅ Push code to GitHub
2. ✅ Import project in Vercel
3. ✅ Configure settings (output: `public`)
4. ✅ Deploy
5. ✅ Add custom domain (nullscape.in)
6. ✅ Configure DNS on GoDaddy
7. ✅ Update backend CORS
8. ✅ Test everything

---

## 🎯 **Next Steps**

After website deployment:
1. Deploy Admin Panel on Vercel
2. Configure DNS for admin subdomain (`admin.nullscape.in`)
3. Update backend CORS with all domains
4. Test end-to-end integration

---

**Last Updated**: 2024-11-20  
**Status**: ✅ **READY FOR DEPLOYMENT**

