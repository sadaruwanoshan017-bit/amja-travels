// ─────────────────────────────────────────────────────────────
// Shared CLIENT-side renderer.
// 1. Renders a category's packages into any element that has
//    data-packages="<category>".
// 2. Wires any form with data-enquiry-form="<category>" to submit
//    enquiries to the backend.
//
// Include AFTER config.js:
//   <script src="/shared/config.js"></script>
//   <script src="/shared/render.js"></script>
// ─────────────────────────────────────────────────────────────
(function () {
  const API = (window.AMJA && window.AMJA.API_BASE) || ((location.protocol === 'file:') ? 'http://localhost:5000' : '');
  const api = (p) => API + p;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Which field is the "title" and which is the "price/label" per category.
  const DISPLAY = {
    hajj:    { title: 'title', sub: 'price', list: 'includes' },
    umrah:   { title: 'title', sub: 'price', list: 'includes' },
    tours:   { title: 'title', sub: 'price', list: 'highlights' },
    hotels:  { title: 'name',  sub: 'price', list: 'amenities' },
    fleet:   { title: 'name',  sub: 'price', list: 'features' },
    flights: { title: 'route', sub: 'fare',  list: 'notes' },
  };

  // Per-category ENQUIRY fields injected into the form (must match backend).
  const ENQUIRY_FIELDS = {
    fleet: [
      { name: 'pickup_date', label: 'Pickup Date', type: 'date' },
      { name: 'rental_days', label: 'Rental Days', type: 'number', placeholder: 'e.g. 3' },
      { name: 'passengers', label: 'Passengers', type: 'number', placeholder: 'e.g. 4' },
    ],
    tours: [
      { name: 'travel_date', label: 'Travel Date', type: 'date' },
      { name: 'people', label: 'No. of People', type: 'number', placeholder: 'e.g. 2' },
    ],
    hajj: [
      { name: 'preferred_month', label: 'Preferred Month', type: 'text', placeholder: 'e.g. October' },
      { name: 'pax', label: 'No. of Pilgrims', type: 'number', placeholder: 'e.g. 2' },
    ],
    umrah: [
      { name: 'preferred_month', label: 'Preferred Month', type: 'text', placeholder: 'e.g. Ramadan' },
      { name: 'pax', label: 'No. of Pilgrims', type: 'number', placeholder: 'e.g. 2' },
    ],
    hotels: [
      { name: 'check_in', label: 'Check-in Date', type: 'date' },
      { name: 'nights', label: 'Nights', type: 'number', placeholder: 'e.g. 3' },
      { name: 'guests', label: 'Guests', type: 'number', placeholder: 'e.g. 2' },
    ],
    flights: [
      { name: 'travel_date', label: 'Travel Date', type: 'date' },
      { name: 'passengers', label: 'Passengers', type: 'number', placeholder: 'e.g. 2' },
    ],
  };

  // Robust <img> tag that works with ANY image URL (Unsplash, Google,
  // Cloudinary, etc.). referrerpolicy="no-referrer" bypasses the hotlink
  // blocking that many hosts (especially Google) apply. Broken links hide.
  function imgTag(url, style) {
    if (!url) return '';
    return `<img src="${esc(url)}" loading="lazy" referrerpolicy="no-referrer" ` +
      `style="${style || ''}" onerror="this.style.display='none'">`;
  }

  const COVER = 'width:100%;height:100%;object-fit:cover;display:block;';

  // Decide the card's action button per category.
  function actionButton(cat, item, title) {
    // Hotels with a booking.com link → "Book Now" that opens the link in a new tab.
    if (cat === 'hotels' && item.booking_url) {
      return `<a class="pkg-enquire" href="${esc(item.booking_url)}" target="_blank" rel="noopener noreferrer">Book Now</a>`;
    }
    const label = cat === 'fleet' ? 'Book Now' : 'Enquire';
    return `<button class="pkg-enquire" data-enquire data-item-id="${esc(item.id)}" data-item-title="${esc(title)}"
      ${item.tour_type ? `data-tour-type="${esc(item.tour_type)}"` : ''}
      ${item.vehicle_category ? `data-vehicle-category="${esc(item.vehicle_category)}"` : ''}>${label}</button>`;
  }

  // Render one item into a card. Uses generic classes so pages can style them.
  function cardHTML(cat, item) {
    const d = DISPLAY[cat] || { title: 'title', sub: 'price', list: 'includes' };
    const title = item[d.title] || '(untitled)';
    const sub = item[d.sub] || '';
    const listItems = Array.isArray(item[d.list]) ? item[d.list] : [];
    const img = item.image_url
      ? `<div class="pkg-img">${imgTag(item.image_url, COVER)}</div>`
      : '';
    const badge = item.badge ? `<span class="pkg-badge">${esc(item.badge)}</span>` : '';
    const meta = [item.duration, item.destination, item.location, item.capacity, item.airline, item.type, item.rating]
      .filter(Boolean).map((m) => `<span class="pkg-meta">${esc(m)}</span>`).join('');
    const list = listItems.length
      ? `<ul class="pkg-list">${listItems.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '';

    return `
      <article class="pkg" data-item-id="${esc(item.id)}" data-item-title="${esc(title)}">
        ${img}
        <div class="pkg-content">
          ${badge}
          <h3 class="pkg-title">${esc(title)}</h3>
          <div class="pkg-metas">${meta}</div>
          ${item.description ? `<p class="pkg-desc">${esc(item.description)}</p>` : ''}
          ${list}
          <div class="pkg-foot">
            ${sub ? `<span class="pkg-price">${esc(sub)}</span>` : ''}
            ${actionButton(cat, item, title)}
          </div>
        </div>
      </article>`;
  }

  function wireEnquireButtons(scope) {
    scope.querySelectorAll('[data-enquire]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const form = document.querySelector('[data-enquiry-form]');
        if (!form) return;
        const hidId = form.querySelector('[name="item_id"]');
        const hidTitle = form.querySelector('[name="item_title"]');
        if (hidId) hidId.value = btn.getAttribute('data-item-id') || '';
        if (hidTitle) hidTitle.value = btn.getAttribute('data-item-title') || '';
        // Pass through the extra context (tour type / vehicle category).
        const extraType = form.querySelector('[name="tour_type"]');
        if (extraType && btn.getAttribute('data-tour-type')) extraType.value = btn.getAttribute('data-tour-type');
        const extraVeh = form.querySelector('[name="vehicle_category"]');
        if (extraVeh && btn.getAttribute('data-vehicle-category')) extraVeh.value = btn.getAttribute('data-vehicle-category');
        const note = form.querySelector('[data-enquiry-note]');
        if (note) note.textContent = 'Enquiring about: ' + (btn.getAttribute('data-item-title') || '');
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  // Simple visual cards that reuse each page's existing card styles
  // (flight destinations, international hotel regions).
  function simpleCardHTML(variant, item) {
    // Force visible: these cards start at opacity:0 in page CSS (GSAP reveal),
    // but dynamic cards are injected after GSAP ran, so we make them visible.
    const vis = 'opacity:1;transform:none;';
    const bg = `<div class="bg">${imgTag(item.image_url, COVER)}</div>`;
    if (variant === 'destination') {
      return `<div class="dest-card" style="${vis}">${bg}
        <div class="dl"><span class="flag">${esc(item.flag || '')}</span>
        <h4>${esc(item.name || '')}</h4><div class="code">${esc(item.code || '')}</div></div></div>`;
    }
    if (variant === 'region') {
      const inner = `${bg}
        <div class="rl"><span class="rflag">${esc(item.flag || '')}</span>
        <h4>${esc(item.name || '')}</h4>
        ${item.subtitle ? `<div class="rsub">${esc(item.subtitle)}</div>` : ''}
        ${item.tag ? `<div class="rtag">${esc(item.tag)}</div>` : ''}</div>`;
      return item.booking_url
        ? `<a class="region-card" style="${vis}" href="${esc(item.booking_url)}" target="_blank" rel="noopener noreferrer">${inner}</a>`
        : `<div class="region-card" style="${vis}">${inner}</div>`;
    }
    return '';
  }

  async function renderPackages(container) {
    const cat = container.getAttribute('data-packages');
    const filterType = container.getAttribute('data-filter-type'); // tours: 'inbound' | 'outbound'
    const groupBy = container.getAttribute('data-group-by');       // fleet: 'vehicle_category'
    const variant = container.getAttribute('data-variant');        // 'destination' | 'region'
    const empty = container.getAttribute('data-empty') || `No ${cat} available right now. Please check back soon.`;
    container.innerHTML = '<p class="pkg-loading">Loading…</p>';
    try {
      const res = await fetch(api(`/api/packages/${cat}`));
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed');
      let items = json.data || [];

      // Filter tours by inbound/outbound if requested.
      if (filterType) items = items.filter((it) => (it.tour_type || '') === filterType);

      if (!items.length) { container.innerHTML = `<p class="pkg-empty">${esc(empty)}</p>`; return; }

      if (variant) {
        container.innerHTML = items.map((it) => simpleCardHTML(variant, it)).join('');
        return; // simple cards have no enquire buttons
      }
      if (groupBy) {
        renderGrouped(container, cat, items, groupBy);
      } else {
        container.innerHTML = items.map((it) => cardHTML(cat, it)).join('');
      }
      wireEnquireButtons(container);
    } catch (e) {
      container.innerHTML = `<p class="pkg-empty">Unable to load right now.</p>`;
      console.error('render error:', e);
    }
  }

  // Fleet grouping: a filter bar of categories + grouped card sections.
  function renderGrouped(container, cat, items, groupKey) {
    const groups = {};
    items.forEach((it) => {
      const g = it[groupKey] || 'Other';
      (groups[g] = groups[g] || []).push(it);
    });
    const names = Object.keys(groups);

    const bar = `<div class="pkg-filter">
      ${names.map((n, i) => `<button class="pkg-filter-btn${i === 0 ? ' active' : ''}" data-g="${esc(n)}">${esc(n)}</button>`).join('')}
    </div>`;

    const sections = names.map((n) => `
      <div class="pkg-group" data-group="${esc(n)}">
        <h3 class="pkg-group-title">${esc(n)}</h3>
        <div class="pkg-grid">${groups[n].map((it) => cardHTML(cat, it)).join('')}</div>
      </div>`).join('');

    container.innerHTML = bar + sections;

    // Show only the first category by default (no "All" option).
    container.querySelectorAll('.pkg-group').forEach((sec, i) => { sec.style.display = i === 0 ? '' : 'none'; });

    // Filter behaviour
    container.querySelectorAll('.pkg-filter-btn').forEach((b) => {
      b.addEventListener('click', () => {
        container.querySelectorAll('.pkg-filter-btn').forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
        const g = b.getAttribute('data-g');
        container.querySelectorAll('.pkg-group').forEach((sec) => {
          sec.style.display = (sec.getAttribute('data-group') === g) ? '' : 'none';
        });
      });
    });
  }

  // Inject the per-category extra fields into a [data-enquiry-extra] slot.
  function injectExtraFields(form, cat) {
    const slot = form.querySelector('[data-enquiry-extra]');
    if (!slot) return;
    const fields = ENQUIRY_FIELDS[cat] || [];
    slot.innerHTML = fields.map((f) => `
      <div class="enq-field">
        <label>${esc(f.label)}</label>
        <input type="${f.type}" name="${esc(f.name)}" placeholder="${esc(f.placeholder || '')}">
      </div>`).join('');
    // Hidden context fields carried from the card (tour type / vehicle category).
    if (!form.querySelector('[name="tour_type"]') && cat === 'tours') {
      const h = document.createElement('input'); h.type = 'hidden'; h.name = 'tour_type'; form.appendChild(h);
    }
    if (!form.querySelector('[name="vehicle_category"]') && cat === 'fleet') {
      const h = document.createElement('input'); h.type = 'hidden'; h.name = 'vehicle_category'; form.appendChild(h);
    }
  }

  function wireEnquiryForm(form) {
    const cat = form.getAttribute('data-enquiry-form');
    injectExtraFields(form, cat);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const msg = form.querySelector('[data-enquiry-msg]');
      const btn = form.querySelector('button[type="submit"], .enq-submit');
      const data = {
        name: (form.querySelector('[name="name"]') || {}).value || '',
        email: (form.querySelector('[name="email"]') || {}).value || '',
        phone: (form.querySelector('[name="phone"]') || {}).value || '',
        message: (form.querySelector('[name="message"]') || {}).value || '',
        item_id: (form.querySelector('[name="item_id"]') || {}).value || '',
        item_title: (form.querySelector('[name="item_title"]') || {}).value || '',
      };
      // Collect the per-category extra fields.
      (ENQUIRY_FIELDS[cat] || []).forEach((f) => {
        const el = form.querySelector(`[name="${f.name}"]`);
        if (el && el.value) data[f.name] = el.value;
      });
      ['tour_type', 'vehicle_category'].forEach((k) => {
        const el = form.querySelector(`[name="${k}"]`);
        if (el && el.value) data[k] = el.value;
      });
      if (!data.name.trim() || !data.phone.trim()) {
        if (msg) { msg.textContent = 'Please enter your name and phone number.'; msg.className = 'enq-msg error'; }
        return;
      }
      if (btn) { btn.disabled = true; btn.dataset.orig = btn.textContent; btn.textContent = 'Sending…'; }
      if (msg) { msg.textContent = 'Sending…'; msg.className = 'enq-msg loading'; }
      try {
        const res = await fetch(api(`/api/enquiries/${cat}`), {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.success) {
          if (msg) { msg.textContent = '✅ Thank you! We will contact you shortly.'; msg.className = 'enq-msg success'; }
          form.reset();
        } else {
          if (msg) { msg.textContent = '❌ ' + (json.error || 'Something went wrong.'); msg.className = 'enq-msg error'; }
        }
      } catch (err) {
        if (msg) { msg.textContent = '❌ Could not send. Please try again later.'; msg.className = 'enq-msg error'; }
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.orig || 'Send Enquiry'; }
      }
    });
  }

  function init() {
    document.querySelectorAll('[data-packages]').forEach(renderPackages);
    document.querySelectorAll('[data-enquiry-form]').forEach(wireEnquiryForm);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
