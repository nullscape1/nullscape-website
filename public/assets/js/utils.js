/**
 * Shared utilities for the website. Exposed on window for use by script.js.
 */
function debounce(func, wait) {
  var timeout;
  return function executedFunction() {
    var later = function () {
      clearTimeout(timeout);
      func.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  var inThrottle;
  return function () {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(function () { inThrottle = false; }, limit);
    }
  };
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function createSkeletonLoader(count, type) {
  count = count || 3;
  type = type || 'card';
  var skeletons = Array(count).fill(0).map(function () {
    if (type === 'card') {
      return '<div class="skeleton-card"><div class="skeleton-image"></div><div class="skeleton-content">' +
        '<div class="skeleton-line skeleton-title"></div><div class="skeleton-line"></div><div class="skeleton-line skeleton-short"></div>' +
        '</div></div>';
    }
    if (type === 'service') {
      return '<div class="skeleton-service"><div class="skeleton-icon"></div>' +
        '<div class="skeleton-line skeleton-title"></div><div class="skeleton-line"></div></div>';
    }
    return '';
  });
  return skeletons.join('');
}

window.debounce = debounce;
window.throttle = throttle;
window.escapeHtml = escapeHtml;
window.createSkeletonLoader = createSkeletonLoader;
