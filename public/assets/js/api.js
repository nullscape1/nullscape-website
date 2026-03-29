/**
 * API client for the website. Depends on config.js (window.API_BASE).
 */
(function () {
  var API_BASE = window.API_BASE;
  if (!API_BASE) {
    console.error('[API] API_BASE not set. Load config.js before api.js.');
    return;
  }

  async function fetchJson(path, options, retries) {
    options = options || {};
    retries = retries !== undefined ? retries : 2;
    var url = API_BASE + path;

    for (var attempt = 0; attempt <= retries; attempt++) {
      try {
        if (attempt > 0) {
          await new Promise(function (r) { setTimeout(r, 1000 * attempt); });
        }
        var res = await fetch(url, {
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          ...options
        });
        if (!res.ok) {
          if (res.status === 404 || res.status === 401) return null;
          if (attempt < retries && (res.status >= 500 || res.status === 0)) continue;
          return null;
        }
        return await res.json();
      } catch (e) {
        if (attempt < retries) continue;
        console.error('[API] Network error fetching ' + path + ':', e.message);
        return null;
      }
    }
    return null;
  }

  window.fetchJson = fetchJson;
})();
