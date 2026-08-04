export interface TourPackage {
  id: string;
  title: string;
  category: 'hajj_umrah' | 'international' | 'domestic' | 'honeymoon' | 'luxury';
  continent?: 'Asia' | 'Americas' | 'Africa' | 'Europe' | 'Oceania';
  destination: string;
  duration: string; // e.g., "5 Days / 4 Nights"
  priceINR: number;
  originalPriceINR?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  highlights: string[];
  inclusions: string[];
  makkahHotel?: string;
  madinahHotel?: string;
  featured?: boolean;
  badge?: string; // e.g. "MOST POPULAR", "BOOKING OPEN", "FULLY BOOKED"
  status?: 'OPEN' | 'FULL' | 'FILLING' | 'CLOSED';
  groupOrPrivate?: 'GROUP' | 'PRIVATE';
  datesStr?: string; // e.g., "26 Apr 2026 - 6 May 2026"
  departureCity?: string;
  description: string;
  itinerary: {
    day: number;
    title: string;
    details: string;
  }[];
}

export interface VisaInfo {
  id: string;
  country: string;
  countryCode?: string;
  flag: string;
  processingTime: string;
  validity: string;
  stayPeriod?: string;
  entryType: string;
  feeINR: number;
  image?: string;
  category?: 'trending' | 'evisa' | 'express' | 'cheapest';
  visasOnTimeBadge?: string; // e.g. "16+ Visas on Time"
  deliveryEstimate?: string; // e.g. "Get on 14 Aug 2026"
  documentsRequired: string[];
  nasAssistanceNotes: string;
}

export interface DocumentAttestationService {
  id: string;
  title: string;
  category: 'educational' | 'personal' | 'commercial';
  description: string;
  steps: string[];
  processingTime: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  category: string;
  summary: string;
}

export interface CountryServe {
  name: string;
  code: string;
  flag: string;
}

export interface TravelerDetail {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'Male' | 'Female';
  dob: string; // DD-MM-YYYY
  occupation: string;
  mobile: string;
  email: string;
  relation: 'Self' | 'Spouse' | 'Child' | 'Parent' | 'Relative';
  city: string;
  state: string;
  passportNumber: string;
  passportExpiry: string; // DD-MM-YYYY
  passportFile?: string; // base64 or filename
}

export interface ActivityItem {
  id: string;
  time: string; // e.g., "09:00 AM"
  type: 'flight' | 'hotel' | 'sightseeing' | 'meal' | 'activity' | 'transfer' | 'note';
  title: string;
  description: string;
  location?: string;
  estimatedCostINR?: number;
}

export interface DayItinerary {
  dayNumber: number;
  dateStr?: string;
  title: string;
  activities: ActivityItem[];
}

export interface TripPlan {
  id: string;
  shareCode: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelersCount: number;
  budgetLevel: 'budget' | 'moderate' | 'luxury' | 'vip';
  days: DayItinerary[];
  totalEstimatedCostINR: number;
  lastUpdated: string;
  updatedBy: string;
}

export interface FlightSearchQuery {
  tripType: 'oneWay' | 'roundTrip' | 'multiCity';
  fromCity: string;
  toCity: string;
  departDate: string;
  returnDate?: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  travelClass: 'economy' | 'premiumEconomy' | 'business' | 'first';
}

export interface BookingInquiry {
  id: string;
  referenceNo: string;
  customerName: string;
  phone: string;
  email: string;
  serviceType: 'Package' | 'Flight' | 'Hajj/Umrah' | 'Visa' | 'Attestation' | 'Education' | 'Custom Trip' | string;
  details: string;
  createdTime: string;
  status: 'Pending' | 'Contacted' | 'Confirmed' | 'Rejected';
  // Payment Verification fields
  paymentMethod?: 'UPI / GPay / PhonePe' | 'Bank Transfer (IMPS/NEFT)' | 'Cash at Chennai Office' | 'Credit / Debit Card' | string;
  paymentAmountINR?: number;
  paymentScreenshot?: string; // Base64 Data URL
  paymentUtr?: string;
  paymentStatus?: 'Pending Verification' | 'Approved' | 'Rejected' | 'Not Required';
  adminNotes?: string;
  approvedAt?: string;
  approvedBy?: string;
  // Traveler details if visa application
  travelers?: TravelerDetail[];
  travelDates?: { departure: string; returnDate: string };
}

