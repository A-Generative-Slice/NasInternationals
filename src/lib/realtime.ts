import { TripPlan, BookingInquiry } from '../types';
import { INITIAL_SAMPLE_TRIP } from './data';

const CHANNEL_NAME = 'nas_travel_realtime_v1';
const STORAGE_KEY_TRIPS = 'nas_saved_trips_store';
const STORAGE_KEY_INQUIRIES = 'nas_inquiries_store';

export type RealtimeEventType = 
  | 'TRIP_UPDATED' 
  | 'TRIP_CREATED' 
  | 'INQUIRY_SUBMITTED' 
  | 'BOOKING_STATUS_UPDATED'
  | 'BOOKING_APPROVED'
  | 'BOOKING_REJECTED'
  | 'AGENT_MESSAGE_SENT'
  | 'VIEWER_JOINED';

export interface RealtimeMessage {
  id: string;
  type: RealtimeEventType;
  timestamp: string;
  sender: string;
  payload: any;
}

// In-Memory fallback + subscribers listener list
type Listener = (msg: RealtimeMessage) => void;
const listeners: Set<Listener> = new Set();

let channel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (event: MessageEvent<RealtimeMessage>) => {
      notifySubscribers(event.data);
    };
  } catch (e) {
    console.warn("BroadcastChannel not supported or restricted, falling back to local events.");
  }
}

// Window storage listener for multi-tab sync fallback
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'nas_realtime_event' && e.newValue) {
      try {
        const msg: RealtimeMessage = JSON.parse(e.newValue);
        notifySubscribers(msg);
      } catch (err) {
        // ignore parse error
      }
    }
  });
}

function notifySubscribers(msg: RealtimeMessage) {
  listeners.forEach((fn) => fn(msg));
}

export function subscribeRealtime(fn: Listener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function broadcastRealtimeEvent(type: RealtimeEventType, sender: string, payload: any) {
  const msg: RealtimeMessage = {
    id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type,
    timestamp: new Date().toISOString(),
    sender,
    payload
  };

  // Broadcast to other tabs
  if (channel) {
    try {
      channel.postMessage(msg);
    } catch (e) {
      // ignore
    }
  }

  // Storage fallback
  try {
    localStorage.setItem('nas_realtime_event', JSON.stringify(msg));
  } catch (e) {
    // ignore
  }

  // Also notify local listeners immediately
  notifySubscribers(msg);
}

export function publishRealtime({ type, payload, sender }: { type: RealtimeEventType; payload: any; sender?: string }) {
  broadcastRealtimeEvent(type, sender || 'System', payload);
}

// Helper methods for Trips store
export function getStoredTrips(): TripPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TRIPS);
    if (!raw) {
      // Initialize with sample trip
      const initial = [INITIAL_SAMPLE_TRIP];
      localStorage.setItem(STORAGE_KEY_TRIPS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return [INITIAL_SAMPLE_TRIP];
  }
}

export function saveTripToStore(trip: TripPlan, senderName = 'Traveler'): TripPlan {
  const trips = getStoredTrips();
  const existingIdx = trips.findIndex((t) => t.id === trip.id);
  const updatedTrip = {
    ...trip,
    lastUpdated: new Date().toISOString(),
    updatedBy: senderName
  };

  let newTrips: TripPlan[];
  if (existingIdx >= 0) {
    newTrips = [...trips];
    newTrips[existingIdx] = updatedTrip;
  } else {
    newTrips = [updatedTrip, ...trips];
  }

  try {
    localStorage.setItem(STORAGE_KEY_TRIPS, JSON.stringify(newTrips));
  } catch (e) {
    console.error("Failed to save trips to local storage", e);
  }

  broadcastRealtimeEvent(existingIdx >= 0 ? 'TRIP_UPDATED' : 'TRIP_CREATED', senderName, updatedTrip);
  return updatedTrip;
}

// Helper methods for Inquiries store
export function getStoredInquiries(): BookingInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INQUIRIES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function submitInquiry(inquiryData: Omit<BookingInquiry, 'id' | 'referenceNo' | 'createdTime' | 'status'>): BookingInquiry {
  const inquiries = getStoredInquiries();
  const refCode = `NAS-${Math.floor(100000 + Math.random() * 900000)}`;
  const newInquiry: BookingInquiry = {
    ...inquiryData,
    id: `inq-${Date.now()}`,
    referenceNo: refCode,
    createdTime: new Date().toISOString(),
    status: 'Pending'
  };

  const updatedList = [newInquiry, ...inquiries];
  try {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(updatedList));
  } catch (e) {
    console.error("Failed to save inquiry", e);
  }

  broadcastRealtimeEvent('INQUIRY_SUBMITTED', inquiryData.customerName || 'Customer', newInquiry);
  return newInquiry;
}

export function updateInquiryStatus(
  id: string,
  updates: Partial<BookingInquiry>,
  adminName = 'Admin'
): BookingInquiry | null {
  const inquiries = getStoredInquiries();
  const idx = inquiries.findIndex((inq) => inq.id === id);
  if (idx === -1) return null;

  const updated: BookingInquiry = {
    ...inquiries[idx],
    ...updates,
  };

  if (updates.paymentStatus === 'Approved') {
    updated.status = 'Confirmed';
    updated.approvedAt = new Date().toISOString();
    updated.approvedBy = adminName;
  } else if (updates.paymentStatus === 'Rejected') {
    updated.status = 'Rejected';
  }

  const newList = [...inquiries];
  newList[idx] = updated;

  try {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(newList));
  } catch (e) {
    console.error("Failed to update inquiry status", e);
  }

  const eventType = updates.paymentStatus === 'Approved' ? 'BOOKING_APPROVED' : updates.paymentStatus === 'Rejected' ? 'BOOKING_REJECTED' : 'BOOKING_STATUS_UPDATED';
  broadcastRealtimeEvent(eventType, adminName, updated);
  return updated;
}

export function deleteInquiry(id: string): void {
  const inquiries = getStoredInquiries();
  const newList = inquiries.filter((inq) => inq.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(newList));
  } catch (e) {
    console.error("Failed to delete inquiry", e);
  }
}
