// ─────────────────────────────────────────────────────────────
// Admin-side category definitions (form fields per category).
// Mirrors backend/config/categories.js but adds UI metadata:
// input type, label, placeholder, and whether it's an array field.
// ─────────────────────────────────────────────────────────────
window.ADMIN_CATEGORIES = {
  hajj: {
    label: 'Hajj Packages',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    itemName: 'Hajj Package',
    fields: [
      { key: 'title', label: 'Package Title', type: 'text', required: true, placeholder: 'e.g. Premium Hajj Package 2025' },
      { key: 'badge', label: 'Badge / Label', type: 'text', placeholder: 'e.g. 2025 Season' },
      { key: 'price', label: 'Price', type: 'text', required: true, placeholder: 'e.g. Rs. 945,000' },
      { key: 'duration', label: 'Duration', type: 'text', placeholder: 'e.g. 40 Days' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the package...' },
      { key: 'image_url', label: 'Image URL', type: 'image', placeholder: 'https://...' },
      { key: 'includes', label: "What's Included", type: 'list', placeholder: 'e.g. 5-Star Accommodation' },
    ],
  },
  umrah: {
    label: 'Umrah Packages',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6.4 6.4 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M18 3v4"/><path d="M20 5h-4"/></svg>',
    itemName: 'Umrah Package',
    fields: [
      { key: 'title', label: 'Package Title', type: 'text', required: true, placeholder: 'e.g. Ramadan Umrah Package' },
      { key: 'badge', label: 'Badge / Label', type: 'text', placeholder: 'e.g. Ramadan Special' },
      { key: 'price', label: 'Price', type: 'text', required: true, placeholder: 'e.g. Rs. 385,000' },
      { key: 'duration', label: 'Duration', type: 'text', placeholder: 'e.g. 14 Days' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the package...' },
      { key: 'image_url', label: 'Image URL', type: 'image', placeholder: 'https://...' },
      { key: 'includes', label: "What's Included", type: 'list', placeholder: 'e.g. Return Airfare' },
    ],
  },
  tours: {
    label: 'Tour Packages',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/></svg>',
    itemName: 'Tour Package',
    fields: [
      { key: 'title', label: 'Tour Title', type: 'text', required: true, placeholder: 'e.g. Cultural Triangle Tour' },
      { key: 'tour_type', label: 'Tour Type', type: 'select', required: true,
        options: [{ value: 'inbound', label: 'Inbound (inside Sri Lanka)' }, { value: 'outbound', label: 'Outbound (outside Sri Lanka)' }] },
      { key: 'destination', label: 'Destination', type: 'text', placeholder: 'e.g. Kandy, Sri Lanka' },
      { key: 'price', label: 'Price', type: 'text', placeholder: 'e.g. Rs. 45,000 per person' },
      { key: 'duration', label: 'Duration', type: 'text', placeholder: 'e.g. 5 Days / 4 Nights' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the tour...' },
      { key: 'image_url', label: 'Image URL', type: 'image', placeholder: 'https://...' },
      { key: 'highlights', label: 'Tour Highlights', type: 'list', placeholder: 'e.g. Sigiriya Rock Fortress' },
    ],
  },
  hotels: {
    label: 'Hotels',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20V4"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v-.5A1.5 1.5 0 0 1 7.5 6h4A1.5 1.5 0 0 1 13 7.5V8"/></svg>',
    itemName: 'Hotel',
    extraSections: ['international_hotels'],
    fields: [
      { key: 'name', label: 'Hotel Name', type: 'text', required: true, placeholder: 'e.g. Cinnamon Grand' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g. Colombo 03' },
      { key: 'rating', label: 'Star Rating', type: 'text', placeholder: 'e.g. 5-Star' },
      { key: 'price', label: 'Price / Night', type: 'text', placeholder: 'e.g. Rs. 25,000' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the hotel...' },
      { key: 'image_url', label: 'Image URL', type: 'image', placeholder: 'https://...' },
      { key: 'booking_url', label: 'Booking.com Link', type: 'text', placeholder: 'https://www.booking.com/hotel/...' },
      { key: 'amenities', label: 'Amenities', type: 'list', placeholder: 'e.g. Free WiFi' },
    ],
  },
  fleet: {
    label: 'Fleet',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2v-3.3a2 2 0 0 0-1.4-1.9L18 11.3l-1.6-3.6A2 2 0 0 0 14.6 6.5H9.4a2 2 0 0 0-1.8 1.2L6 11.3l-1.6.5A2 2 0 0 0 3 13.7V17h2"/><path d="M6 11.5h12"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
    itemName: 'Vehicle',
    fields: [
      { key: 'name', label: 'Vehicle Name', type: 'text', required: true, placeholder: 'e.g. Luxury Car' },
      { key: 'vehicle_category', label: 'Vehicle Category', type: 'select', required: true,
        options: [
          { value: 'Mini Car', label: 'Mini Car' },
          { value: 'Standard Car', label: 'Standard Car' },
          { value: 'Semi Executive Car', label: 'Semi Executive Car' },
          { value: 'Executive Car', label: 'Executive Car' },
          { value: 'Luxury Car', label: 'Luxury Car' },
          { value: 'Mini SUV', label: 'Mini SUV (4×4)' },
          { value: 'Large SUV', label: 'Large SUV (4×4)' },
          { value: 'Minivan', label: 'Minivan / Van' },
        ] },
      { key: 'model', label: 'Model', type: 'text', placeholder: 'e.g. BMW 320D or Similar' },
      { key: 'capacity', label: 'Capacity', type: 'text', placeholder: 'e.g. 4 Passengers' },
      { key: 'price', label: 'Price / Day', type: 'text', placeholder: 'e.g. Rs. 12,000' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the vehicle...' },
      { key: 'image_url', label: 'Image URL', type: 'image', placeholder: 'https://...' },
      { key: 'features', label: 'Features', type: 'list', placeholder: 'e.g. Air Conditioning' },
    ],
  },
  flights: {
    label: 'Flights',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z"/></svg>',
    itemName: 'Flight',
    extraSections: ['flight_destinations'],
    fields: [
      { key: 'route', label: 'Route', type: 'text', required: true, placeholder: 'e.g. Colombo → Jeddah' },
      { key: 'airline', label: 'Airline', type: 'text', placeholder: 'e.g. SriLankan Airlines' },
      { key: 'fare', label: 'Fare', type: 'text', placeholder: 'e.g. From Rs. 165,000' },
      { key: 'duration', label: 'Flight Duration', type: 'text', placeholder: 'e.g. 5h 30m' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Details about the flight...' },
      { key: 'image_url', label: 'Image URL', type: 'image', placeholder: 'https://...' },
      { key: 'notes', label: 'Notes', type: 'list', placeholder: 'e.g. Baggage 30kg included' },
    ],
  },

  // ── Sub-collections (rendered as extra sections inside flights/hotels pages) ──
  flight_destinations: {
    label: 'Popular Destinations',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    itemName: 'Destination',
    fields: [
      { key: 'name', label: 'Destination Name', type: 'text', required: true, placeholder: 'e.g. Dubai' },
      { key: 'code', label: 'Airport Code', type: 'text', placeholder: 'e.g. DXB' },
      { key: 'flag', label: 'Flag Emoji', type: 'text', placeholder: 'e.g. 🇦🇪' },
      { key: 'image_url', label: 'Image URL', type: 'image', placeholder: 'https://...' },
    ],
  },
  international_hotels: {
    label: 'International Hotels',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>',
    itemName: 'International Hotel Region',
    fields: [
      { key: 'name', label: 'Region / Property Name', type: 'text', required: true, placeholder: 'e.g. Makkah & Madinah' },
      { key: 'flag', label: 'Flag Emoji', type: 'text', placeholder: 'e.g. 🇸🇦' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'e.g. Holy cities · Haram area hotels' },
      { key: 'tag', label: 'Tag', type: 'text', placeholder: 'e.g. Pilgrimage Hotels' },
      { key: 'image_url', label: 'Image URL', type: 'image', placeholder: 'https://...' },
      { key: 'booking_url', label: 'Booking Link (optional)', type: 'text', placeholder: 'https://...' },
    ],
  },
};

// Order used for sidebar + dashboard. (Sub-collections deliberately excluded.)
window.ADMIN_CATEGORY_ORDER = ['hajj', 'umrah', 'tours', 'hotels', 'fleet', 'flights'];

// API base: relative when served by Express, localhost when opened as file.
window.ADMIN_API_BASE = (location.protocol === 'file:') ? 'http://localhost:5000' : '';
