// ─────────────────────────────────────────────────────────────
// Shared client navigation.
// Injects the SAME set of site links into whatever header each
// client page already has, and highlights the current page.
// Keeps each page's existing header styling intact.
//
// Usage: add <script src="/shared/nav.js" defer></script> to any
// client page (path auto-resolves whether served by Express or
// opened as a file).
// ─────────────────────────────────────────────────────────────
(function () {
  // Canonical site-wide links. `match` is used to detect the active page.
  const LINKS = [
    { label: 'Home',          href: 'index.html',      match: ['index'] },
    { label: 'Hajj & Umrah',  href: 'hajj-umrah.html', match: ['hajj-umrah'] },
    { label: 'Tours',         href: 'tours.html',      match: ['tours'] },
    { label: 'Hotels',        href: 'hotels.html',     match: ['hotels'] },
    { label: 'Fleet',         href: 'fleet.html',      match: ['fleet'] },
    { label: 'Flights',       href: 'flights.html',    match: ['flights'] },
  ];

  function currentPage() {
    const path = window.location.pathname.toLowerCase();
    const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return file.replace('.html', '') || 'index';
  }

  function build() {
    const page = currentPage();

    // Find the nav container. Landing uses `nav ul`; subpages use `.h-nav`.
    const ulNav = document.querySelector('nav ul');       // landing page style
    const flatNav = document.querySelector('nav.h-nav') || document.querySelector('.h-nav'); // subpage style

    if (ulNav) {
      ulNav.innerHTML = LINKS.map((l) => {
        const active = l.match.includes(page) ? ' class="cur"' : '';
        return `<li><a href="${l.href}"${active} data-lk>${l.label}</a></li>`;
      }).join('');
    } else if (flatNav) {
      flatNav.innerHTML = LINKS.map((l) => {
        const active = l.match.includes(page) ? ' class="cur"' : '';
        return `<a href="${l.href}"${active}>${l.label}</a>`;
      }).join('');
    }

    // Mobile drawer menu (subpages only — leave the landing page untouched).
    // Rebuild it with the same site links so phones can navigate between pages,
    // preserving the page's call-to-action / phone button.
    if (page !== 'index') {
      const drawer = document.querySelector('.drawer');
      if (drawer) {
        const cta = drawer.querySelector('.dcta') || drawer.querySelector('a[href^="tel:"]');
        const linksHTML = LINKS.map((l) => {
          const active = l.match.includes(page) ? ' class="cur"' : '';
          return `<a href="${l.href}"${active}>${l.label}</a>`;
        }).join('');
        drawer.innerHTML = linksHTML + (cta ? cta.outerHTML : '');
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
