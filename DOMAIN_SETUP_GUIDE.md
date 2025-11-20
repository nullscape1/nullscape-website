# 🌐 Custom Domain Setup Guide - nullscape.in

## 📋 **Overview**

This guide will help you connect your custom domain **nullscape.in** (purchased from GoDaddy) to your Vercel deployment.

**After setup:**
- ✅ `nullscape.in` → Your website
- ✅ `www.nullscape.in` → Your website
- ✅ Automatic SSL (HTTPS)
- ✅ Auto-renewal of SSL certificates

---

## 🚀 **Step 1: Add Domain in Vercel** (5 minutes)

### 1.1 Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click on your project: **nullscape-website**
3. Go to **Settings** → **Domains**

### 1.2 Add Domain
1. Click **"Add Domain"** button
2. Enter: `nullscape.in`
3. Click **"Add"**
4. Vercel will show you DNS configuration instructions

### 1.3 Add www Subdomain
1. Click **"Add Domain"** again
2. Enter: `www.nullscape.in`
3. Click **"Add"**

**Status**: Both domains will show as "Pending" until DNS is configured.

---

## 🔧 **Step 2: Configure DNS on GoDaddy** (10 minutes)

### 2.1 Log in to GoDaddy
1. Visit: https://www.godaddy.com/
2. Sign in to your account
3. Go to **My Products** → **DNS**

### 2.2 Access DNS Management
1. Find your domain: **nullscape.in**
2. Click on **"DNS"** or **"Manage DNS"**

### 2.3 Add DNS Records

You'll need to add records based on what Vercel shows. Here's the typical setup:

#### **Option 1: CNAME Records (Recommended)**

1. **Add CNAME for Root Domain (`@`)**:
   - **Type**: `CNAME`
   - **Name**: `@` (or leave blank)
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: `1 Hour` (or auto)

2. **Add CNAME for www**:
   - **Type**: `CNAME`
   - **Name**: `www`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: `1 Hour` (or auto)

**Note**: Some DNS providers (including GoDaddy) don't allow CNAME on root domain. If this is the case, use A records (Option 2).

#### **Option 2: A Records (If CNAME Not Allowed)**

1. **Add A Records for Root Domain (`@`)**:
   - **Type**: `A`
   - **Name**: `@` (or leave blank)
   - **Value**: `76.76.21.21` (Vercel's IP - check Vercel for latest)
   - **TTL**: `1 Hour`

   - **Type**: `A`
   - **Name**: `@`
   - **Value**: `76.76.19.19` (Second IP - check Vercel for latest)
   - **TTL**: `1 Hour`

2. **Add CNAME for www**:
   - **Type**: `CNAME`
   - **Name**: `www`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: `1 Hour`

#### **Option 3: ALIAS/ANAME Record (If Available)**

If GoDaddy supports ALIAS/ANAME records:

1. **Add ALIAS for Root Domain (`@`)**:
   - **Type**: `ALIAS` or `ANAME`
   - **Name**: `@`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: `1 Hour`

2. **Add CNAME for www**:
   - **Type**: `CNAME`
   - **Name**: `www`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: `1 Hour`

### 2.4 Save Changes
- Click **"Save"** or **"Add Record"** for each record
- Wait for confirmation

### 2.5 Remove Conflicting Records (If Any)
- Remove any existing A records pointing to other IPs
- Remove any conflicting CNAME records

---

## ⏳ **Step 3: Wait for DNS Propagation** (5-60 minutes)

### 3.1 DNS Propagation
- DNS changes can take **5-60 minutes** to propagate
- Sometimes up to **24 hours** (rare)
- Usually works within **15-30 minutes**

### 3.2 Verify DNS Propagation
Check if DNS is working:

**Option 1: Command Line**
```bash
# Check root domain
dig nullscape.in

# Check www subdomain
dig www.nullscape.in
```

**Option 2: Online Tools**
- Visit: https://dnschecker.org/
- Enter: `nullscape.in`
- Check if it points to Vercel IPs

**Option 3: Vercel Dashboard**
- Go to Vercel → Project → Domains
- Status will change from "Pending" to "Valid Configuration"
- Then to "Valid" when ready

---

## ✅ **Step 4: Verify Domain in Vercel** (2 minutes)

### 4.1 Check Domain Status
1. Go to Vercel → Project → Settings → Domains
2. Status should show:
   - **Pending** → DNS not configured yet
   - **Valid Configuration** → DNS configured, waiting for SSL
   - **Valid** → ✅ Domain is live!

### 4.2 SSL Certificate
- Vercel automatically provisions SSL certificates
- This takes **1-5 minutes** after DNS is valid
- You'll see a green checkmark when ready

### 4.3 Test Your Domain
1. Visit: `https://nullscape.in`
2. Visit: `https://www.nullscape.in`
3. Both should show your website
4. Check for HTTPS padlock 🔒

---

## 🔒 **Step 5: Update Backend CORS** (Important!)

After your domain is live, update your backend CORS to allow it:

### 5.1 Go to Render Dashboard
1. Visit: https://dashboard.render.com
2. Select your backend service: **nullscape-backend**
3. Go to **Environment** tab

### 5.2 Update CORS_ORIGIN
1. Find `CORS_ORIGIN` variable
2. Edit it to include your new domain:
   ```
   https://nullscape.in,https://www.nullscape.in,https://nullscape-website.vercel.app
   ```
3. Click **"Save Changes"**
4. Render will auto-redeploy

### 5.3 Alternative: Update via render.yaml
If using `render.yaml`, update it and push to GitHub:

```yaml
envVars:
  - key: CORS_ORIGIN
    value: https://nullscape.in,https://www.nullscape.in,https://nullscape-website.vercel.app
```

---

## 🔄 **Step 6: Update Website Configuration** (Optional)

If you want to ensure all URLs use your custom domain:

### 6.1 Update HTML Files
The website already uses production API URL, but you can update canonical URLs:

**In `index.html`**:
```html
<link rel="canonical" href="https://nullscape.in/">
<meta property="og:url" content="https://nullscape.in/">
```

**In `blog.html`**:
```html
<link rel="canonical" href="https://nullscape.in/blog">
<meta property="og:url" content="https://nullscape.in/blog">
```

### 6.2 Update robots.txt and sitemap.xml
Ensure these point to your custom domain:

**robots.txt**:
```
Sitemap: https://nullscape.in/sitemap.xml
```

**sitemap.xml**:
All `<loc>` URLs should use `https://nullscape.in`

---

## 📋 **Quick Reference: DNS Records Summary**

### For GoDaddy DNS Management:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `76.76.21.21` | 1 Hour |
| A | @ | `76.76.19.19` | 1 Hour |
| CNAME | www | `cname.vercel-dns.com` | 1 Hour |

**OR** (if CNAME allowed on root):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | `cname.vercel-dns.com` | 1 Hour |
| CNAME | www | `cname.vercel-dns.com` | 1 Hour |

**Note**: Check Vercel dashboard for exact IP addresses and CNAME value.

---

## ⚠️ **Troubleshooting**

### Issue: Domain shows "Pending" for long time
**Solution**:
- Check DNS records in GoDaddy are correct
- Wait up to 24 hours for propagation
- Use DNS checker to verify records

### Issue: SSL certificate not provisioning
**Solution**:
- Wait 5-10 minutes after DNS is valid
- Check domain in Vercel dashboard
- Remove and re-add domain if needed

### Issue: Website not loading on custom domain
**Solution**:
- Verify DNS propagation: https://dnschecker.org/
- Check Vercel domain status
- Ensure domain is added correctly in Vercel
- Clear browser cache

### Issue: CORS errors in browser console
**Solution**:
- Update backend `CORS_ORIGIN` to include `https://nullscape.in`
- Redeploy backend
- Clear browser cache

### Issue: www redirecting incorrectly
**Solution**:
- Both `nullscape.in` and `www.nullscape.in` should work
- Vercel handles both automatically
- Check DNS records for both

---

## ✅ **Verification Checklist**

After setup, verify:

- [ ] `https://nullscape.in` loads your website
- [ ] `https://www.nullscape.in` loads your website
- [ ] SSL certificate is active (green padlock 🔒)
- [ ] No CORS errors in browser console
- [ ] API calls work (check browser network tab)
- [ ] All pages load correctly
- [ ] Backend CORS updated with new domain

---

## 🎯 **What Happens After Setup**

1. ✅ **Custom Domain Active**: `nullscape.in` points to your Vercel deployment
2. ✅ **SSL Certificate**: Automatic HTTPS (secure)
3. ✅ **Auto-renewal**: SSL certificates auto-renew
4. ✅ **www Subdomain**: `www.nullscape.in` also works
5. ✅ **Production Ready**: Website is live on custom domain!

---

## 📞 **Support**

If you encounter issues:

1. **Vercel Support**: https://vercel.com/support
2. **GoDaddy Support**: https://www.godaddy.com/help
3. **Check DNS**: https://dnschecker.org/
4. **Vercel Docs**: https://vercel.com/docs/concepts/projects/domains

---

## 📝 **Summary**

**Quick Steps:**
1. Add domain in Vercel dashboard (`nullscape.in` + `www.nullscape.in`)
2. Add DNS records in GoDaddy (A records or CNAME)
3. Wait for DNS propagation (5-60 minutes)
4. Verify domain is active in Vercel
5. Update backend CORS to include new domain
6. Test website on custom domain

**Time Required**: ~30 minutes (including DNS propagation wait time)

---

**Last Updated**: 2024-11-20  
**Status**: ✅ Ready to configure

