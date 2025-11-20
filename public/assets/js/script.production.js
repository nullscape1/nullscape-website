// Production-optimized script.js wrapper
// This wrapper conditionally removes console.log statements in production

(function() {
  'use strict';
  
  // Production mode detection
  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1' &&
                       !window.location.hostname.startsWith('192.168.');
  
  // Console wrapper for production
  const originalConsole = window.console;
  if (isProduction) {
    // Suppress console.log, console.debug, console.info in production
    // Keep console.error and console.warn for critical issues
    window.console = {
      ...originalConsole,
      log: () => {},
      debug: () => {},
      info: () => {},
      warn: originalConsole.warn.bind(originalConsole),
      error: originalConsole.error.bind(originalConsole),
    };
  }
  
  // Load the main script
  // Note: In production, you should minify and bundle script.js
  // This is a temporary solution - proper build process recommended
  
})();

// Include your actual script.js content here or load it separately
// For now, keep using script.js but with console wrapper above
