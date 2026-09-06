import { VisaItem, ApplicationItem, Destination, AdditionalService } from '../types';

export const VISA_CATEGORIES: VisaItem[] = [
  {
    id: 'tourist-visa',
    title: 'TOURIST VISA',
    type: 'Tourist Visa',
    priceInINR: 5000,
    processingTimeMin: 5,
    processingTimeMax: 10,
    description: 'Ideal for vacations, leisure travel, and visiting family or friends abroad.',
    iconName: 'globe',
    requirements: [
      'Valid Passport with 6+ months validity',
      'Recent passport-sized photographs (35x45mm)',
      'Bank statements for the last 3 to 6 months',
      'Flight itinerary & hotel booking confirmation',
      'Cover letter explaining travel purpose'
    ]
  },
  {
    id: 'business-visa',
    title: 'BUSINESS VISA',
    type: 'Business Visa',
    priceInINR: 8000,
    processingTimeMin: 7,
    processingTimeMax: 15,
    description: 'For corporate travel, business meetings, trade shows, and short negotiations.',
    iconName: 'briefcase',
    requirements: [
      'Valid Passport with at least 2 blank pages',
      'Invitation letter from host company overseas',
      'Covering letter on Indian company letterhead',
      'Proof of business registration & tax returns',
      'Bank statements of company & personal account'
    ]
  },
  {
    id: 'student-visa',
    title: 'STUDENT VISA',
    type: 'Student Visa',
    priceInINR: 10000,
    processingTimeMin: 10,
    processingTimeMax: 20,
    description: 'Pursue higher education, diploma, or language programs at overseas universities.',
    iconName: 'graduation-cap',
    requirements: [
      'Official Acceptance Letter / CAS from University',
      'Academic transcripts, diplomas & degree certificates',
      'Proof of financial support / education loan sanction',
      'Language proficiency test results (IELTS/TOEFL)',
      'Medical clearance & Health insurance'
    ]
  },
  {
    id: 'employment-visa',
    title: 'EMPLOYMENT VISA',
    type: 'Employment Visa',
    priceInINR: 12000,
    processingTimeMin: 15,
    processingTimeMax: 30,
    description: 'Long-term work permits and employment relocation for professionals.',
    iconName: 'handshake',
    requirements: [
      'Signed Work Contract / Employment Offer',
      'Sponsorship letter / Work Permit approval from Ministry of Labor',
      'Educational credential attestation by Embassy',
      'Police Clearance Certificate (PCC)',
      'Comprehensive Medical Examination Report'
    ]
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'singapore',
    name: 'Singapore',
    tagline: 'Modern Metropolis & Garden City',
    description: 'Explore futuristic architecture, Marina Bay, world-class entertainment, and global shopping hubs with express digital e-visas.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    startingPrice: 3500
  },
  {
    id: 'london',
    name: 'London Tower Bridge',
    tagline: 'Historic Charm & Financial Hub',
    description: 'Explore the iconic sights of Great Britain, historic landmarks, world-class museums, and vibrant metropolitan lifestyle.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    startingPrice: 12500
  },
  {
    id: 'dubai',
    name: 'Dubai Burj Khalifa',
    tagline: 'City of Gold & Futuristic Marvels',
    description: 'Discover futuristic skyscrapers, desert safaris, luxury shopping, and fast-track 30-day and 60-day tourist visas.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    startingPrice: 6500
  },
  {
    id: 'paris',
    name: 'Paris Eiffel Tower',
    tagline: 'Schengen Gateway & Cultural Capital',
    description: 'Experience European romance, art, and seamless multi-country travel across Schengen states.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    startingPrice: 9500
  }
];

export const ADDITIONAL_SERVICES: AdditionalService[] = [
  {
    id: 'doc-attestation',
    title: 'DOCUMENT ATTESTATION',
    description: 'Fast and reliable attestation for educational, personal, and commercial documents by MEA, HRD & Foreign Embassies.',
    icon: 'stamp',
    details: [
      'Ministry of External Affairs (MEA) Apostille',
      'HRD & Home Department Verification',
      'Embassy Attestation (UAE, Saudi, Qatar, Kuwait)',
      'Commercial Document Attestation & Chamber of Commerce'
    ]
  },
  {
    id: 'passport-services',
    title: 'PASSPORT SERVICES',
    description: 'New passports, renewals, name changes, Tatkal applications, and other passport-related consultancy.',
    icon: 'passport',
    details: [
      'Fresh Passport & Tatkal Expedited Booking',
      'Passport Renewal & Address Modification',
      'ECNR Status Change & Name Corrections',
      'Lost / Damaged Passport Replacement Assistance'
    ]
  }
];

export const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'VISA-CAN-20240815',
    applicantName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    passportNumber: 'Z8923412',
    type: 'Visitor Visa',
    destination: 'Canada',
    nationality: 'Indian',
    purpose: 'Tourism & Leisure',
    dateSubmitted: '15 Aug 2024',
    status: 'Under Review',
    statusNote: 'Your Canada Visitor Visa application is currently under review by our specialist immigration team.',
    timeline: [
      { title: 'Submitted', date: '15 Aug 2024', completed: true, isCurrent: false },
      { title: 'Under Review', date: '18 Aug 2024', completed: true, isCurrent: true },
      { title: 'In Process', date: 'Expected 24 Aug', completed: false, isCurrent: false },
      { title: 'Approved', date: 'Pending', completed: false, isCurrent: false }
    ],
    documents: [
      { id: 'doc-1', title: 'Passport Bio-Page', required: true, fileName: 'passport_rahul.pdf', uploadDate: '15 Aug 2024', status: 'Verified' },
      { id: 'doc-2', title: 'Recent Photograph', required: true, fileName: 'photo_rahul.jpg', uploadDate: '15 Aug 2024', status: 'Verified' },
      { id: 'doc-3', title: 'Bank Statements (Last 3 Months)', required: true, fileName: 'bank_statement.pdf', uploadDate: '15 Aug 2024', status: 'Uploaded' }
    ],
    payment: {
      bookingId: 'NAS-987654321',
      amount: 8500,
      upiQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=9941900055@sbi&pn=Nas%20Internationals&am=8500&cu=INR',
      bankName: 'State Bank Of India',
      accountName: 'Nas Internationals',
      accountNumber: '39081079535',
      ifscCode: 'SBIN0005201',
      branch: 'Poonamallee',
      upiNumber: '9941900055',
      duration: '1 year',
      transactionId: 'UPI/423190823/NAS',
      proofFileName: 'payment_receipt.png',
      paymentDate: '15 Aug 2024',
      isVerified: true
    }
  },
  {
    id: 'AIR-DXB-20240720',
    applicantName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    passportNumber: 'Z8923412',
    type: 'Air Ticketing',
    destination: 'Dubai',
    nationality: 'Indian',
    purpose: 'Air Ticketing & Transit',
    dateSubmitted: '20 Jul 2024',
    status: 'Completed',
    statusNote: 'Dubai Flight Tickets and 30-Day Express Visa issued successfully.',
    timeline: [
      { title: 'Submitted', date: '20 Jul 2024', completed: true, isCurrent: false },
      { title: 'Under Review', date: '21 Jul 2024', completed: true, isCurrent: false },
      { title: 'In Process', date: '23 Jul 2024', completed: true, isCurrent: false },
      { title: 'Approved', date: '25 Jul 2024', completed: true, isCurrent: true }
    ],
    documents: [
      { id: 'doc-1', title: 'Passport Bio-Page', required: true, fileName: 'passport_rahul.pdf', uploadDate: '20 Jul 2024', status: 'Verified' },
      { id: 'doc-2', title: 'Recent Photograph', required: true, fileName: 'photo.jpg', uploadDate: '20 Jul 2024', status: 'Verified' }
    ],
    payment: {
      bookingId: 'NAS-77123901',
      amount: 6500,
      upiQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=9941900055@sbi&pn=Nas%20Internationals',
      bankName: 'State Bank Of India',
      accountName: 'Nas Internationals',
      accountNumber: '39081079535',
      ifscCode: 'SBIN0005201',
      branch: 'Poonamallee',
      upiNumber: '9941900055',
      duration: '1 year',
      transactionId: 'UPI/982301823/NAS',
      paymentDate: '20 Jul 2024',
      isVerified: true
    }
  },
  {
    id: 'VISA-SGP-20240610',
    applicantName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    passportNumber: 'Z8923412',
    type: 'Business Visa',
    destination: 'Singapore',
    nationality: 'Indian',
    purpose: 'Business & Conference',
    dateSubmitted: '10 Jun 2024',
    status: 'Approved',
    statusNote: 'Singapore E-Visa granted for 2 years multiple entry.',
    timeline: [
      { title: 'Submitted', date: '10 Jun 2024', completed: true, isCurrent: false },
      { title: 'Under Review', date: '11 Jun 2024', completed: true, isCurrent: false },
      { title: 'Processing', date: '12 Jun 2024', completed: true, isCurrent: false },
      { title: 'Visa Approved', date: '14 Jun 2024', completed: true, isCurrent: true }
    ],
    documents: [],
    payment: {
      bookingId: 'NAS-66519022',
      amount: 8000,
      upiQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=9941900055@sbi&pn=Nas%20Internationals',
      bankName: 'State Bank Of India',
      accountName: 'Nas Internationals',
      accountNumber: '39081079535',
      ifscCode: 'SBIN0005201',
      branch: 'Poonamallee',
      upiNumber: '9941900055',
      duration: '1 year',
      transactionId: 'UPI/771293021/NAS',
      paymentDate: '10 Jun 2024',
      isVerified: true
    }
  },
  {
    id: 'VISA-FRA-20241024',
    applicantName: 'Sarah Lee',
    email: 'sarah.lee@example.com',
    phone: '+1 415 555 0199',
    passportNumber: 'U9928172',
    type: 'Visitor Visa',
    destination: 'France',
    nationality: 'American',
    purpose: 'Tourism & Leisure',
    dateSubmitted: '24 Oct 2024',
    status: 'Processing',
    statusNote: 'Documents undergoing biometric & embassy validation.',
    timeline: [
      { title: 'Submitted', date: '24 Oct 2024', completed: true, isCurrent: false },
      { title: 'Under Review', date: '25 Oct 2024', completed: true, isCurrent: false },
      { title: 'Processing', date: '26 Oct 2024', completed: true, isCurrent: true },
      { title: 'Approved', date: 'Pending', completed: false, isCurrent: false }
    ],
    documents: [],
    payment: {
      bookingId: 'NAS-55419023',
      amount: 9500,
      upiQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=9941900055@sbi&pn=Nas%20Internationals',
      bankName: 'State Bank Of India',
      accountName: 'Nas Internationals',
      accountNumber: '39081079535',
      ifscCode: 'SBIN0005201',
      branch: 'Poonamallee',
      upiNumber: '9941900055',
      duration: '1 year',
      transactionId: 'UPI/66129831/NAS',
      paymentDate: '24 Oct 2024',
      isVerified: true
    }
  },
  {
    id: 'DOC-THA-20241023',
    applicantName: 'Rahul K.',
    email: 'rahul.k@example.com',
    phone: '+91 99887 76655',
    passportNumber: 'P7721893',
    type: 'Document Attestation',
    destination: 'Thailand',
    nationality: 'Indian',
    purpose: 'Document Verification & Attestation',
    dateSubmitted: '23 Oct 2024',
    status: 'Pending Payment',
    statusNote: 'Awaiting payment verification before forwarding to Thai consulate.',
    timeline: [
      { title: 'Submitted', date: '23 Oct 2024', completed: true, isCurrent: true },
      { title: 'Under Review', date: 'Pending', completed: false, isCurrent: false },
      { title: 'Processing', date: 'Pending', completed: false, isCurrent: false },
      { title: 'Approved', date: 'Pending', completed: false, isCurrent: false }
    ],
    documents: [],
    payment: {
      bookingId: 'NAS-33190288',
      amount: 5000,
      upiQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=9941900055@sbi&pn=Nas%20Internationals&am=5000&cu=INR',
      bankName: 'State Bank Of India',
      accountName: 'Nas Internationals',
      accountNumber: '39081079535',
      ifscCode: 'SBIN0005201',
      branch: 'Poonamallee',
      upiNumber: '9941900055',
      duration: '1 year',
      isVerified: false
    }
  },
  {
    id: 'EDU-FRA-20241023',
    applicantName: 'Andiria Allan',
    email: 'andiria@example.com',
    phone: '+44 7700 900077',
    passportNumber: 'G8839210',
    type: 'Education Consultancy',
    destination: 'France',
    nationality: 'British',
    purpose: 'Education & Studies',
    dateSubmitted: '23 Oct 2024',
    status: 'Pending Payment',
    statusNote: 'Payment authorization required.',
    timeline: [
      { title: 'Submitted', date: '23 Oct 2024', completed: true, isCurrent: true },
      { title: 'Under Review', date: 'Pending', completed: false, isCurrent: false },
      { title: 'Processing', date: 'Pending', completed: false, isCurrent: false },
      { title: 'Approved', date: 'Pending', completed: false, isCurrent: false }
    ],
    documents: [],
    payment: {
      bookingId: 'NAS-99120349',
      amount: 9500,
      upiQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=9941900055@sbi&pn=Nas%20Internationals',
      bankName: 'State Bank Of India',
      accountName: 'Nas Internationals',
      accountNumber: '39081079535',
      ifscCode: 'SBIN0005201',
      branch: 'Poonamallee',
      upiNumber: '9941900055',
      duration: '1 year',
      isVerified: false
    }
  },
  {
    id: 'VISA-THA-20241022',
    applicantName: 'Sarah Noror',
    email: 'sarah.noror@example.com',
    phone: '+91 88776 55443',
    passportNumber: 'K1122334',
    type: 'Tourist Visa',
    destination: 'Thailand',
    nationality: 'Indian',
    purpose: 'Tourism & Leisure',
    dateSubmitted: '22 Oct 2024',
    status: 'Processing',
    statusNote: 'E-visa application submitted to Bangkok immigration.',
    timeline: [
      { title: 'Submitted', date: '22 Oct 2024', completed: true, isCurrent: false },
      { title: 'Under Review', date: '23 Oct 2024', completed: true, isCurrent: false },
      { title: 'Processing', date: '24 Oct 2024', completed: true, isCurrent: true },
      { title: 'Approved', date: 'Pending', completed: false, isCurrent: false }
    ],
    documents: [],
    payment: {
      bookingId: 'NAS-22910394',
      amount: 5000,
      upiQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=9941900055@sbi&pn=Nas%20Internationals',
      bankName: 'State Bank Of India',
      accountName: 'Nas Internationals',
      accountNumber: '39081079535',
      ifscCode: 'SBIN0005201',
      branch: 'Poonamallee',
      upiNumber: '9941900055',
      duration: '1 year',
      transactionId: 'UPI/55129038/NAS',
      paymentDate: '22 Oct 2024',
      isVerified: true
    }
  }
];

export const COUNTRIES_LIST = [
  'Canada',
  'Dubai (UAE)',
  'Singapore',
  'France',
  'Thailand',
  'United Kingdom',
  'United States',
  'Saudi Arabia',
  'Australia',
  'Germany',
  'Japan',
  'Qatar'
];

export const NATIONALITIES_LIST = [
  'Indian',
  'American',
  'British',
  'Canadian',
  'Australian',
  'Emirati',
  'German',
  'French',
  'Singaporean',
  'Saudi Arabian'
];

export const PURPOSES_LIST = [
  'Tourism & Leisure',
  'Business & Conference',
  'Education & Studies',
  'Employment & Work',
  'Family Visit',
  'Document Attestation & Air Ticketing'
];
