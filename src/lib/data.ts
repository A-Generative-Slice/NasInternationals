import { TourPackage, VisaInfo, DocumentAttestationService, TripPlan, FaqItem, BlogPost, CountryServe } from '../types';

export const COMPANY_INFO = {
  name: "NAS Internationals Tours & Travels",
  tagline: "LET'S EXPLORE THE WORLD",
  director: "N. ABDUL HAKEEM",
  designation: "Managing Director",
  phone: "+91 99419 00055",
  whatsapp: "919941900055",
  landline: "044-26791505",
  email: "info@nasinternationals.com",
  website: "www.nasinternationals.com",
  socialHandle: "@officialnasinternationals",
  address: "No. 144/183, First Floor, Valluvarkottam High Road, Nungambakkam, Chennai - 600034, Tamilnadu, India",
  googleMapsQuery: "Valluvarkottam High Road Nungambakkam Chennai 600034",
  services: [
    "HAJJ",
    "UMRAH",
    "VISA ASSISTANCE",
    "TOUR PACKAGES",
    "AIR TICKET",
    "EDUCATION CONSULTANTS",
    "DOCUMENTS ATTESTATION",
    "ALL YOUR TRAVEL NEEDS"
  ]
};

export const FEATURED_PACKAGES: TourPackage[] = [
  {
    id: "pkg-umrah-deluxe",
    title: "14-Day Deluxe Umrah Package (Direct Flight from Chennai)",
    category: "hajj_umrah",
    destination: "Makkah & Madinah, Saudi Arabia",
    duration: "14 Days / 13 Nights",
    priceINR: 115000,
    originalPriceINR: 130000,
    rating: 4.95,
    reviewsCount: 384,
    image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "5-Star Hotels within walking distance of Haram",
      "Direct Saudi Airlines / Flynas round-trip from Chennai",
      "Complete Umrah Visa & Insurance included",
      "Guided Ziyarat tours in Makkah & Madinah with Scholar",
      "Full Board Buffet Meals (South & North Indian)"
    ],
    inclusions: [
      "Return Flight Ticket",
      "Umrah Visa + Medical Insurance",
      "Makkah Hotel: Pullman Zamzam or similar (50m to Haram)",
      "Madinah Hotel: Dar Al Taqwa or similar (100m to Prophet's Mosque)",
      "AC Transport transfers between Jeddah, Makkah & Madinah",
      "Complimentary Ihram / Abaya set & Zamzam Water 5L"
    ],
    makkahHotel: "Pullman Zamzam Makkah (5-Star)",
    madinahHotel: "Dar Al Taqwa Madinah (5-Star)",
    featured: true,
    badge: "MOST POPULAR PILGRIMAGE",
    description: "Embark on a spiritual journey of a lifetime with NAS Internationals' signature 14-Day Deluxe Umrah Package. Tailored for families and seniors with proximity to the Holy Harams, experienced guides, and authentic Indian meals.",
    itinerary: [
      { day: 1, title: "Departure from Chennai & Arrival in Makkah", details: "Flight from Chennai Airport to Jeddah. Assistance at airport, transfer to Makkah Hotel, check-in, and perform initial Umrah under guide guidance." },
      { day: 2, title: "Ibadah & Rest in Makkah", details: "Day dedicated to personal prayers, Tawaaf, and spiritual reflection at Masjid al-Haram." },
      { day: 3, title: "Makkah Historic Ziyarat", details: "Guided tour to Jabal al-Nour (Cave Hira), Cave Thawr, Mina, Arafat, and Muzdalifah." },
      { day: 4, title: "Free Day for Prayers in Makkah", details: "Attend Jummah prayer at Masjid al-Haram and evening spiritual lecture." },
      { day: 8, title: "Transfer to Madinah Al Munawwarah", details: "Luxury AC High-Speed Train / Coach transfer to Madinah. Check-in at 5-Star Hotel near Al-Masjid an-Nabawi." },
      { day: 9, title: "Salam at Rawdah & Madinah Ziyarat", details: "Visit Al-Rawdah al-Muhtarah (with Nusuk permit support), Masjid Quba, Mount Uhud, and Masjid al-Qiblatayn." },
      { day: 14, title: "Return to Chennai", details: "Farewell prayers at Prophet's Mosque, transfer to Madinah Airport, flight back to Chennai." }
    ]
  },
  {
    id: "pkg-dubai-deluxe",
    title: "5-Day Dubai Luxury Escapade & Desert Safari",
    category: "international",
    destination: "Dubai & Abu Dhabi, UAE",
    duration: "5 Days / 4 Nights",
    priceINR: 48500,
    originalPriceINR: 58000,
    rating: 4.88,
    reviewsCount: 219,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Burj Khalifa At The Top 124th Floor Entry",
      "Desert Safari with Dune Bashing & BBQ Dinner",
      "Marina Dhow Cruise with International Buffet",
      "Abu Dhabi City Tour & Sheikh Zayed Grand Mosque",
      "UAE Express Visa Assistance Included"
    ],
    inclusions: [
      "Return Flight Booking Assistance",
      "4-Star City Hotel with Daily Breakfast",
      "Private Airport Pickup & Drop Transfers",
      "Tourist Visa + Travel Insurance",
      "All Sightseeing Transfers on Shared AC Coach"
    ],
    featured: true,
    badge: "BESTSELLER",
    description: "Discover the breathtaking skyline, golden deserts, and futuristic attractions of Dubai and Abu Dhabi. Perfect family and group tour package handled end-to-end by NAS Internationals.",
    itinerary: [
      { day: 1, title: "Arrival in Dubai & Marina Dhow Cruise", details: "Warm welcome at Dubai International Airport. Hotel check-in. Evening Marina Dhow Cruise with live Tanoura show and dinner." },
      { day: 2, title: "Half-Day Dubai City Tour & Burj Khalifa", details: "Photostops at Dubai Frame, Burj Al Arab, Atlantis Palm. Visit Dubai Mall and ascend to Burj Khalifa 124th floor." },
      { day: 3, title: "Desert Safari Extravaganza", details: "Morning at leisure. Afternoon 4x4 Land Cruiser Desert Safari, Camel Ride, Henna painting, Belly Dance, and BBQ." },
      { day: 4, title: "Abu Dhabi Full-Day Tour", details: "Drive along Sheikh Zayed Road. Visit magnificent Sheikh Zayed Grand Mosque, Corniche, and BAPS Hindu Mandir." },
      { day: 5, title: "Souk Shopping & Departure", details: "Visit Gold Souk and Spice Souk for traditional shopping. Transfer to airport for flight home." }
    ]
  },
  {
    id: "pkg-malaysia-singapore",
    title: "6-Day Malaysia & Singapore Twin Kingdom Wonders",
    category: "international",
    destination: "Kuala Lumpur, Genting & Singapore",
    duration: "6 Days / 5 Nights",
    priceINR: 59000,
    originalPriceINR: 72000,
    rating: 4.9,
    reviewsCount: 164,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Petronas Twin Towers & Batu Caves in KL",
      "Genting Highlands Cable Car Ride & Casino",
      "Gardens by the Bay Light Show in Singapore",
      "Universal Studios Singapore Full-Day Pass",
      "Seamless Cross-Border AC Transfer"
    ],
    inclusions: [
      "Malaysia eVisa + Singapore Visa Processing",
      "3-Star / 4-Star Deluxe Hotel Accommodations",
      "All Airport & Inter-country Transfers",
      "Daily Breakfast & Select Indian Dinners"
    ],
    featured: true,
    badge: "POPULAR TWIN CITY",
    description: "Explore two vibrant South East Asian powerhouses in one seamless itinerary. Experience cable cars, theme parks, high-tech gardens, and cultural landmarks.",
    itinerary: [
      { day: 1, title: "Arrival Kuala Lumpur", details: "Arrive at KLIA airport, transfer to hotel. Night market walk at Bukit Bintang." },
      { day: 2, title: "KL City Tour & Genting Day Trip", details: "Visit Batu Caves, King's Palace, National Mosque. Take Awana SkyWay cable car to Genting Highlands." },
      { day: 3, title: "Coach to Singapore", details: "Scenic highway transfer to Singapore across Tuas Second Link. Evening Night Safari." },
      { day: 4, title: "Universal Studios Singapore", details: "Full day of thrilling rides and movie magic at Resort World Sentosa." },
      { day: 5, title: "Gardens by the Bay & Marina Bay Sands", details: "Visit Flower Dome, Cloud Forest, and spectacle at Supertree Grove." },
      { day: 6, title: "Changi Airport Jewel & Return Flight", details: "See Jewel Rain Vortex at Changi before departure to Chennai." }
    ]
  },
  {
    id: "pkg-kerala-paradise",
    title: "5-Day Enchanting Kerala (Munnar, Thekkady & Alleppey Houseboat)",
    category: "domestic",
    destination: "Munnar, Thekkady & Alleppey, India",
    duration: "5 Days / 4 Nights",
    priceINR: 24500,
    originalPriceINR: 31000,
    rating: 4.92,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Munnar Tea Gardens & Eravikulam National Park",
      "Periyar Wildlife Sanctuary Spice Plantation Tour",
      "Private Deluxe Houseboat Stay in Alleppey Backwaters",
      "Traditional Kerala Meal on Banana Leaf",
      "Private Dedicated Sedan/SUV Vehicle throughout"
    ],
    inclusions: [
      "Pickup & Drop from Cochin Airport / Railway Station",
      "Hill Station Resort Stays with Breakfast & Dinner",
      "1 Night Private Houseboat with All Meals",
      "Sightseeing Tolls & Parking Charges"
    ],
    featured: false,
    badge: "DOMESTIC SPECIAL",
    description: "Immerse yourself in God's Own Country. Unwind amidst rolling tea plantations, cool mountain air, and tranquil backwater cruises.",
    itinerary: [
      { day: 1, title: "Cochin to Munnar", details: "Meet driver at Cochin, drive to Munnar passing Cheeyappara Waterfalls." },
      { day: 2, title: "Munnar Sightseeing", details: "Visit Rajamalai (Nilgiri Tahr), Mattupetty Dam, Echo Point, and Tea Museum." },
      { day: 3, title: "Munnar to Thekkady", details: "Spice plantation walk and boat ride in Periyar Lake." },
      { day: 4, title: "Thekkady to Alleppey Houseboat", details: "Board private houseboat at 12 PM. Cruise serene backwaters and enjoy Kerala fish curry lunch." },
      { day: 5, title: "Alleppey to Cochin Departure", details: "Breakfast on board, disembark, Fort Kochi sightseeing, transfer to airport." }
    ]
  },
  {
    id: "pkg-europe-highlights",
    title: "10-Day Europe Explorer (France, Switzerland & Italy)",
    category: "luxury",
    destination: "Paris, Zurich, Lucerne, Venice & Rome",
    duration: "10 Days / 9 Nights",
    priceINR: 198000,
    originalPriceINR: 225000,
    rating: 4.97,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Eiffel Tower 2nd Level Entry & Seine River Cruise",
      "Mount Titlis Cable Car with Ice Flyer in Swiss Alps",
      "Venice Gondola Ride along Grand Canal",
      "Rome Colosseum & Vatican Museums Guided Tour",
      "Schengen Visa Complete Concierge Filing"
    ],
    inclusions: [
      "Schengen Visa Fee & Biometric Appointment Assistance",
      "4-Star Premium City Hotels",
      "TGV High-Speed Train Tickets Paris to Basel",
      "Daily Continental Breakfast & Indian Dinners"
    ],
    featured: false,
    badge: "LUXURY DREAM TOUR",
    description: "The ultimate European grand tour covering romantic Paris, snowy Swiss peaks, historic Venice, and majestic Rome with full NAS Internationals visa and tour manager support.",
    itinerary: [
      { day: 1, title: "Arrival in Paris", details: "Check in to Paris hotel. Evening Illuminations tour." },
      { day: 2, title: "Eiffel Tower & Seine Cruise", details: "Visit Eiffel Tower, Arc de Triomphe, Louvre exterior, and Seine River Cruise." },
      { day: 3, title: "TGV Train to Switzerland", details: "High-speed rail to Zurich/Lucerne. Scenic lake promenade walk." },
      { day: 4, title: "Mount Titlis & Snow Activities", details: "Rotair revolving cable car up Mt Titlis. Cliff walk and snow fun." },
      { day: 5, title: "Scenic Swiss Alps to Venice", details: "Train journey across the Italian border to Venice Mestre." },
      { day: 6, title: "Venice Canals & Glass Factory", details: "Private water taxi to St. Mark's Square, Venetian Gondola ride." },
      { day: 7, title: "Florence & Leaning Tower of Pisa", details: "Photo stop at Pisa Leaning Tower, Florence Duomo and Ponte Vecchio." },
      { day: 8, title: "Rome & Vatican City", details: "Guided tour of St. Peter's Basilica and Vatican Museums." },
      { day: 9, title: "Ancient Rome Landmarks", details: "Colosseum photo tour, Roman Forum, Trevi Fountain coin toss." },
      { day: 10, title: "Departure from Rome Airport", details: "Transfer to Fiumicino Airport for return flight to India." }
    ]
  }
];

export const VISA_SERVICES: VisaInfo[] = [
  {
    id: "visa-uae",
    country: "United Arab Emirates (Dubai)",
    flag: "🇦🇪",
    processingTime: "24 - 48 Hours",
    validity: "30 Days / 60 Days Single/Multiple",
    entryType: "eVisa / Tourist",
    feeINR: 7500,
    documentsRequired: [
      "Passport Front & Back scanned copy (min 6 months validity)",
      "Passport size photo with white background",
      "Confirmed Return Flight Ticket (Assisted by NAS)",
      "Pan Card copy"
    ],
    nasAssistanceNotes: "NAS Internationals provides 99.9% guaranteed express processing for UAE tourist visas directly through Dubai GDRFA system."
  },
  {
    id: "visa-saudi",
    country: "Saudi Arabia (Tourist / Umrah eVisa)",
    flag: "🇸🇦",
    processingTime: "12 - 24 Hours",
    validity: "1 Year Multiple Entry (90 days stay)",
    entryType: "eVisa / Umrah",
    feeINR: 12500,
    documentsRequired: [
      "Passport scan with 6 months validity",
      "White background digital photograph",
      "Mandatory COVID-19 / Health Insurance (Included in fee)",
      "Valid credit card or flight details"
    ],
    nasAssistanceNotes: "Ideal for Umrah pilgrims performing independent or family Umrah. Allows entry into Makkah, Madinah, Riyadh, and Jeddah."
  },
  {
    id: "visa-schengen",
    country: "Schengen Area (Europe 27 Countries)",
    flag: "🇪🇺",
    processingTime: "10 - 15 Working Days",
    validity: "Up to 90 Days",
    entryType: "Short Stay Tourist C-Visa",
    feeINR: 14500,
    documentsRequired: [
      "Original Passport + Previous passports",
      "6 Months Bank Statement with Seal & Sign (Min 2-3 Lakh balance)",
      "ITR for last 3 years",
      "Employment NOC / Business registration proof",
      "Day-wise detailed travel itinerary (Provided by NAS)",
      "Confirmed Flight & Hotel Vouchers + €30,000 Travel Insurance"
    ],
    nasAssistanceNotes: "Full end-to-end appointment scheduling at VFS Global Chennai, file preparation, cover letter drafting, and document verification."
  },
  {
    id: "visa-uk",
    country: "United Kingdom (UK Tourist Standard)",
    flag: "🇬🇧",
    processingTime: "15 - 20 Working Days",
    validity: "6 Months Multiple Entry",
    entryType: "Standard Visitor",
    feeINR: 16500,
    documentsRequired: [
      "Passport valid for duration of stay",
      "Proof of funds (6 months Bank Statement)",
      "Payslips / Business income proof",
      "Cover Letter detailing purpose of visit",
      "Hotel reservation & travel plan"
    ],
    nasAssistanceNotes: "Expert UK visa filing handled by experienced consultants at our Nungambakkam office."
  },
  {
    id: "visa-singapore",
    country: "Singapore",
    flag: "🇸🇬",
    processingTime: "3 - 5 Working Days",
    validity: "Up to 2 Years Multiple Entry",
    entryType: "Paper Visa / eVisa",
    feeINR: 3800,
    documentsRequired: [
      "Passport original (valid 6 months)",
      "Form 14A filled & signed",
      "2 Photos (35x45mm, matt finish 80% face)",
      "Cover letter + Bank Statement last 3 months"
    ],
    nasAssistanceNotes: "NAS Internationals is an authorized agent for Singapore visa submission with high approval success."
  },
  {
    id: "visa-malaysia",
    country: "Malaysia",
    flag: "🇲🇾",
    processingTime: "24 Hours",
    validity: "30 Days Single Entry",
    entryType: "MDAC Digital Arrival Card / eVisa",
    feeINR: 2800,
    documentsRequired: [
      "Passport front page copy",
      "Digital passport photograph",
      "Confirmed return flight ticket"
    ],
    nasAssistanceNotes: "Fast 1-day processing for Malaysia visa and arrival card."
  }
];

export const TRIPATE_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What does NAS Internationals do?",
    answer: "We assist Indian passport holders with eVisas and embassy visas through a fully online, hassle-free process with expert document verification and step-by-step guidance."
  },
  {
    id: "faq-2",
    question: "Who can use NAS Internationals?",
    answer: "Any Indian citizen planning tourist, business, family, or transit trips abroad can use NAS Internationals for guaranteed visa assistance and tour package bookings."
  },
  {
    id: "faq-3",
    question: "How can I pay?",
    answer: "You can pay securely via UPI (GPay, PhonePe, Paytm), Credit/Debit Card, Netbanking, or direct Bank IMPS/NEFT transfer with instant verification."
  },
  {
    id: "faq-4",
    question: "How do I get my visa?",
    answer: "Once approved by the embassy/immigration authority, your eVisa or approved visa document is delivered directly to your email, WhatsApp, and downloadable inside your NAS Internationals account."
  },
  {
    id: "faq-5",
    question: "How will I receive my visa and documents?",
    answer: "Your official eVisa PDF and travel insurance documents are uploaded to your 'My Bookings' portal and sent via email and WhatsApp concierge service."
  },
  {
    id: "faq-6",
    question: "Is support available?",
    answer: "Yes! Our 24/7 dedicated travel support team is always available via phone, WhatsApp (+91 91709708777), and email to answer your queries at midnight or anytime."
  },
  {
    id: "faq-7",
    question: "Are the fees refundable?",
    answer: "In the rare event of visa rejection due to document processing errors on our side, our service fee is eligible for refund as per our transparent policy."
  },
  {
    id: "faq-8",
    question: "Anything else I should know?",
    answer: "We recommend applying at least 15 to 30 days before your intended travel date. You can apply for multiple travelers together in a single application!"
  }
];

export const TRIPATE_VISAS: VisaInfo[] = [
  {
    id: "visa-mongolia",
    country: "Mongolia",
    countryCode: "MN",
    flag: "🇲🇳",
    processingTime: "3 - 5 Days",
    validity: "150 Days",
    stayPeriod: "30 Days",
    entryType: "Single Entry",
    feeINR: 1848,
    image: "https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&w=800&q=80",
    category: "trending",
    visasOnTimeBadge: "16+ Visas on Time",
    deliveryEstimate: "Get on 14 Aug 2026",
    documentsRequired: [
      "Passport scan (valid for at least 6 months beyond stay)",
      "Recent passport-size photo with white background",
      "Confirmed round-trip flight ticket",
      "Confirmed hotel voucher / accommodation proof"
    ],
    nasAssistanceNotes: "100% online eVisa filing for Mongolia with zero physical embassy submission required."
  },
  {
    id: "visa-cape-verde",
    country: "Cape Verde",
    countryCode: "CV",
    flag: "🇨🇻",
    processingTime: "4 - 6 Days",
    validity: "90 Days",
    stayPeriod: "30 Days",
    entryType: "E-Visa",
    feeINR: 6442,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    category: "evisa",
    visasOnTimeBadge: "4+ Visas on Time",
    deliveryEstimate: "Get on 13 Aug 2026",
    documentsRequired: [
      "Passport biographical page copy",
      "Flight itinerary",
      "Hotel booking confirmation"
    ],
    nasAssistanceNotes: "Pre-enrollment pre-arrival clearance for Cape Verde island destinations."
  },
  {
    id: "visa-angola",
    country: "Angola",
    countryCode: "AO",
    flag: "🇦🇴",
    processingTime: "5 - 7 Days",
    validity: "60 Days",
    stayPeriod: "30 Days",
    entryType: "E-Visa",
    feeINR: 1535,
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
    category: "cheapest",
    deliveryEstimate: "Get on 20 Aug 2026",
    documentsRequired: [
      "Passport bio page with 6 months validity",
      "Yellow fever vaccination certificate",
      "Bank statement showing minimum $100/day"
    ],
    nasAssistanceNotes: "Angola eVisa pre-authorization approved within 5 days."
  },
  {
    id: "visa-egypt",
    country: "Egypt",
    countryCode: "EG",
    flag: "🇪🇬",
    processingTime: "3 - 5 Days",
    validity: "90 Days",
    stayPeriod: "30 Days",
    entryType: "E-Visa / Tourist",
    feeINR: 3187,
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80",
    category: "trending",
    deliveryEstimate: "Get on 20 Aug 2026",
    documentsRequired: [
      "Passport clear scanned copy",
      "Travel itinerary and flight tickets",
      "Hotel bookings in Cairo / Sharm El Sheikh"
    ],
    nasAssistanceNotes: "Explore Pyramids & Nile River with direct Egypt eVisa support."
  },
  {
    id: "visa-uk-tripate",
    country: "United Kingdom - UK",
    countryCode: "GB",
    flag: "🇬🇧",
    processingTime: "15 Days",
    validity: "180 Days",
    stayPeriod: "180 Days",
    entryType: "Standard Visitor",
    feeINR: 24552,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    category: "express",
    visasOnTimeBadge: "3+ Visas on Time",
    deliveryEstimate: "Get on 16 Sep 2026",
    documentsRequired: [
      "Original Passport",
      "6 Months Bank Statement with seal",
      "Employment payslips / ITR 3 years",
      "Detailed London / Scotland itinerary"
    ],
    nasAssistanceNotes: "Full VFS appointment scheduling & documentation filing."
  },
  {
    id: "visa-hungary",
    country: "Hungary",
    countryCode: "HU",
    flag: "🇭🇺",
    processingTime: "12 Days",
    validity: "90 Days",
    stayPeriod: "30 Days",
    entryType: "Schengen Visa",
    feeINR: 5114,
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
    category: "express",
    deliveryEstimate: "Get on 13 Aug 2026",
    documentsRequired: [
      "Passport valid 6 months",
      "Travel Insurance €30,000 coverage",
      "Bank statements & flight vouchers"
    ],
    nasAssistanceNotes: "Schengen entry through Budapest, Hungary."
  },
  {
    id: "visa-hongkong",
    country: "Hong Kong",
    countryCode: "HK",
    flag: "🇭🇰",
    processingTime: "1 Day",
    validity: "180 Days",
    stayPeriod: "14 Days",
    entryType: "Pre-Arrival Registration (PAR)",
    feeINR: 501,
    image: "https://images.unsplash.com/photo-1506970845246-18f21d533b20?auto=format&fit=crop&w=800&q=80",
    category: "cheapest",
    visasOnTimeBadge: "16+ Visas on Time",
    deliveryEstimate: "Get on 07 Aug 2026",
    documentsRequired: [
      "Passport bio page",
      "Flight itinerary"
    ],
    nasAssistanceNotes: "Instant 24-hour PAR approval for Hong Kong travel."
  },
  {
    id: "visa-russia",
    country: "Russia",
    countryCode: "RU",
    flag: "🇷🇺",
    processingTime: "4 Days",
    validity: "60 Days",
    stayPeriod: "16 Days",
    entryType: "E-Visa",
    feeINR: 7415,
    image: "https://images.unsplash.com/photo-1513326718677-b964603b136d?auto=format&fit=crop&w=800&q=80",
    category: "evisa",
    deliveryEstimate: "Get on 17 Aug 2026",
    documentsRequired: [
      "Passport bio scan",
      "Digital white background photograph"
    ],
    nasAssistanceNotes: "Electronic visa for Moscow, St. Petersburg & all Russian regions."
  },
  {
    id: "visa-maldives",
    country: "Maldives",
    countryCode: "MV",
    flag: "🇲🇻",
    processingTime: "Instant",
    validity: "30 Days",
    stayPeriod: "30 Days",
    entryType: "Visa on Arrival / IMUGA",
    feeINR: 1,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    category: "cheapest",
    deliveryEstimate: "Get on 13 Aug 2026",
    documentsRequired: [
      "Passport valid 6 months",
      "IMUGA Health Declaration submission",
      "Resort voucher confirmation"
    ],
    nasAssistanceNotes: "Complimentary IMUGA filing & island transfer vouchers."
  },
  {
    id: "visa-vietnam",
    country: "Vietnam",
    countryCode: "VN",
    flag: "🇻🇳",
    processingTime: "3 Days",
    validity: "90 Days",
    stayPeriod: "30 Days",
    entryType: "E-Visa",
    feeINR: 3197,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    category: "trending",
    visasOnTimeBadge: "12+ Visas on Time",
    deliveryEstimate: "Get on 12 Aug 2026",
    documentsRequired: [
      "Passport scan",
      "Digital photo 4x6cm",
      "Entry & exit airport details"
    ],
    nasAssistanceNotes: "Direct official Vietnam eVisa issued by Vietnam Immigration Department."
  },
  {
    id: "visa-uzbekistan",
    country: "Uzbekistan",
    countryCode: "UZ",
    flag: "🇺🇿",
    processingTime: "3 Days",
    validity: "90 Days",
    stayPeriod: "30 Days",
    entryType: "E-Visa",
    feeINR: 2884,
    image: "https://images.unsplash.com/photo-1527838832700-548952014078?auto=format&fit=crop&w=800&q=80",
    category: "cheapest",
    visasOnTimeBadge: "5+ Visas on Time",
    deliveryEstimate: "Get on 12 Aug 2026",
    documentsRequired: [
      "Passport bio page",
      "Digital passport size photo"
    ],
    nasAssistanceNotes: "Explore Tashkent & Samarkand Silk Road."
  },
  {
    id: "visa-turkey",
    country: "Turkey",
    countryCode: "TR",
    flag: "🇹🇷",
    processingTime: "24 Hours",
    validity: "180 Days",
    stayPeriod: "30 Days",
    entryType: "E-Visa",
    feeINR: 6088,
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
    category: "express",
    visasOnTimeBadge: "4+ Visas on Time",
    deliveryEstimate: "Get on 07 Aug 2026",
    documentsRequired: [
      "Passport scan",
      "Valid US / UK / Schengen visa or residence permit (for eVisa eligibility)"
    ],
    nasAssistanceNotes: "Instant 24hr Turkish eVisa for Istanbul layovers and vacations."
  },
  {
    id: "visa-uae-dubai",
    country: "United Arab Emirates - Dubai",
    countryCode: "AE",
    flag: "🇦🇪",
    processingTime: "2 Days",
    validity: "60 Days",
    stayPeriod: "30 Days",
    entryType: "E-Visa",
    feeINR: 13299,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    category: "trending",
    visasOnTimeBadge: "23+ Visas on Time",
    deliveryEstimate: "Get on 17 Aug 2026",
    documentsRequired: [
      "Passport scan front & back",
      "White background photo",
      "Pan Card"
    ],
    nasAssistanceNotes: "Express GDRFA Dubai tourist visa approval."
  },
  {
    id: "visa-srilanka",
    country: "Sri Lanka",
    countryCode: "LK",
    flag: "🇱🇰",
    processingTime: "24 Hours",
    validity: "180 Days",
    stayPeriod: "30 Days",
    entryType: "ETA / E-Visa",
    feeINR: 256,
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80",
    category: "cheapest",
    visasOnTimeBadge: "18+ Visas on Time",
    deliveryEstimate: "Get on 07 Aug 2026",
    documentsRequired: [
      "Passport scan",
      "Flight tickets"
    ],
    nasAssistanceNotes: "Quick 24h Sri Lanka ETA authorization."
  },
  {
    id: "visa-usa",
    country: "United States of America - USA",
    countryCode: "US",
    flag: "🇺🇸",
    processingTime: "30 Days",
    validity: "10 Years",
    stayPeriod: "180 Days",
    entryType: "B1/B2 Tourist Visa",
    feeINR: 24311,
    image: "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&w=800&q=80",
    category: "express",
    visasOnTimeBadge: "14+ Visas on Time",
    deliveryEstimate: "Get on 19 Aug 2026",
    documentsRequired: [
      "DS-160 Confirmation Page",
      "US Visa appointment confirmation",
      "Passport valid for at least 6 months",
      "Financials, ITR & employment proof"
    ],
    nasAssistanceNotes: "DS-160 filing, fee payment & early slot booking assistance."
  },
  {
    id: "visa-australia",
    country: "Australia",
    countryCode: "AU",
    flag: "🇦🇺",
    processingTime: "20 Days",
    validity: "365 Days",
    stayPeriod: "90 Days",
    entryType: "Subclass 600 eVisa",
    feeINR: 22506,
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80",
    category: "evisa",
    deliveryEstimate: "Get on 17 Sep 2026",
    documentsRequired: [
      "Passport scanned copy",
      "Bank statement 6 months with $5,000+ balance",
      "Employment NOC / Business registration",
      "Travel plan"
    ],
    nasAssistanceNotes: "Direct ImmiAccount online application filing for Australia."
  },
  {
    id: "visa-malaysia-tripate",
    country: "Malaysia",
    countryCode: "MY",
    flag: "🇲🇾",
    processingTime: "24 Hours",
    validity: "30 Days",
    stayPeriod: "30 Days",
    entryType: "E-Visa",
    feeINR: 1,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    category: "cheapest",
    visasOnTimeBadge: "67+ Visas on Time",
    deliveryEstimate: "Get on 06 Aug 2026",
    documentsRequired: [
      "Passport bio page",
      "MDAC registration"
    ],
    nasAssistanceNotes: "Free MDAC filing & visa assistance."
  },
  {
    id: "visa-thailand",
    country: "Thailand",
    countryCode: "TH",
    flag: "🇹🇭",
    processingTime: "Instant",
    validity: "30 Days",
    stayPeriod: "30 Days",
    entryType: "Visa Exemption / On Arrival",
    feeINR: 1,
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
    category: "cheapest",
    visasOnTimeBadge: "66+ Visas on Time",
    deliveryEstimate: "Get on 07 Aug 2026",
    documentsRequired: [
      "Passport valid 6 months",
      "Return flight ticket",
      "Hotel booking"
    ],
    nasAssistanceNotes: "Fast-track Thailand customs & arrival assistance."
  }
];

export const TRIPATE_TOURS: TourPackage[] = [
  {
    id: "tour-1",
    title: "Ultimate 5 Countries in one Trip - April Chennai",
    category: "international",
    continent: "Asia",
    destination: "Cambodia, Vietnam, Laos, Thailand & Malaysia",
    duration: "11 Days / 10 Nights",
    priceINR: 170000,
    rating: 4.9,
    reviewsCount: 140,
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80",
    highlights: ["5 South East Asia countries", "Angkor Wat Temple", "Ha Long Bay Cruise", "Kuala Lumpur Towers"],
    inclusions: ["All Flights from Chennai", "eVisas for all 5 countries", "4-Star Hotels with meals"],
    featured: true,
    badge: "FULLY BOOKED",
    status: "CLOSED",
    groupOrPrivate: "GROUP",
    datesStr: "26 Apr 2026 - 6 May 2026",
    departureCity: "Chennai",
    description: "Explore the cheapest international vacation from India with NAS Internationals' Ultimate Asia 5-Country tour from Chennai.",
    itinerary: [
      { day: 1, title: "Chennai to Cambodia", details: "Fly to Siem Reap. Visit Night Market." },
      { day: 2, title: "Angkor Wat Sunrise", details: "Explore UNESCO heritage Angkor Wat." }
    ]
  },
  {
    id: "tour-2",
    title: "Ultimate 5 Countries in one Trip - January",
    category: "international",
    continent: "Asia",
    destination: "Cambodia, Vietnam, Laos, Thailand & Malaysia",
    duration: "11 Days / 10 Nights",
    priceINR: 139999,
    rating: 4.8,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    highlights: ["Angkor Wat", "Mekong Delta Cruise", "Phuket Beaches"],
    inclusions: ["Flights", "4-Star Hotels", "All Visas"],
    featured: true,
    badge: "FULLY BOOKED",
    status: "CLOSED",
    groupOrPrivate: "GROUP",
    datesStr: "6 Jan 2026 - 16 Jan 2026",
    departureCity: "Chennai",
    description: "Explore 5 iconic Asian destinations in a single legendary group trip.",
    itinerary: [
      { day: 1, title: "Departure", details: "Flight to Asia hub." }
    ]
  },
  {
    id: "tour-3",
    title: "Bhutan from Hyderabad - September",
    category: "international",
    continent: "Asia",
    destination: "Paro, Thimphu & Punakha, Bhutan",
    duration: "7 Days / 6 Nights",
    priceINR: 66666,
    rating: 4.95,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80",
    highlights: ["Tiger's Nest Monastery Trek", "Punakha Dzong Fortress", "Traditional Bhutanese Cultural Show"],
    inclusions: ["Direct Flights from Hyderabad", "SDF Tourist Tax included", "3-Star Deluxe Hotels & all meals"],
    featured: true,
    badge: "BOOKING OPEN",
    status: "OPEN",
    groupOrPrivate: "GROUP",
    datesStr: "3 Sep 2026 - 9 Sep 2026",
    departureCity: "Hyderabad",
    description: "Looking for a perfect Bhutan tour from Hyderabad? Join our 7 Days Bhutan group tour with SDF tax included!",
    itinerary: [
      { day: 1, title: "Arrival in Paro & Thimphu", details: "Flight to Paro, scenic drive to capital city Thimphu." },
      { day: 2, title: "Thimphu Sights", details: "Visit Buddha Dordenma statue and Simply Bhutan museum." }
    ]
  },
  {
    id: "tour-4",
    title: "Majestic Singapore and Malaysia",
    category: "international",
    continent: "Asia",
    destination: "Singapore & Kuala Lumpur",
    duration: "7 Days / 6 Nights",
    priceINR: 115999,
    rating: 4.9,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    highlights: ["Universal Studios Singapore", "Genting Highlands Cable Car", "Gardens by the Bay"],
    inclusions: ["Flights", "Visas", "Luxury Coach Transfers"],
    featured: true,
    badge: "BOOKINGS CLOSED",
    status: "CLOSED",
    groupOrPrivate: "GROUP",
    datesStr: "8 May 2026 - 14 May 2026",
    departureCity: "Chennai",
    description: "Enjoy a perfectly planned holiday with Singapore & Malaysia highlights, cruise stay, and sightseeing.",
    itinerary: [
      { day: 1, title: "Arrival Singapore", details: "Check in hotel and Night Safari." }
    ]
  },
  {
    id: "tour-5",
    title: "Andaman Chennai Trip",
    category: "domestic",
    continent: "Asia",
    destination: "Port Blair, Havelock & Neil Island",
    duration: "5 Days / 4 Nights",
    priceINR: 38999,
    rating: 4.85,
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Radhanagar Beach Havelock", "Cellular Jail Light & Sound Show", "Scuba Diving & Coral Reef"],
    inclusions: ["Direct Flights Chennai to Port Blair", "Makruzz Catamaran Transfers", "Beach Resorts with Breakfast"],
    featured: true,
    badge: "FULLY BOOKED",
    status: "CLOSED",
    groupOrPrivate: "GROUP",
    datesStr: "30 Mar 2026 - 3 Apr 2026",
    departureCity: "Chennai",
    description: "Andaman tour package for 4N5D with Radhanagar Beach and ferry transfers.",
    itinerary: [
      { day: 1, title: "Arrival Port Blair", details: "Visit Cellular Jail." }
    ]
  },
  {
    id: "tour-6",
    title: "Bhutan from Chennai - September",
    category: "international",
    continent: "Asia",
    destination: "Paro & Thimphu, Bhutan",
    duration: "7 Days / 6 Nights",
    priceINR: 66666,
    rating: 4.96,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    highlights: ["Tiger's Nest Monastery", "Dochula Pass 108 Stupas", "Paro Valley"],
    inclusions: ["Flights from Chennai", "SDF Included", "All meals"],
    featured: true,
    badge: "BOOKING OPEN",
    status: "OPEN",
    groupOrPrivate: "GROUP",
    datesStr: "16 Sep 2026 - 22 Sep 2026",
    departureCity: "Chennai",
    description: "Join our Chennai departure group tour to the Kingdom of Bhutan!",
    itinerary: [
      { day: 1, title: "Chennai to Paro", details: "Spectacular flight past Mt Everest to Paro." }
    ]
  },
  {
    id: "tour-7",
    title: "Ultimate 5 Countries in one Trip - November",
    category: "international",
    continent: "Asia",
    destination: "Cambodia, Vietnam, Laos, Thailand & Malaysia",
    duration: "11 Days / 10 Nights",
    priceINR: 139999,
    rating: 4.9,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    highlights: ["Angkor Wat", "Halong Bay", "Golden Bridge Ba Na Hills"],
    inclusions: ["All Flights", "Visas", "4 Star Hotels"],
    featured: false,
    badge: "FULLY BOOKED",
    status: "CLOSED",
    groupOrPrivate: "GROUP",
    datesStr: "25 Nov 2025 - 5 Dec 2025",
    departureCity: "Chennai",
    description: "Discover the best international tour packages from India with NAS Internationals' Ultimate Asia.",
    itinerary: [
      { day: 1, title: "November Departure", details: "Flight to South East Asia." }
    ]
  },
  {
    id: "tour-8",
    title: "Ultimate 5 Countries in one Trip - March Hyderabad",
    category: "international",
    continent: "Asia",
    destination: "Cambodia, Vietnam, Laos, Thailand & Malaysia",
    duration: "11 Days / 10 Nights",
    priceINR: 159999,
    rating: 4.88,
    reviewsCount: 50,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    highlights: ["5 Asian Capitals", "Cruises", "Temples"],
    inclusions: ["Flights from Hyderabad", "Visas", "4-Star Accommodations"],
    featured: false,
    badge: "FULLY BOOKED",
    status: "CLOSED",
    groupOrPrivate: "GROUP",
    datesStr: "10 Mar 2026 - 20 Mar 2026",
    departureCity: "Hyderabad",
    description: "Explore the cheapest international vacation from India departing from Hyderabad.",
    itinerary: [
      { day: 1, title: "Hyderabad to Asia", details: "Fly to first destination." }
    ]
  },
  {
    id: "tour-9",
    title: "Andaman Tour from Chennai - October",
    category: "domestic",
    continent: "Asia",
    destination: "Andaman Islands, India",
    duration: "5 Days / 4 Nights",
    priceINR: 40999,
    rating: 4.9,
    reviewsCount: 80,
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80",
    highlights: ["Havelock Island", "Scuba Diving", "Radhanagar Sunset"],
    inclusions: ["Flights", "Luxury Ferry", "Resort Stay"],
    featured: false,
    badge: "BOOKING OPEN",
    status: "OPEN",
    groupOrPrivate: "GROUP",
    datesStr: "27 Oct 2026 - 31 Oct 2026",
    departureCity: "Chennai",
    description: "Looking for a perfect Andaman tour from Chennai? Join our October 5 Days group tour!",
    itinerary: [
      { day: 1, title: "Arrival Port Blair", details: "Transfer to hotel and Corbyn's Cove Beach." }
    ]
  }
];

export const TRIPATE_COUNTRIES_SERVED: CountryServe[] = [
  { name: "Afghanistan", code: "AF", flag: "🇦🇫" },
  { name: "Albania", code: "AL", flag: "🇦🇱" },
  { name: "Angola", code: "AO", flag: "🇦🇴" },
  { name: "Armenia", code: "AM", flag: "🇦🇲" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  { name: "Austria", code: "AT", flag: "🇦🇹" },
  { name: "Azerbaijan", code: "AZ", flag: "🇦🇿" },
  { name: "Bahrain", code: "BH", flag: "🇧🇭" },
  { name: "Bangladesh", code: "BD", flag: "🇧🇩" },
  { name: "Belgium", code: "BE", flag: "🇧🇪" },
  { name: "Benin", code: "BJ", flag: "🇧🇯" },
  { name: "Bhutan", code: "BT", flag: "🇧🇹" },
  { name: "Botswana", code: "BW", flag: "🇧🇼" },
  { name: "Cambodia", code: "KH", flag: "🇰🇭" },
  { name: "Cape Verde", code: "CV", flag: "🇨🇻" },
  { name: "Chad", code: "TD", flag: "🇹🇩" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "Costa Rica", code: "CR", flag: "🇨🇷" },
  { name: "Djibouti", code: "DJ", flag: "🇩🇯" },
  { name: "Egypt", code: "EG", flag: "🇪🇬" },
  { name: "Ethiopia", code: "ET", flag: "🇪🇹" },
  { name: "Finland", code: "FI", flag: "🇫🇮" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "Gabon", code: "GA", flag: "🇬🇦" },
  { name: "Georgia", code: "GE", flag: "🇬🇪" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "Guinea", code: "GN", flag: "🇬🇳" },
  { name: "Hong Kong", code: "HK", flag: "🇭🇰" },
  { name: "Hungary", code: "HU", flag: "🇭🇺" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "Indonesia - Bali", code: "ID", flag: "🇮🇩" },
  { name: "Ireland", code: "IE", flag: "🇮🇪" },
  { name: "Israel", code: "IL", flag: "🇮🇱" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "Kenya", code: "KE", flag: "🇰🇪" },
  { name: "Laos", code: "LA", flag: "🇱🇦" },
  { name: "Madagascar", code: "MG", flag: "🇲🇬" },
  { name: "Malaysia", code: "MY", flag: "🇲🇾" },
  { name: "Maldives", code: "MV", flag: "🇲🇻" },
  { name: "Mongolia", code: "MN", flag: "🇲🇳" },
  { name: "Morocco", code: "MA", flag: "🇲🇦" },
  { name: "Mozambique", code: "MZ", flag: "🇲🇿" },
  { name: "Myanmar", code: "MM", flag: "🇲🇲" },
  { name: "Nauru", code: "NR", flag: "🇳🇷" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱" },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿" },
  { name: "Norway", code: "NO", flag: "🇳🇴" },
  { name: "Oman", code: "OM", flag: "🇴🇲" },
  { name: "Papua New Guinea", code: "PG", flag: "🇵🇬" },
  { name: "Philippines", code: "PH", flag: "🇵🇭" },
  { name: "Poland", code: "PL", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", flag: "🇵🇹" },
  { name: "Russia", code: "RU", flag: "🇷🇺" },
  { name: "Singapore", code: "SG", flag: "🇸🇬" },
  { name: "Solomon Islands", code: "SB", flag: "🇸🇧" },
  { name: "South Korea", code: "KR", flag: "🇰🇷" },
  { name: "Spain", code: "ES", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "LK", flag: "🇱🇰" },
  { name: "Sweden", code: "SE", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭" },
  { name: "Taiwan", code: "TW", flag: "🇹🇼" },
  { name: "Tanzania", code: "TZ", flag: "🇹🇿" },
  { name: "Thailand", code: "TH", flag: "🇹🇭" },
  { name: "Tonga", code: "TO", flag: "🇹🇴" },
  { name: "Turkey", code: "TR", flag: "🇹🇷" },
  { name: "Uganda", code: "UG", flag: "🇺🇬" },
  { name: "Ukraine", code: "UA", flag: "🇺🇦" },
  { name: "United Arab Emirates - Dubai", code: "AE", flag: "🇦🇪" },
  { name: "United Kingdom - UK", code: "GB", flag: "🇬🇧" },
  { name: "United States of America - USA", code: "US", flag: "🇺🇸" },
  { name: "Uzbekistan", code: "UZ", flag: "🇺🇿" },
  { name: "Vietnam", code: "VN", flag: "🇻🇳" },
  { name: "Zambia", code: "ZM", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", flag: "🇿🇼" }
];

export const ATTESTATION_SERVICES: DocumentAttestationService[] = [
  {
    id: "attest-educational",
    title: "Educational Degree & Certificate Attestation",
    category: "educational",
    description: "Mandatory attestation of B.E, B.Tech, M.B.B.S, MBA, Diploma, and School marksheets for employment visas in Gulf countries (UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain).",
    steps: [
      "Step 1: Notary Attestation (State level)",
      "Step 2: Home Department / HRD (Higher Education Department) Verification from issuing state",
      "Step 3: MEA (Ministry of External Affairs, New Delhi) Stamping",
      "Step 4: Embassy Attestation (UAE / Saudi / Qatar Embassy in India)",
      "Step 5: MOFA (Ministry of Foreign Affairs) in Destination Country"
    ],
    processingTime: "7 - 12 Working Days"
  },
  {
    id: "attest-personal",
    title: "Personal Certificate Attestation (Marriage & Birth)",
    category: "personal",
    description: "Required for family residence visas, child school admission abroad, and dependent spouse visas in Middle East & Europe.",
    steps: [
      "Step 1: Local Sub-Registrar / Home Dept Verification",
      "Step 2: MEA Apostille / Normal Stamping",
      "Step 3: Target Country Embassy Attestation"
    ],
    processingTime: "5 - 8 Working Days"
  },
  {
    id: "attest-commercial",
    title: "Commercial & Business Document Attestation",
    category: "commercial",
    description: "Power of Attorney, Certificate of Incorporation, Board Resolutions, Invoices for corporate global expansion.",
    steps: [
      "Chamber of Commerce Verification",
      "Ministry of External Affairs (MEA)",
      "Consulate / Embassy Final Seal"
    ],
    processingTime: "4 - 7 Working Days"
  }
];

export const INITIAL_SAMPLE_TRIP: TripPlan = {
  id: "trip-dubai-live-sample",
  shareCode: "NAS-84920",
  title: "Dubai & Desert Safari Family Adventure",
  destination: "Dubai, UAE",
  startDate: "2026-10-15",
  endDate: "2026-10-20",
  travelersCount: 2,
  budgetLevel: "moderate",
  totalEstimatedCostINR: 97000,
  lastUpdated: new Date().toISOString(),
  updatedBy: "NAS Agent",
  days: [
    {
      dayNumber: 1,
      dateStr: "2026-10-15",
      title: "Arrival in Dubai & Evening Marina Cruise",
      activities: [
        {
          id: "act-1",
          time: "10:30 AM",
          type: "flight",
          title: "Emirates Flight EK-543 (Chennai to Dubai)",
          description: "Direct flight departure from Chennai International Airport. Flight duration ~4h 15m.",
          location: "Chennai (MAA) to Dubai (DXB)",
          estimatedCostINR: 26000
        },
        {
          id: "act-2",
          time: "02:00 PM",
          type: "transfer",
          title: "Private Airport Transfer & Hotel Check-in",
          description: "Meet NAS Dubai coordinator outside arrival gate 3. Check into Millennium Place Marina Hotel.",
          location: "Dubai Marina",
          estimatedCostINR: 2500
        },
        {
          id: "act-3",
          time: "07:30 PM",
          type: "activity",
          title: "Dubai Marina Luxury Dhow Dinner Cruise",
          description: "2-hour scenic cruise past illuminated skyscrapers with buffet dinner and live performances.",
          location: "Dubai Marina Promenade",
          estimatedCostINR: 4500
        }
      ]
    },
    {
      dayNumber: 2,
      dateStr: "2026-10-16",
      title: "Burj Khalifa & Dubai Mall Wonders",
      activities: [
        {
          id: "act-4",
          time: "09:30 AM",
          type: "sightseeing",
          title: "Dubai Frame & Old Dubai Creek Tour",
          description: "Explore Abra ride across Dubai Creek, Al Fahidi Historical District, and Dubai Frame photo stop.",
          location: "Deira / Bur Dubai",
          estimatedCostINR: 3000
        },
        {
          id: "act-5",
          time: "04:00 PM",
          type: "sightseeing",
          title: "Burj Khalifa At The Top (124th Floor)",
          description: "High-speed elevator to observation deck for panoramic 360 views over Dubai skyline.",
          location: "Downtown Dubai",
          estimatedCostINR: 6500
        },
        {
          id: "act-6",
          time: "07:00 PM",
          type: "meal",
          title: "Dubai Fountain Show & Dinner",
          description: "Watch the world's largest musical fountain show with dinner overlooking the lake.",
          location: "Dubai Mall Waterfront",
          estimatedCostINR: 3500
        }
      ]
    },
    {
      dayNumber: 3,
      dateStr: "2026-10-17",
      title: "Desert Safari Thrills & Bedouin Camp",
      activities: [
        {
          id: "act-7",
          time: "10:00 AM",
          type: "note",
          title: "Morning Relaxation / Museum of the Future",
          description: "Optional visit to Museum of the Future or leisure at hotel pool.",
          location: "Sheikh Zayed Road",
          estimatedCostINR: 4000
        },
        {
          id: "act-8",
          time: "03:00 PM",
          type: "activity",
          title: "4x4 Dune Bashing & Desert Safari",
          description: "Pick-up in luxury 4x4 Land Cruiser. Sandboarding, sunset photo stop, camel ride, quad biking.",
          location: "Lahbab Red Dunes Desert",
          estimatedCostINR: 7000
        },
        {
          id: "act-9",
          time: "07:00 PM",
          type: "meal",
          title: "BBQ Dinner & Cultural Shows in Desert",
          description: "Belly Dance, Tanoura dance, Fire show, and open BBQ dinner buffet under the stars.",
          location: "Bedouin Desert Camp",
          estimatedCostINR: 0
        }
      ]
    }
  ]
};
