// ─────────────────────────────────────────────────────────────
// Admin core engine.
// Renders: shared sidebar (with unread-enquiry badges), a package
// manager (list / add / edit / delete), and an enquiries panel —
// all driven by ADMIN_CATEGORIES. Each category page just calls
// AdminCore.initCategoryPage('hajj', { basePath }).
// ─────────────────────────────────────────────────────────────
(function () {
  const API = window.ADMIN_API_BASE;
  const api = (p) => API + p;

  // Maps a category slug → its list container element, so save/delete
  // can refresh the right list (main packages OR an extra section).
  const listRegistry = {};

  // ── Inline SVG icons (replaces all emoji glyphs) ──
  const S = 'fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
  const ICON = {
    dashboard: `<svg viewBox="0 0 24 24" ${S}><rect x="3" y="3" width="7.5" height="9" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="5.5" rx="1.5"/><rect x="13.5" y="12" width="7.5" height="9" rx="1.5"/><rect x="3" y="15.5" width="7.5" height="5.5" rx="1.5"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>`,
    logout: `<svg viewBox="0 0 24 24" ${S}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    inbox: `<svg viewBox="0 0 24 24" ${S}><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/></svg>`,
    edit: `<svg viewBox="0 0 24 24" ${S}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
    del: `<svg viewBox="0 0 24 24" ${S}><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>`,
    save: `<svg viewBox="0 0 24 24" ${S}><polyline points="20 6 9 17 4 12"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" ${S}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.94.36 1.86.7 2.75a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.81.57 2.75.7A2 2 0 0 1 22 16.92Z"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" ${S}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>`,
    x: `<svg viewBox="0 0 24 24" ${S}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  };

  // ── Toast notifications ──
  const TOAST_IC = {
    success: `<svg viewBox="0 0 24 24" ${S} class="toast-ic"><path d="M20 6 9 17l-5-5"/></svg>`,
    error: `<svg viewBox="0 0 24 24" ${S} class="toast-ic"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`,
    info: `<svg viewBox="0 0 24 24" ${S} class="toast-ic"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`,
  };

  function toastWrap() {
    let w = document.querySelector('.toast-wrap');
    if (!w) { w = document.createElement('div'); w.className = 'toast-wrap'; document.body.appendChild(w); }
    return w;
  }

  function toast(message, type = 'info', ms = 3500) {
    const w = toastWrap();
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.innerHTML = `${TOAST_IC[type] || TOAST_IC.info}<div class="toast-body">${message}</div>
      <button class="toast-close" aria-label="Dismiss">&times;</button>`;
    w.appendChild(el);
    const remove = () => {
      el.classList.add('leaving');
      setTimeout(() => el.remove(), 300);
    };
    el.querySelector('.toast-close').addEventListener('click', remove);
    if (ms) setTimeout(remove, ms);
    return el;
  }

  // ── Styled confirm dialog → returns a Promise<boolean> ──
  function confirmDialog(opts) {
    opts = typeof opts === 'string' ? { message: opts } : (opts || {});
    const title = opts.title || 'Are you sure?';
    const message = opts.message || '';
    const okText = opts.okText || 'Confirm';
    const cancelText = opts.cancelText || 'Cancel';
    const danger = opts.danger !== false; // default danger style
    const icon = danger
      ? `<svg viewBox="0 0 24 24" ${S}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4M12 17h.01"/></svg>`
      : `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`;

    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'confirm-overlay show';
      overlay.innerHTML = `
        <div class="confirm-box">
          <div class="confirm-icon ${danger ? '' : 'brand'}">${icon}</div>
          <h3>${title}</h3>
          ${message ? `<p>${message}</p>` : ''}
          <div class="confirm-actions">
            <button class="confirm-cancel">${cancelText}</button>
            <button class="confirm-ok ${danger ? '' : 'brand'}">${okText}</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      const done = (val) => { overlay.remove(); resolve(val); };
      overlay.querySelector('.confirm-cancel').addEventListener('click', () => done(false));
      overlay.querySelector('.confirm-ok').addEventListener('click', () => done(true));
      overlay.addEventListener('click', (e) => { if (e.target === overlay) done(false); });
      document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') { done(false); document.removeEventListener('keydown', esc); }
      });
    });
  }

  // ── Auth guard ──
  function requireLogin(basePath) {
    if (!localStorage.getItem('adminLoggedIn')) {
      window.location.href = basePath + 'login.html';
    }
  }

  async function logout(basePath) {
    const ok = await confirmDialog({
      title: 'Log out?',
      message: 'You will need to sign in again to access the admin panel.',
      okText: 'Log out', danger: false,
    });
    if (!ok) return;
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    // On logout, return to the public homepage.
    const onFile = location.protocol === 'file:';
    window.location.href = onFile ? (basePath + '../pages/index.html') : '/index.html';
  }

  // ── Sidebar (shared across all admin pages) ──
  // basePath: relative path prefix back to /admin root ("" or "../")
  // active: category key or 'dashboard' or 'settings'
  function renderSidebar(container, basePath, active) {
    const order = window.ADMIN_CATEGORY_ORDER;
    const catLinks = order.map((cat) => {
      const c = window.ADMIN_CATEGORIES[cat];
      const cls = active === cat ? ' class="active"' : '';
      return `<a href="${basePath}category.html?cat=${cat}"${cls} data-cat-link="${cat}">
        ${c.icon} <span>${c.label}</span>
        <span class="notif-badge" data-badge="${cat}" style="display:none;"></span>
      </a>`;
    }).join('');

    container.innerHTML = `
      <div class="sidebar-logo">
        <h2>Amja Travels</h2>
        <span>Admin Panel</span>
      </div>
      <nav class="sidebar-nav">
        <a href="${basePath}index.html"${active === 'dashboard' ? ' class="active"' : ''}>${ICON.dashboard} <span>Dashboard</span></a>
        ${catLinks}
        <a href="${basePath}settings.html"${active === 'settings' ? ' class="active"' : ''}>${ICON.settings} <span>Settings</span></a>
        <a href="#" id="logoutLink">${ICON.logout} <span>Logout</span></a>
      </nav>`;

    const lo = container.querySelector('#logoutLink');
    if (lo) lo.addEventListener('click', (e) => { e.preventDefault(); logout(basePath); });
  }

  // ── Notification polling: fetch unread counts and paint badges ──
  async function refreshNotifications() {
    try {
      const res = await fetch(api('/api/enquiries/counts'));
      const json = await res.json();
      if (!json.success) return;
      const by = json.byCategory || {};
      document.querySelectorAll('[data-badge]').forEach((el) => {
        const cat = el.getAttribute('data-badge');
        const n = by[cat] || 0;
        if (n > 0) { el.textContent = n; el.style.display = 'inline-flex'; }
        else { el.style.display = 'none'; }
      });
      // Update page title with total unread.
      const total = json.total || 0;
      document.title = (total > 0 ? `(${total}) ` : '') + (document.title.replace(/^\(\d+\)\s/, ''));
    } catch (e) {
      // silently ignore — backend may be offline
    }
  }

  // ── HTML escaping ──
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ── Build the add/edit form fields for a category ──
  function buildFormFields(cat, data) {
    const c = window.ADMIN_CATEGORIES[cat];
    data = data || {};
    return c.fields.map((f) => {
      const val = data[f.key];
      const req = f.required ? '<span class="required">*</span>' : '';
      if (f.type === 'textarea') {
        return `<div class="form-group"><label>${f.label} ${req}</label>
          <textarea data-field="${f.key}" placeholder="${esc(f.placeholder || '')}">${esc(val || '')}</textarea></div>`;
      }
      if (f.type === 'image') {
        const has = val ? '' : 'display:none;';
        return `<div class="form-group"><label>${f.label}</label>
          <input type="text" data-field="${f.key}" value="${esc(val || '')}" placeholder="${esc(f.placeholder || '')}"
            oninput="var p=this.parentNode.querySelector('.img-preview');p.src=this.value;p.style.display=this.value?'block':'none';">
          <img class="img-preview" src="${esc(val || '')}" referrerpolicy="no-referrer" alt=""
            style="${has}margin-top:.6rem;max-height:130px;border-radius:10px;border:1px solid var(--line);"
            onload="this.style.display='block';" onerror="this.style.display='none';">
          <small style="color:var(--muted);font-size:.8rem;display:block;margin-top:.3rem;">Paste any image URL — Unsplash, Google, Cloudinary, or a direct link.</small></div>`;
      }
      if (f.type === 'select') {
        const opts = (f.options || []).map((o) => {
          const ov = typeof o === 'string' ? o : o.value;
          const ol = typeof o === 'string' ? o : o.label;
          const sel = val === ov ? ' selected' : '';
          return `<option value="${esc(ov)}"${sel}>${esc(ol)}</option>`;
        }).join('');
        return `<div class="form-group"><label>${f.label} ${req}</label>
          <select data-field="${f.key}"><option value="">— Select —</option>${opts}</select></div>`;
      }
      if (f.type === 'list') {
        const items = Array.isArray(val) && val.length ? val : [''];
        const rows = items.map((it) => `
          <div class="list-row">
            <input type="text" class="list-input" data-list="${f.key}" value="${esc(it)}" placeholder="${esc(f.placeholder || '')}">
            <button type="button" class="btn-remove-row" aria-label="Remove">${ICON.x}</button>
          </div>`).join('');
        return `<div class="form-group"><label>${f.label} ${req}</label>
          <div class="list-wrap" data-list-wrap="${f.key}">${rows}</div>
          <button type="button" class="btn-add-row" data-add-list="${f.key}" data-ph="${esc(f.placeholder || '')}">+ Add Item</button></div>`;
      }
      // default: text
      return `<div class="form-group"><label>${f.label} ${req}</label>
        <input type="text" data-field="${f.key}" value="${esc(val || '')}" placeholder="${esc(f.placeholder || '')}"></div>`;
    }).join('');
  }

  // ── Wire dynamic list add/remove inside a form ──
  function wireListControls(formEl) {
    formEl.querySelectorAll('.btn-add-row').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-add-list');
        const ph = btn.getAttribute('data-ph') || '';
        const wrap = formEl.querySelector(`[data-list-wrap="${key}"]`);
        const row = document.createElement('div');
        row.className = 'list-row';
        row.innerHTML = `<input type="text" class="list-input" data-list="${key}" placeholder="${ph}">
          <button type="button" class="btn-remove-row" aria-label="Remove">${ICON.x}</button>`;
        wrap.appendChild(row);
        row.querySelector('.btn-remove-row').addEventListener('click', () => row.remove());
      });
    });
    formEl.querySelectorAll('.btn-remove-row').forEach((b) =>
      b.addEventListener('click', () => b.closest('.list-row').remove()));
  }

  // ── Read the form into a data object ──
  function readForm(cat, formEl) {
    const c = window.ADMIN_CATEGORIES[cat];
    const data = {};
    c.fields.forEach((f) => {
      if (f.type === 'list') {
        const inputs = formEl.querySelectorAll(`[data-list="${f.key}"]`);
        data[f.key] = Array.from(inputs).map((i) => i.value.trim()).filter((v) => v);
      } else {
        const el = formEl.querySelector(`[data-field="${f.key}"]`);
        data[f.key] = el ? el.value.trim() : '';
      }
    });
    return data;
  }

  // ── Package manager: list + add/edit/delete for a category ──
  async function loadPackages(cat, listEl) {
    listRegistry[cat] = listEl; // remember for save/delete refresh
    listEl.innerHTML = '<p class="muted">Loading…</p>';
    try {
      const res = await fetch(api(`/api/packages/${cat}`));
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed');
      const items = json.data || [];
      const c = window.ADMIN_CATEGORIES[cat];
      if (!items.length) {
        listEl.innerHTML = `<p class="muted">No ${c.label.toLowerCase()} yet. Click “+ Add ${c.itemName}” to create one.</p>`;
        return;
      }
      const titleKey = c.fields[0].key; // first field is the display title
      // Optional grouping tag (tours: inbound/outbound, fleet: vehicle category)
      const tagOf = (it) => {
        if (cat === 'tours' && it.tour_type) return it.tour_type === 'inbound' ? 'Inbound' : 'Outbound';
        if (cat === 'fleet' && it.vehicle_category) return it.vehicle_category;
        return '';
      };
      listEl.innerHTML = items.map((it) => `
        <div class="pkg-card" data-id="${it.id}">
          <div class="pkg-info">
            <h4>${esc(it[titleKey] || '(untitled)')} ${tagOf(it) ? `<span class="pkg-tag">${esc(tagOf(it))}</span>` : ''}</h4>
            <p>${esc(it.price || it.fare || it.rating || it.model || it.code || it.subtitle || '')}</p>
          </div>
          <div class="pkg-actions">
            <button class="btn-mini btn-edit" data-id="${it.id}">${ICON.edit} Edit</button>
            <button class="btn-mini btn-del" data-id="${it.id}">${ICON.del} Delete</button>
          </div>
        </div>`).join('');

      // Wire edit/delete
      listEl.querySelectorAll('.btn-edit').forEach((b) =>
        b.addEventListener('click', () => openForm(cat, items.find((x) => x.id === b.dataset.id))));
      listEl.querySelectorAll('.btn-del').forEach((b) =>
        b.addEventListener('click', () => deletePackage(cat, b.dataset.id, listEl)));
    } catch (e) {
      listEl.innerHTML = `<p class="error-text">Error loading: ${esc(e.message)}. Is the server running?</p>`;
    }
  }

  function openForm(cat, existing) {
    const c = window.ADMIN_CATEGORIES[cat];
    const modal = document.getElementById('pkgModal');
    const body = document.getElementById('pkgModalBody');
    const titleEl = document.getElementById('pkgModalTitle');
    titleEl.textContent = (existing ? 'Edit ' : 'Add ') + c.itemName;
    body.innerHTML = `<form id="pkgForm">${buildFormFields(cat, existing)}
      <div class="form-msg" id="pkgFormMsg"></div>
      <div class="modal-actions">
        <button type="button" class="btn-secondary" id="pkgCancel">Cancel</button>
        <button type="submit" class="btn-save">${ICON.save} Save</button>
      </div></form>`;
    const form = document.getElementById('pkgForm');
    wireListControls(form);
    document.getElementById('pkgCancel').addEventListener('click', closeForm);
    form.addEventListener('submit', (e) => { e.preventDefault(); savePackage(cat, existing ? existing.id : null); });
    modal.style.display = 'flex';
  }

  function closeForm() {
    const modal = document.getElementById('pkgModal');
    if (modal) modal.style.display = 'none';
  }

  async function savePackage(cat, id) {
    const form = document.getElementById('pkgForm');
    const msg = document.getElementById('pkgFormMsg');
    const data = readForm(cat, form);
    msg.className = 'form-msg loading';
    msg.textContent = 'Saving…';
    try {
      const url = id ? api(`/api/packages/${cat}/${id}`) : api(`/api/packages/${cat}`);
      const res = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        closeForm();
        loadPackages(cat, listRegistry[cat] || document.getElementById('pkgList'));
        toast(id ? 'Changes saved.' : 'Item added.', 'success');
      } else {
        msg.className = 'form-msg error'; msg.textContent = json.error || 'Failed to save';
      }
    } catch (e) {
      msg.className = 'form-msg error'; msg.textContent = e.message;
    }
  }

  async function deletePackage(cat, id, listEl) {
    const ok = await confirmDialog({
      title: 'Delete this item?',
      message: 'This cannot be undone.',
      okText: 'Delete',
    });
    if (!ok) return;
    try {
      const res = await fetch(api(`/api/packages/${cat}/${id}`), { method: 'DELETE' });
      const json = await res.json();
      if (json.success) { loadPackages(cat, listEl); toast('Item deleted.', 'success'); }
      else toast('Error deleting: ' + (json.error || 'Failed'), 'error');
    } catch (e) { toast('Error: ' + e.message, 'error'); }
  }

  // Friendly labels for enquiry detail fields.
  const DETAIL_LABELS = {
    pickup_date: 'Pickup date', rental_days: 'Rental days', passengers: 'Passengers',
    vehicle_category: 'Vehicle category', travel_date: 'Travel date', people: 'No. of people',
    tour_type: 'Tour type', preferred_month: 'Preferred month', pax: 'Pilgrims',
    check_in: 'Check-in', nights: 'Nights', guests: 'Guests',
  };

  function renderDetails(details) {
    if (!details || typeof details !== 'object') return '';
    const rows = Object.keys(details).map((k) => {
      const label = DETAIL_LABELS[k] || k;
      return `<span class="enq-detail"><b>${esc(label)}:</b> ${esc(details[k])}</span>`;
    }).join('');
    return rows ? `<p class="enq-details">${rows}</p>` : '';
  }

  // ── Enquiries panel for a category ──
  async function loadEnquiries(cat, el) {
    el.innerHTML = '<p class="muted">Loading enquiries…</p>';
    try {
      const res = await fetch(api(`/api/enquiries/${cat}`));
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed');
      const items = json.data || [];
      if (!items.length) { el.innerHTML = '<p class="muted">No enquiries yet.</p>'; return; }
      el.innerHTML = items.map((q) => `
        <div class="enq-card ${q.read ? '' : 'unread'}" data-id="${q.id}">
          <div class="enq-head">
            <strong>${esc(q.name)}</strong>
            ${q.read ? '' : '<span class="enq-new">NEW</span>'}
            <span class="enq-date">${esc((q.created_at || '').slice(0, 16).replace('T', ' '))}</span>
          </div>
          <div class="enq-body">
            <p>${ICON.phone} ${esc(q.phone)}${q.email ? ` &nbsp;·&nbsp; ${ICON.mail} ${esc(q.email)}` : ''}</p>
            ${q.item_title ? `<p class="enq-item">Re: ${esc(q.item_title)}</p>` : ''}
            ${renderDetails(q.details)}
            ${q.message ? `<p class="enq-msg">${esc(q.message)}</p>` : ''}
          </div>
          <div class="enq-actions">
            ${q.read ? '' : `<button class="btn-mini btn-read" data-id="${q.id}">${ICON.save} Mark read</button>`}
            <button class="btn-mini btn-enq-del" data-id="${q.id}">${ICON.del} Delete</button>
          </div>
        </div>`).join('');

      el.querySelectorAll('.btn-read').forEach((b) =>
        b.addEventListener('click', async () => {
          await fetch(api(`/api/enquiries/item/${b.dataset.id}`), {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ read: true }),
          });
          loadEnquiries(cat, el); refreshNotifications();
          toast('Marked as read.', 'success');
        }));
      el.querySelectorAll('.btn-enq-del').forEach((b) =>
        b.addEventListener('click', async () => {
          const ok = await confirmDialog({ title: 'Delete this enquiry?', message: 'This cannot be undone.', okText: 'Delete' });
          if (!ok) return;
          await fetch(api(`/api/enquiries/item/${b.dataset.id}`), { method: 'DELETE' });
          loadEnquiries(cat, el); refreshNotifications();
          toast('Enquiry deleted.', 'success');
        }));
    } catch (e) {
      el.innerHTML = `<p class="error-text">Error: ${esc(e.message)}</p>`;
    }
  }

  // ── Entry point for a category page ──
  function initCategoryPage(cat, opts) {
    opts = opts || {};
    const basePath = opts.basePath || '';
    requireLogin(basePath);
    const c = window.ADMIN_CATEGORIES[cat];
    if (!c) { document.body.innerHTML = 'Unknown category'; return; }

    // Sidebar + header
    renderSidebar(document.querySelector('.sidebar'), basePath, cat);
    const uEl = document.getElementById('displayUsername');
    if (uEl) uEl.textContent = localStorage.getItem('adminUsername') || 'Admin';
    const h = document.getElementById('pageTitle');
    if (h) h.innerHTML = `${c.icon} ${c.label}`;

    // Add button
    const addBtn = document.getElementById('addBtn');
    if (addBtn) { addBtn.textContent = `+ Add ${c.itemName}`; addBtn.addEventListener('click', () => openForm(cat, null)); }

    // Load main list
    loadPackages(cat, document.getElementById('pkgList'));

    // Extra sub-collection sections (e.g. flight destinations, international hotels)
    if (Array.isArray(c.extraSections) && c.extraSections.length) {
      const mainSection = document.getElementById('pkgList').closest('.section');
      let anchor = mainSection;
      c.extraSections.forEach((subCat) => {
        const sc = window.ADMIN_CATEGORIES[subCat];
        if (!sc || !anchor) return;
        const listId = 'list_' + subCat;
        const sec = document.createElement('section');
        sec.className = 'section';
        sec.innerHTML = `
          <div class="section-head">
            <h2>${sc.icon} ${sc.label}</h2>
            <button class="btn-primary" data-add-sub="${subCat}">+ Add ${sc.itemName}</button>
          </div>
          <div id="${listId}"></div>`;
        anchor.insertAdjacentElement('afterend', sec);
        anchor = sec; // keep order if multiple
        sec.querySelector('[data-add-sub]').addEventListener('click', () => openForm(subCat, null));
        loadPackages(subCat, document.getElementById(listId));
      });
    }

    // Enquiries (kept last)
    loadEnquiries(cat, document.getElementById('enqList'));

    // Notifications
    refreshNotifications();
    setInterval(refreshNotifications, 20000);
  }

  // Public API
  window.AdminCore = {
    initCategoryPage,
    renderSidebar,
    refreshNotifications,
    requireLogin,
    logout,
    toast,
    confirm: confirmDialog,
  };
})();
