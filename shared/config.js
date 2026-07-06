// ─────────────────────────────────────────────────────────────
// Shared frontend config — used by BOTH client pages and admin.
// Change API_BASE in one place when you deploy.
// ─────────────────────────────────────────────────────────────
(function () {
  // If the site is served from the same Express server (recommended),
  // an empty base makes all fetches relative (e.g. "/api/hajj").
  // For local dev where you open HTML files directly, fall back to localhost:5000.
  const isFileProtocol = window.location.protocol === 'file:';
  const API_BASE = isFileProtocol ? 'http://localhost:5000' : '';

  // The list of categories the whole system understands.
  const CATEGORIES = ['hajj', 'umrah', 'tours', 'hotels', 'fleet', 'flights'];

  window.AMJA = {
    API_BASE,
    CATEGORIES,
    api: (path) => API_BASE + path,
  };
})();
