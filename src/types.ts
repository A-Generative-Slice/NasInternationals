export type ViewMode = 
  | 'home' 
  | 'visa-finder' 
  | 'wizard' 
  | 'user-dashboard' 
  | 'admin-login'
  | 'admin-dashboard' 
  | 'payment-tracker'
  | 'access-denied';

export type UserRole = 'USER' | 'ADMIN';

export type VisaType = 'Tourist Visa' | 'Business Visa' | 'Student Visa' | 'Employment Visa';

export type ApplicationStatus = 
  | 'Submitted' 
  | 'Under Review' 
  | 'In Process' 
  | 'Processing' 
  | 'Approved' 
  | 'Completed' 
  | 'Pending'
  | 'Pending Payment' 
  | 'Rejected';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  passportNumber?: string;
  nationality?: string;
  address?: string;
  status?: 'Active' | 'Suspended';
  createdAt?: string;
  token?: string;
  twoFactorEnabled?: boolean;
}

export interface VisaItem {
  id: string;
  title: string;
  type: VisaType;
  priceInINR: number;
  processingTimeMin: number;
  processingTimeMax: number;
  description: string;
  requirements: string[];
  iconName: 'globe' | 'briefcase' | 'graduation-cap' | 'handshake';
}

export interface TimelineStep {
  title: string;
  date: string;
  completed: boolean;
  isCurrent: boolean;
}

export interface DocumentUploadItem {
  id: string;
  title: string;
  required: boolean;
  fileName?: string;
  fileUrl?: string;
  uploadDate?: string;
  status: 'Pending' | 'Uploaded' | 'Verified' | 'Rejected';
  rejectionReason?: string;
}

export interface PaymentInfo {
  bookingId: string;
  amount: number;
  upiQrCodeUrl: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  transactionId?: string;
  proofFileName?: string;
  proofUrl?: string;
  paymentDate?: string;
  isVerified: boolean;
  rejectionReason?: string;
}

export interface ApplicationItem {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  passportNumber: string;
  type: string;
  destination: string;
  nationality: string;
  purpose: string;
  dateSubmitted: string;
  status: ApplicationStatus;
  statusNote?: string;
  timeline: TimelineStep[];
  documents: DocumentUploadItem[];
  payment: PaymentInfo;
  assignedOfficer?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  priceInINR: number;
  image: string;
  inclusions: string[];
  isFeatured: boolean;
  active: boolean;
}

export interface TourPackageBooking {
  id: string;
  packageId: string;
  packageName: string;
  destination: string;
  travelDate: string;
  travelersCount: number;
  totalAmount: number;
  status: 'Confirmed' | 'Pending Payment' | 'Completed' | 'Cancelled';
  bookingDate: string;
  userEmail: string;
  invoiceId?: string;
  paymentStatus: 'Paid' | 'Pending' | 'Verified';
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  userEmail: string;
  action: string;
  ipAddress: string;
  level: 'info' | 'warn' | 'security' | 'admin';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  destination: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Replied' | 'Archived';
}

export interface WebsiteSettings {
  siteName: string;
  supportPhone: string;
  supportEmail: string;
  heroHeadline: string;
  heroSubheadline: string;
  announcementBarText: string;
  announcementActive: boolean;
  emailNotificationsEnabled: boolean;
  whatsappNotificationsEnabled: boolean;
  maintenanceMode: boolean;
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  items: { description: string; amount: number }[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  startingPrice: number;
}

export interface AdditionalService {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}
