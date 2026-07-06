// ─────────────────────────────────────────────────────────────
// Seed data extracted from the original hardcoded client pages.
// Prices / fares left blank on purpose — fill them in via the admin
// panel. Field keys match backend/config/categories.js.
// ─────────────────────────────────────────────────────────────
module.exports = {
  // ── HOTELS ── (fields: name, location, rating, price, description, image_url, amenities)
  hotels: [
    {
      name: 'Eden Resort & Spa', location: 'Beruwala, Sri Lanka', rating: '4-Star', price: '',
      description: 'A world-class 4-star beach resort on the golden sands of Beruwala. Stunning ocean views, award-winning spa, multiple restaurants and direct beach access — the benchmark for coastal luxury in Sri Lanka.',
      image_url: '', amenities: ['Beachfront', 'Spa', 'Multiple Restaurants', 'Ocean View'],
    },
    {
      name: 'Mahaweli Reach Hotel', location: 'Kandy, Hill Country', rating: '4-Star', price: '',
      description: 'A landmark 4-star hotel set on the banks of the Mahaweli River in Kandy — ideal for cultural touring, with stunning mountain views and a renowned restaurant.',
      image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      amenities: ['River View', 'Cultural'],
    },
    {
      name: 'Aditya Resort', location: 'Galle, South Coast', rating: '3-Star', price: '',
      description: 'A charming boutique resort near the historic Galle Fort. Intimate pool, tropical gardens and exceptional Sri Lankan cuisine in the heart of the south.',
      image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
      amenities: ['Boutique', 'Heritage'],
    },
    {
      name: 'Deer Park Hotel', location: 'Polonnaruwa, Cultural Triangle', rating: '3-Star', price: '',
      description: 'A tranquil retreat in the heart of the ancient city — perfect for exploring UNESCO World Heritage sites of Polonnaruwa with comfortable accommodation and warm hospitality.',
      image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop',
      amenities: ['Heritage', 'Wildlife'],
    },
    {
      name: 'Amaya Lake Resort', location: 'Dambulla, Cultural Triangle', rating: '4-Star', price: '',
      description: 'A stunning lakeside resort near Sigiriya and the Dambulla cave temples, featuring overwater villas, elephant safaris and spectacular Cultural Triangle sunsets.',
      image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
      amenities: ['Lakeside', 'Safari'],
    },
    {
      name: 'Luxury Coastal Resort', location: 'Bentota, West Coast', rating: '5-Star', price: '',
      description: "A premier 5-star property on Sri Lanka's famous Bentota beach strip — infinity pools, water sports, fine dining and direct Indian Ocean frontage.",
      image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=800&auto=format&fit=crop',
      amenities: ['5-Star', 'Beach'],
    },
    {
      name: 'Highland Tea Estate Hotel', location: 'Nuwara Eliya, Hill Country', rating: '4-Star', price: '',
      description: 'A colonial-era tea estate hotel set among rolling green highlands — open fireplaces, afternoon teas, private estate tours and misty mountain mornings.',
      image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop',
      amenities: ['Colonial', 'Eco'],
    },
    {
      name: 'Sofaraa Al Huda Hotel', location: 'Madinah, Saudi Arabia', rating: '', price: '',
      description: "Sofaraa Al Huda Hotel is located less than 150 metres from the Prophet's Mosque in Madinah al-Munawwarah — one of the closest partner properties Amja Travels offers for Umrah guests. With a 24-hour front desk, well-appointed rooms and proximity to the Haram, it is the ideal base for a spiritually focused stay. Available as a standalone booking or as part of an Amja Umrah package.",
      image_url: '../images/hotel-madinah.jpg', booking_url: '',
      amenities: ["Less than 150m to Prophet's Mosque", '24-Hour Front Desk', 'Ideal for Umrah Groups', 'Madinah City Centre', 'Standalone Booking', 'Included in Umrah Packages'],
    },
  ],

  // ── FLEET ── (fields: name, vehicle_category, model, capacity, price, description, image_url, features)
  fleet: [
    {
      name: 'Mini Car', vehicle_category: 'Mini Car', model: 'Mazda Demio or Similar', capacity: '4 Passengers', price: '',
      description: 'Economical and easy to drive — ideal for city trips and couples.',
      image_url: '', features: ['2 Luggage', 'Automatic', 'A/C', 'Budget'],
    },
    {
      name: 'Standard Car', vehicle_category: 'Standard Car', model: 'Nissan Sunny or Similar', capacity: '4 Passengers', price: '',
      description: 'A comfortable, reliable standard car for everyday travel.',
      image_url: 'https://www.amjatravels.com/image/cache/catalog/sri-lanka-rent-a-car/Nissan-Sunny/Nissan-Sunny-1x1.jpg',
      features: ['2 Luggage', 'Automatic', 'A/C', 'Value'],
    },
    {
      name: 'Semi Executive Car', vehicle_category: 'Semi Executive Car', model: 'Toyota Corolla or Similar', capacity: '4 Passengers', price: '',
      description: 'Extra comfort and space for longer journeys.',
      image_url: 'https://www.amjatravels.com/image/cache/catalog/sri-lanka-rent-a-car/Toyota-Corolla/Toyota-Corolla-1x1.jpg',
      features: ['3 Luggage', 'Automatic', 'A/C', 'Comfort'],
    },
    {
      name: 'Executive Car', vehicle_category: 'Executive Car', model: 'Toyota Allion or Similar', capacity: '4 Passengers', price: '',
      description: 'A refined executive sedan for business and premium travel.',
      image_url: 'https://www.amjatravels.com/image/cache/catalog/sri-lanka-rent-a-car/Toyota-Allion/Toyota-Allion-1x1.jpg',
      features: ['3 Luggage', 'Automatic', 'A/C', 'Executive'],
    },
    {
      name: 'Luxury Car', vehicle_category: 'Luxury Car', model: 'BMW 320D or Similar', capacity: '4 Passengers', price: '',
      description: 'Premium luxury sedan for VIP transfers and special occasions.',
      image_url: 'https://www.amjatravels.com/image/cache/catalog/sri-lanka-rent-a-car/BMW-320-D/BMW-320-D-1x1.jpg',
      features: ['2–3 Luggage', 'Automatic', 'Premium A/C', 'Luxury', 'VIP Transfer'],
    },
    {
      name: 'Mini SUV (4×4)', vehicle_category: 'Mini SUV', model: 'Hyundai Tucson or Similar', capacity: '5 Passengers', price: '',
      description: 'Compact 4×4 great for hill country and light off-road.',
      image_url: 'https://www.amjatravels.com/image/cache/catalog/sri-lanka-rent-a-car/Hyundai-Tucson-OR-Similar/Hyundai-Tucson-OR-Similar-1x1.jpg',
      features: ['3 Luggage', 'Automatic 4WD', 'A/C', 'Off-Road', 'Family'],
    },
    {
      name: 'Large SUV (4×4)', vehicle_category: 'Large SUV', model: 'Toyota Prado or Similar', capacity: '7 Passengers', price: '',
      description: 'Spacious 4×4 for safaris, group tours and rough terrain.',
      image_url: 'https://www.amjatravels.com/image/cache/catalog/sri-lanka-rent-a-car/Toyota-Prado-OR-Similar/Toyota-Prado-OR-Similar-1x1.jpg',
      features: ['4 Luggage', 'Automatic 4WD', 'Premium A/C', 'Safari', 'Group'],
    },
    {
      name: 'Minivan / Station Wagon', vehicle_category: 'Minivan', model: 'Nissan Vanet or Similar', capacity: '8–10 Passengers', price: '',
      description: 'Great for groups, pilgrimages and corporate travel.',
      image_url: 'https://www.amjatravels.com/image/cache/catalog/sri-lanka-rent-a-car/Nissan-Vanet-OR-Similar/Nissan-Vanet-OR-Similar-1x1.jpg',
      features: ['6+ Luggage', 'Automatic', 'A/C', 'Groups', 'Pilgrimages'],
    },
    {
      name: 'High-Roof Minivan', vehicle_category: 'Minivan', model: 'Toyota KDH or Similar', capacity: '12 Passengers', price: '',
      description: 'High-roof van for large groups, tours and events.',
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop',
      features: ['8+ Luggage', 'Manual', 'A/C', 'Large Groups', 'Tours'],
    },
    {
      name: 'Land Cruiser 200', vehicle_category: 'Large SUV', model: 'Toyota Land Cruiser or Similar', capacity: '7 Passengers', price: '',
      description: 'Premium V8 4×4 for VIP safaris and luxury off-road travel.',
      image_url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=600&auto=format&fit=crop',
      features: ['4 Luggage', 'Automatic V8', 'Premium A/C', 'VIP', 'Premium 4WD'],
    },
  ],

  // ── TOURS ── (fields: title, destination, price, duration, description, image_url, highlights)
  tours: [
    {
      title: 'Sigiriya & Ancient Cities', tour_type: 'inbound', destination: 'Cultural Triangle, Sri Lanka', price: '', duration: '',
      description: 'The 5th-century Lion Rock fortress and the ancient capitals of Anuradhapura and Polonnaruwa.',
      image_url: 'https://images.unsplash.com/photo-1607427293702-036933bbf746?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Sigiriya Lion Rock', 'Anuradhapura', 'Polonnaruwa'],
    },
    {
      title: 'Beach & Coastal Escapes', tour_type: 'inbound', destination: 'South Coast, Sri Lanka', price: '', duration: '',
      description: 'Whale watching at Mirissa, surf at Arugam Bay, golden sands at Bentota and Unawatuna.',
      image_url: '', highlights: ['Mirissa Whale Watching', 'Arugam Bay Surf', 'Bentota', 'Unawatuna'],
    },
    {
      title: 'Tea Highlands', tour_type: 'inbound', destination: 'Hill Country, Sri Lanka', price: '', duration: '',
      description: 'Ella, Nuwara Eliya and the Nine Arches Bridge — misty mountains and rolling tea estates.',
      image_url: '', highlights: ['Ella', 'Nuwara Eliya', 'Nine Arches Bridge'],
    },
    {
      title: 'Wildlife Safaris', tour_type: 'inbound', destination: 'National Parks, Sri Lanka', price: '', duration: '',
      description: 'Elephants at Udawalawe, leopards at Yala, rare birds at Sinharaja and Wilpattu.',
      image_url: '', highlights: ['Udawalawe Elephants', 'Yala Leopards', 'Sinharaja', 'Wilpattu'],
    },
    {
      title: 'Rafting & Surfing', tour_type: 'inbound', destination: 'Adventure, Sri Lanka', price: '', duration: '',
      description: 'White-water rafting at Kitulgala, surfing Arugam Bay, zip-lining and hot air ballooning.',
      image_url: '', highlights: ['Kitulgala Rafting', 'Arugam Bay Surfing', 'Zip-lining', 'Hot Air Ballooning'],
    },
    {
      title: 'Kandy & Temple of the Tooth', tour_type: 'inbound', destination: 'Cultural Heritage, Sri Lanka', price: '', duration: '',
      description: "Sri Lanka's cultural capital — home to the sacred Temple of the Tooth Relic and the royal botanical gardens.",
      image_url: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=1200&auto=format&fit=crop',
      highlights: ['Temple of the Tooth', 'Royal Botanical Gardens', 'Kandy Lake'],
    },
    {
      title: 'Galle Fort & South', tour_type: 'inbound', destination: 'Colonial Heritage, Sri Lanka', price: '', duration: '',
      description: 'The 16th-century Dutch fort, boutique galleries, spice gardens and the turquoise southern coast.',
      image_url: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=1000&auto=format&fit=crop',
      highlights: ['Galle Dutch Fort', 'Boutique Galleries', 'Spice Gardens'],
    },
    {
      title: 'Dubai & UAE', tour_type: 'outbound', destination: 'Dubai, UAE', price: '', duration: '',
      description: 'Luxury desert experiences, iconic skylines and world-class shopping.',
      image_url: '', highlights: ['Desert Safari', 'Burj Khalifa', 'Shopping'],
    },
    {
      title: 'Maldives', tour_type: 'outbound', destination: 'Maldives', price: '', duration: '',
      description: 'Overwater bungalows, pristine coral reefs and crystal-clear lagoons.',
      image_url: '', highlights: ['Overwater Bungalows', 'Coral Reefs', 'Lagoons'],
    },
    {
      title: 'Singapore', tour_type: 'outbound', destination: 'Singapore', price: '', duration: '',
      description: "Asia's most vibrant city-state — gardens, cuisine and culture.",
      image_url: '', highlights: ['Gardens by the Bay', 'Cuisine', 'Culture'],
    },
    {
      title: 'London & Europe', tour_type: 'outbound', destination: 'United Kingdom & Europe', price: '', duration: '',
      description: 'Historic cities, scenic rail journeys and world-renowned cultural treasures.',
      image_url: '', highlights: ['Historic Cities', 'Scenic Rail', 'Cultural Treasures'],
    },
    {
      title: 'Thailand', tour_type: 'outbound', destination: 'Thailand', price: '', duration: '',
      description: 'Temples, beaches, street food and unforgettable island escapes.',
      image_url: '', highlights: ['Temples', 'Beaches', 'Island Escapes'],
    },
    {
      title: 'Japan', tour_type: 'outbound', destination: 'Japan', price: '', duration: '',
      description: 'Cherry blossoms, ancient temples, bullet trains and serene ryokans.',
      image_url: '', highlights: ['Cherry Blossoms', 'Bullet Trains', 'Ryokans'],
    },
    {
      title: 'Egypt', tour_type: 'outbound', destination: 'Egypt', price: '', duration: '',
      description: 'Pyramids, the Nile, ancient temples and the vibrant bazaars of Cairo.',
      image_url: '', highlights: ['Pyramids', 'Nile Cruise', 'Cairo Bazaars'],
    },
    {
      title: 'Bespoke Worldwide Tour', tour_type: 'outbound', destination: 'Anywhere on Earth', price: '', duration: '',
      description: 'Custom itinerary to wherever you want to go. We plan every detail worldwide.',
      image_url: '', highlights: ['Fully Custom', 'Worldwide', 'End-to-End Planning'],
    },
  ],

  // ── UMRAH ── (fields: title, badge, price, duration, description, image_url, includes)
  umrah: [
    {
      title: 'October Umrah Package', badge: 'October', price: '', duration: '',
      description: 'Scheduled October Umrah pilgrimage with return flights, star-class hotel, meals, A/C transport and Ulama guidance.',
      image_url: '../images/hajj-pilgrims.jpg',
      includes: ['Return Flights', 'Hotel', 'Meals', 'Ulama Guide'],
    },
    {
      title: 'Ramadan Umrah Package', badge: 'Ramadan Special', price: '', duration: '',
      description: 'Special Ramadan Umrah with return flights, 5-star hotel, full board meals and experienced Ulama guidance.',
      image_url: '../images/hajj-package.jpg',
      includes: ['Return Flights', '5-Star Hotel', 'Full Board', 'Ulama Guide'],
    },
    {
      title: 'Group Umrah Package', badge: 'Group Package', price: '', duration: '',
      description: 'Custom group Umrah packages with group flights, hotel, meals and a dedicated guide for your party.',
      image_url: '../images/umrah-group.jpg',
      includes: ['Group Flights', 'Hotel', 'Meals', 'Dedicated Guide'],
    },
  ],

  // ── FLIGHTS ── (fields: route, airline, fare, duration, description, image_url, notes)
  flights: [
    {
      route: 'Colombo → Dubai (CMB → DXB)', airline: 'SriLankan Airlines', fare: '', duration: '',
      description: 'Direct economy return fares from Colombo to Dubai. Special fares available.',
      image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
      notes: ['Economy', 'Return', 'Direct'],
    },
    {
      route: 'Colombo → Maldives (CMB → MLE)', airline: 'Multiple Airlines', fare: '', duration: '',
      description: 'Economy return fares from Colombo to Malé on multiple airlines.',
      image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
      notes: ['Economy', 'Return'],
    },
    {
      route: 'Colombo → Jeddah (CMB → JED)', airline: 'SriLankan · Emirates', fare: '', duration: '',
      description: 'Pilgrimage economy return fares from Colombo to Jeddah — ideal for Umrah travel.',
      image_url: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=800&auto=format&fit=crop',
      notes: ['Economy', 'Return', 'Umrah'],
    },
    {
      route: 'Colombo → Singapore (CMB → SIN)', airline: 'Singapore Airlines · SriLankan', fare: '', duration: '',
      description: 'Popular economy and business fares from Colombo to Singapore.',
      image_url: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=800&auto=format&fit=crop',
      notes: ['Economy', 'Business'],
    },
    {
      route: 'Colombo → London (CMB → LHR)', airline: 'SriLankan · British Airways', fare: '', duration: '',
      description: 'Long-haul economy and business fares from Colombo to London Heathrow.',
      image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
      notes: ['Economy', 'Business'],
    },
    {
      route: 'Colombo → Tokyo (CMB → NRT)', airline: 'Japan Airlines · SriLankan', fare: '', duration: '',
      description: 'Special economy return fares from Colombo to Tokyo Narita.',
      image_url: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=800&auto=format&fit=crop',
      notes: ['Economy', 'Return'],
    },
  ],

  // ── FLIGHT DESTINATIONS ── (fields: name, code, flag, image_url)
  flight_destinations: [
    { name: 'Dubai',     code: 'DXB',       flag: '🇦🇪', image_url: '../images/flight-dubai.jpg' },
    { name: 'Maldives',  code: 'MLE',       flag: '🇲🇻', image_url: '../images/flight-maldives.jpg' },
    { name: 'Singapore', code: 'SIN',       flag: '🇸🇬', image_url: '../images/flight-singapore.jpg' },
    { name: 'Jeddah',    code: 'JED',       flag: '🇸🇦', image_url: '../images/flight-jeddah.jpg' },
    { name: 'London',    code: 'LHR',       flag: '🇬🇧', image_url: '../images/flight-london.jpg' },
    { name: 'Bangkok',   code: 'BKK',       flag: '🇹🇭', image_url: '../images/flight-bangkok.jpg' },
    { name: 'Tokyo',     code: 'NRT',       flag: '🇯🇵', image_url: '../images/flight-tokyo.jpg' },
    { name: 'Cairo',     code: 'CAI',       flag: '🇪🇬', image_url: '../images/flight-cairo.jpg' },
    { name: 'Melbourne', code: 'MEL',       flag: '🇦🇺', image_url: '../images/flight-melbourne.jpg' },
    { name: 'Worldwide', code: 'Any Route', flag: '🌍', image_url: '../images/flight-worldwide.jpg' },
  ],

  // ── INTERNATIONAL HOTELS ── (fields: name, flag, subtitle, tag, image_url, booking_url)
  international_hotels: [
    { name: 'Makkah & Madinah', flag: '🇸🇦', subtitle: 'Holy cities · Haram area hotels', tag: 'Pilgrimage Hotels', image_url: '../images/hotel-region-jeddah.jpg', booking_url: '' },
    { name: 'Dubai & UAE',      flag: '🇦🇪', subtitle: 'City · Beach · Desert resorts',   tag: 'Luxury & Business', image_url: '../images/hotel-region-dubai.jpg', booking_url: '' },
    { name: 'Maldives',         flag: '🇲🇻', subtitle: 'Overwater · Private island resorts', tag: 'Romance & Luxury', image_url: '../images/hotel-region-maldives.jpg', booking_url: '' },
    { name: 'Asia Pacific',     flag: '🌏', subtitle: 'Singapore · Thailand · Japan',     tag: 'City & Adventure',  image_url: '../images/hotel-region-singapore.jpg', booking_url: '' },
  ],
};
