# 🚀 Quick Start: Deploy Website to Vercel

## ⚡ **5-Minute Deployment**

### **Step 1: Push to GitHub** (2 minutes)
```bash
cd website
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### **Step 2: Deploy on Vercel** (3 minutes)

1. **Go to**: https://vercel.com/new
2. **Click**: "Import Git Repository"
3. **Select**: Your `nullscape-website` repository
4. **Configure**:
   - Framework: **Other** (Static Site)
   - Root Directory: `.` (leave default)
   - Output Directory: **`public`** ⚠️ (IMPORTANT!)
   - Build Command: (leave empty)
5. **Click**: "Deploy"

### **Step 3: Done!** ✅

Your website will be live at:
- **Preview URL**: `https://nullscape-website-xxx.vercel.app`
- **Auto-deploys** on every git push

---

## 🌐 **Add Custom Domain** (nullscape.in)

1. In Vercel project → **Settings** → **Domains**
2. **Add Domain**: `nullscape.in`
3. **Add Domain**: `www.nullscape.in`
4. **Go to GoDaddy** → DNS Management
5. **Add CNAME Records**:
   - `@` → `cname.vercel-dns.com`
   - `www` → `cname.vercel-dns.com`
6. **Wait 5-60 minutes** for DNS
7. **SSL** is automatic! 🔒

---

## ⚙️ **Configuration Already Done**

✅ `vercel.json` - Optimized configuration  
✅ `outputDirectory` - Set to `public`  
✅ Backend URL - Auto-detects production  
✅ Security headers - Configured  
✅ Asset caching - Configured  

---

## 🔧 **Update Backend CORS** (After Deployment)

Add your Vercel URL to backend CORS:
1. **Render Dashboard** → Backend Service → Environment Variables
2. **Edit** `CORS_ORIGIN`
3. **Add**: `https://your-site.vercel.app,https://nullscape.in,https://www.nullscape.in`
4. **Redeploy** backend

---

## 📖 **Full Guide**

See `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions.

---

**Ready to deploy?** Start with Step 1! 🚀

