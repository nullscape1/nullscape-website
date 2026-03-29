/**
 * API base URL for website. Precedence:
 * 1) <meta name="nullscape-api-base" content="https://api.example.com/api/v1">
 * 2) window.NULLSCAPE_API_BASE (set in HTML before this script)
 * 3) localhost → http://localhost:4000/api/v1; else production default (override meta for your deploy)
 */
(function () {
  var meta = typeof document !== 'undefined'
    ? document.querySelector('meta[name="nullscape-api-base"]')
    : null;
  var fromMeta = meta && meta.getAttribute('content');
  if (fromMeta) {
    window.API_BASE = fromMeta.replace(/\/$/, '');
    window.NULLSCAPE_API_BASE = window.API_BASE;
    return;
  }
  if (window.NULLSCAPE_API_BASE) {
    window.API_BASE = window.NULLSCAPE_API_BASE;
    return;
  }
  var isLocal = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  window.API_BASE = isLocal
    ? 'http://localhost:4000/api/v1'
    : 'https://nullscape-backend.onrender.com/api/v1';
  window.NULLSCAPE_API_BASE = window.API_BASE;
})();
