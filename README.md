# Website Frontend Module

This is the public-facing website frontend module. It contains all static HTML pages, JavaScript, CSS, and assets that are served to end users.

## 📁 Structure

```
website/
├── public/              # All files served to users
│   ├── index.html      # Homepage
│   ├── blog.html       # Blog listing page
│   ├── 404.html        # Error page
│   ├── test-api.html   # API testing page (dev only)
│   ├── robots.txt      # SEO robots file
│   ├── sitemap.xml     # SEO sitemap
│   └── assets/         # Static assets
│       ├── css/        # Stylesheets
│       │   └── styles.css
│       └── js/         # JavaScript files
│           ├── script.js
│           └── script.production.js
└── assets/             # Additional assets (optional, not served)
```

## 🚀 Development

### Serving Locally

```bash
# Serve the public folder
cd website/public
python3 -m http.server 8000

# Or using Node.js http-server
npx http-server website/public -p 8000

# Website will be available at http://localhost:8000
```

### API Configuration

The website communicates with the backend API. Configure the API URL:

**In HTML files:**
```javascript
window.NULLSCAPE_API_BASE = 'http://localhost:4000/api/v1';
```

**For production:**
```javascript
window.NULLSCAPE_API_BASE = 'https://api.yourdomain.com/api/v1';
```

## 📝 Features

- ✅ Dynamic content loading from API
- ✅ Image lazy loading
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Production console.log suppression
- ✅ Error handling with fallbacks

## 🔗 Integration

- **Backend API**: All content is fetched from `/backend` API
- **No direct admin access**: Website is separate from admin panel
- **Static deployment**: Can be deployed to any static hosting (Netlify, Vercel, S3, etc.)

## 🛠️ Build for Production

The website is static HTML/JS/CSS. No build step required, but you can:

1. **Minify assets** (optional):
   - Minify `script.js`
   - Minify `styles.css`

2. **Update API URL** for production:
   - Update `window.NULLSCAPE_API_BASE` in all HTML files

3. **Deploy**:
   - Copy entire `public/` folder to your web server
   - Or use static hosting service (Netlify, Vercel, S3, etc.)

## 📋 Files

- `public/index.html` - Homepage with dynamic content sections
- `public/blog.html` - Blog listing page
- `public/404.html` - Error page
- `public/assets/js/script.js` - Main JavaScript (API calls, content loading)
- `public/assets/css/styles.css` - All styles
- `public/robots.txt` - SEO robots file
- `public/sitemap.xml` - SEO sitemap

## ⚠️ Important Notes

- **No server-side code**: This is a pure frontend module
- **API only**: All data comes from backend API
- **CORS**: Backend must allow requests from website domain
- **Production**: Update API URLs before deployment

