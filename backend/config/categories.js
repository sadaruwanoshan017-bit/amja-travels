// ─────────────────────────────────────────────────────────────
// Category schema — single source of truth for the whole backend.
// Each category is stored as a Firestore collection of documents
// (each document = one package/item). Fields are tailored per category.
//
// `fields`   : allowed fields saved to Firestore for that category.
// `required` : fields that must be present when creating/updating.
// `arrays`   : fields that should be stored as arrays (e.g. bullet lists).
// ─────────────────────────────────────────────────────────────

const CATEGORIES = {
  hajj: {
    collection: 'hajj_packages',
    label: 'Hajj Packages',
    fields: ['title', 'badge', 'price', 'duration', 'description', 'image_url', 'includes'],
    required: ['title', 'price'],
    arrays: ['includes'],
  },
  umrah: {
    collection: 'umrah_packages',
    label: 'Umrah Packages',
    fields: ['title', 'badge', 'price', 'duration', 'description', 'image_url', 'includes'],
    required: ['title', 'price'],
    arrays: ['includes'],
  },
  tours: {
    collection: 'tour_packages',
    label: 'Tour Packages',
    fields: ['title', 'tour_type', 'destination', 'price', 'duration', 'description', 'image_url', 'highlights'],
    required: ['title', 'tour_type'],
    arrays: ['highlights'],
    // tour_type must be one of these (inbound = inside Sri Lanka, outbound = abroad)
    options: { tour_type: ['inbound', 'outbound'] },
  },
  hotels: {
    collection: 'hotels',
    label: 'Hotels',
    fields: ['name', 'location', 'rating', 'price', 'description', 'image_url', 'booking_url', 'amenities'],
    required: ['name'],
    arrays: ['amenities'],
  },
  fleet: {
    collection: 'fleet',
    label: 'Fleet',
    fields: ['name', 'vehicle_category', 'model', 'capacity', 'price', 'description', 'image_url', 'features'],
    required: ['name', 'vehicle_category'],
    arrays: ['features'],
    // Every car belongs to one of these vehicle categories.
    options: {
      vehicle_category: [
        'Mini Car', 'Standard Car', 'Semi Executive Car', 'Executive Car',
        'Luxury Car', 'Mini SUV', 'Large SUV', 'Minivan',
      ],
    },
  },
  flights: {
    collection: 'flights',
    label: 'Flights',
    fields: ['route', 'airline', 'fare', 'duration', 'description', 'image_url', 'notes'],
    required: ['route'],
    arrays: ['notes'],
  },

  // ── Sub-collections (managed as extra sections inside a page, not in the sidebar) ──
  flight_destinations: {
    collection: 'flight_destinations',
    label: 'Popular Destinations',
    fields: ['name', 'code', 'flag', 'image_url'],
    required: ['name'],
    arrays: [],
  },
  international_hotels: {
    collection: 'international_hotels',
    label: 'International Hotels',
    fields: ['name', 'flag', 'subtitle', 'tag', 'image_url', 'booking_url'],
    required: ['name'],
    arrays: [],
  },
};

// ── Per-category ENQUIRY fields ──
// Extra fields (beyond name/email/phone/message/item) that each
// category's enquiry form can submit and store. Keeps forms tailored.
const ENQUIRY_FIELDS = {
  fleet:   ['pickup_date', 'rental_days', 'passengers', 'vehicle_category'],
  tours:   ['travel_date', 'people', 'tour_type'],
  hajj:    ['preferred_month', 'pax'],
  umrah:   ['preferred_month', 'pax'],
  hotels:  ['check_in', 'nights', 'guests'],
  flights: ['travel_date', 'passengers'],
  general: [],
};

function getEnquiryFields(cat) {
  return ENQUIRY_FIELDS[(cat || '').toLowerCase()] || [];
}

// Helper: get config for a category or return null if invalid.
function getCategory(cat) {
  if (!cat) return null;
  return CATEGORIES[cat.toLowerCase()] || null;
}

module.exports = { CATEGORIES, getCategory, ENQUIRY_FIELDS, getEnquiryFields };
