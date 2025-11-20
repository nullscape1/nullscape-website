# ⚡ Quick Domain Setup - nullscape.in

## 🚀 **5-Minute Quick Setup**

### **Step 1: Add Domain in Vercel** (2 min)
1. Go to: https://vercel.com/dashboard
2. Click your project → **Settings** → **Domains**
3. Click **"Add Domain"**
4. Enter: `nullscape.in` → **Add**
5. Enter: `www.nullscape.in` → **Add**

### **Step 2: Configure DNS on GoDaddy** (3 min)
1. Log in to GoDaddy
2. Go to **My Products** → **DNS** → **nullscape.in**
3. **Add DNS Records**:

   **Option A: A Records (Most Common)**
   - Type: `A`, Name: `@`, Value: `76.76.21.21`, TTL: `1 Hour`
   - Type: `A`, Name: `@`, Value: `76.76.19.19`, TTL: `1 Hour`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`, TTL: `1 Hour`

   **Option B: CNAME (If Allowed)**
   - Type: `CNAME`, Name: `@`, Value: `cname.vercel-dns.com`, TTL: `1 Hour`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`, TTL: `1 Hour`

   **⚠️ Important**: Check Vercel dashboard for exact IP addresses and CNAME value.

4. **Save** all records

### **Step 3: Wait & Verify** (5-60 min)
1. Wait 5-60 minutes for DNS propagation
2. Check Vercel dashboard - status should change to "Valid"
3. Visit: `https://nullscape.in` ✅

### **Step 4: Update Backend CORS** (2 min)
1. Go to Render → Backend Service → Environment
2. Edit `CORS_ORIGIN`:
   ```
   https://nullscape.in,https://www.nullscape.in,https://nullscape-website.vercel.app
   ```
3. Save & redeploy backend

---

## ✅ **Done!**

Your website is now live at:
- ✅ `https://nullscape.in`
- ✅ `https://www.nullscape.in`

SSL certificate is automatic! 🔒

---

## 📖 **Full Guide**

See `DOMAIN_SETUP_GUIDE.md` for detailed instructions and troubleshooting.

---

**Total Time**: ~10-60 minutes (including DNS wait)

