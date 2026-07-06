// ─────────────────────────────────────────────────────────────
// Shared site footer — identical on every page (matches landing).
// Replaces whatever <footer> a page already has with one shared
// markup + self-contained styles (scoped under .af). Load AFTER the
// page's own scripts:  <script src="/shared/footer.js" defer></script>
// ─────────────────────────────────────────────────────────────
(function () {
  var onFile = location.protocol === 'file:';
  var IMG = onFile ? '../images/' : '/images/';
  var ADMIN = onFile ? '../admin/login.html' : '/admin/login.html';
  var year = new Date().getFullYear();

  var CSS = `
  .af{background:#0C0A07;color:#F7F2E8;padding-top:5.5rem;position:relative;z-index:2;
      font-family:inherit;border-top:0;}
  .af *{box-sizing:border-box;}
  .af .af-wrap{max-width:1420px;margin:0 auto;padding:0 clamp(1.3rem,5vw,4.5rem);}
  .af .af-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1.2fr;gap:3rem;padding-bottom:4rem;border-bottom:1px solid rgba(247,242,232,.14);}
  @media(max-width:860px){.af .af-grid{grid-template-columns:1fr 1fr;}}
  @media(max-width:480px){.af .af-grid{grid-template-columns:1fr;}}
  .af .af-logo img{height:38px;width:auto;}
  .af .af-about{font-size:.84rem;line-height:1.95;color:rgba(247,242,232,.46);margin:1.1rem 0 1.2rem;max-width:300px;font-weight:400;}
  .af .af-badges{display:flex;gap:.45rem;flex-wrap:wrap;}
  .af .af-badges span{font-size:.54rem;letter-spacing:.1em;text-transform:uppercase;font-weight:700;border:1px solid rgba(201,154,82,.35);padding:.32rem .7rem;border-radius:100px;color:#EBD3A0;}
  .af .af-social{display:flex;gap:.6rem;margin-top:1.3rem;}
  .af .af-social a{width:36px;height:36px;border-radius:50%;border:1px solid rgba(247,242,232,.14);display:flex;align-items:center;justify-content:center;transition:all .3s ease;}
  .af .af-social a:hover{background:#D2703F;border-color:#D2703F;transform:translateY(-3px);}
  .af .af-social svg{width:14px;height:14px;stroke:#F7F2E8;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
  .af .af-col h5{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:#EBD3A0;font-weight:700;margin-bottom:1.4rem;}
  .af .af-col ul{list-style:none;margin:0;padding:0;}
  .af .af-col ul li{margin-bottom:.7rem;}
  .af .af-col ul a{font-size:.82rem;color:rgba(247,242,232,.46);transition:color .25s ease,padding-left .3s cubic-bezier(.19,1,.22,1);}
  .af .af-col ul a:hover{color:#EBD3A0;padding-left:6px;}
  .af .af-addr{font-size:.84rem;color:rgba(247,242,232,.46);line-height:1.95;}
  .af .af-addr a{display:block;color:rgba(247,242,232,.46);transition:color .25s;}
  .af .af-addr a:hover{color:#EBD3A0;}
  .af .af-bot{display:flex;justify-content:space-between;align-items:center;padding:1.7rem 0;flex-wrap:wrap;gap:.8rem;font-size:.66rem;letter-spacing:.06em;color:rgba(247,242,232,.3);}
  .af .af-bot .af-r{display:flex;align-items:center;gap:1.1rem;}
  .af #adminLoginLink{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.85);display:inline-block;flex-shrink:0;transition:transform .3s ease,box-shadow .3s ease;}
  .af #adminLoginLink:hover{transform:scale(1.5);box-shadow:0 0 12px rgba(255,255,255,.7);}`;

  var HTML = `
  <div class="af-wrap">
    <div class="af-grid">
      <div>
        <div class="af-logo"><img src="${IMG}logo.png" alt="Amja Travels"/></div>
        <p class="af-about">Sri Lanka's trusted travel partner since 1998 — flights, Hajj &amp; Umrah, inbound &amp; outbound tours, hotels and car rentals, all handled personally from Colombo 12.</p>
        <div class="af-badges"><span>IATA</span><span>TAASL</span><span>Civil Aviation Authority</span></div>
        <div class="af-social">
          <a href="https://www.facebook.com/amjatravels/" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"/></svg></a>
          <a href="https://twitter.com/amja_travels" target="_blank" rel="noopener" aria-label="Twitter"><svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3Z"/></svg></a>
          <a href="https://www.youtube.com/channel/UCwWbAdW1H5Xb99yLWRk8tBA" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="m10 9 5 3-5 3Z"/></svg></a>
        </div>
      </div>
      <div class="af-col"><h5>Quick Links</h5><ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="hajj-umrah.html">Hajj &amp; Umrah</a></li>
        <li><a href="tours.html">Tours</a></li>
        <li><a href="hotels.html">Hotels</a></li>
        <li><a href="fleet.html">Fleet</a></li>
        <li><a href="flights.html">Flights</a></li>
      </ul></div>
      <div class="af-col"><h5>Services</h5><ul>
        <li><a href="flights.html">Airline Ticketing</a></li>
        <li><a href="hajj-umrah.html">Hajj &amp; Umrah</a></li>
        <li><a href="tours.html">Inbound Tours</a></li>
        <li><a href="tours.html">Outbound Tours</a></li>
        <li><a href="hotels.html">Hotel Booking</a></li>
        <li><a href="fleet.html">Rent A Car</a></li>
      </ul></div>
      <div class="af-col"><h5>Contact</h5>
        <div class="af-addr">
          No. 30, Dias Place,<br>Gunasinghapura,<br>Colombo 12, Sri Lanka<br><br>
          <a href="tel:+94112335657">+94 11 233 5657</a>
          <a href="tel:+94777308079">+94 77 730 8079</a>
          <a href="mailto:amjatrvl@sltnet.lk">amjatrvl@sltnet.lk</a>
        </div>
      </div>
    </div>
    <div class="af-bot">
      <span>© ${year} Amja Travels (Pvt) Ltd. All Rights Reserved.</span>
      <span class="af-r">
        Colombo 12, Sri Lanka · Est. 1998
        <a id="adminLoginLink" href="${ADMIN}" aria-label="Staff access"></a>
      </span>
    </div>
  </div>`;

  function mount() {
    if (!document.getElementById('af-css')) {
      var st = document.createElement('style');
      st.id = 'af-css'; st.textContent = CSS;
      document.head.appendChild(st);
    }
    var existing = document.querySelector('footer');
    var f = document.createElement('footer');
    f.className = 'af';
    f.innerHTML = HTML;
    if (existing) existing.replaceWith(f);
    else document.body.appendChild(f);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
