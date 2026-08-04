import React, { useState, useEffect } from 'react';
import { TripPlan, VisaInfo } from './types';
import { getStoredTrips, saveTripToStore } from './lib/realtime';
import { INITIAL_SAMPLE_TRIP } from './lib/data';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VisaSection } from './components/VisaSection';
import { ToursSection } from './components/ToursSection';
import { WhyTripateSection } from './components/WhyTripateSection';
import { CountriesGridSection } from './components/CountriesGridSection';
import { FaqsSection } from './components/FaqsSection';
import { ContactSection } from './components/ContactSection';
import { AdminPage } from './components/AdminPage';
import { TripPlanner } from './components/TripPlanner';
import { Footer } from './components/Footer';

import { AiPlannerModal } from './components/AiPlannerModal';
import { FlightSearchModal } from './components/FlightSearchModal';
import { BookingModal } from './components/BookingModal';
import { MyTripsDrawer } from './components/MyTripsDrawer';
import { VisaApplyModal } from './components/VisaApplyModal';
import { UserBookingsDrawer } from './components/UserBookingsDrawer';
import { UserAuthModal } from './components/UserAuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [visaSearchQuery, setVisaSearchQuery] = useState<string>('');
  
  // User Authentication State
  const [user, setUser] = useState<{ isLoggedIn: boolean; name: string; phone: string } | null>(() => {
    const saved = localStorage.getItem('nas_logged_user') || localStorage.getItem('tripate_logged_user');
    return saved ? JSON.parse(saved) : { isLoggedIn: false, name: '', phone: '' };
  });

  // Trip State
  const [currentTrip, setCurrentTrip] = useState<TripPlan>(() => {
    const saved = getStoredTrips();
    return saved.length > 0 ? saved[0] : INITIAL_SAMPLE_TRIP;
  });
  const [savedTripsCount, setSavedTripsCount] = useState<number>(() => getStoredTrips().length);

  // Modals & Drawers state
  const [isAiPlannerOpen, setIsAiPlannerOpen] = useState(false);
  const [isMyTripsOpen, setIsMyTripsOpen] = useState(false);
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [isUserBookingsOpen, setIsUserBookingsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Visa Application Modal state
  const [selectedVisaForApply, setSelectedVisaForApply] = useState<VisaInfo | null>(null);

  // Generic inquiry booking modal state
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    serviceName: string;
    initialDetails: string;
  }>({
    isOpen: false,
    serviceName: '',
    initialDetails: ''
  });

  const handleOpenBooking = (serviceName: string, initialDetails: string) => {
    setBookingModal({
      isOpen: true,
      serviceName,
      initialDetails
    });
  };

  const handleCloseBooking = () => {
    setBookingModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleImportAiTrip = (newTrip: TripPlan) => {
    saveTripToStore(newTrip, 'Tripate Engine');
    setCurrentTrip(newTrip);
    setSavedTripsCount(getStoredTrips().length);
    setActiveTab('planner');
  };

  const handleSelectTrip = (trip: TripPlan) => {
    setCurrentTrip(trip);
    setActiveTab('planner');
  };

  const handleLoginSuccess = (userData: { name: string; phone: string }) => {
    const logged = { isLoggedIn: true, name: userData.name, phone: userData.phone };
    setUser(logged);
    localStorage.setItem('nas_logged_user', JSON.stringify(logged));
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false, name: '', phone: '' });
    localStorage.removeItem('nas_logged_user');
    localStorage.removeItem('tripate_logged_user');
  };

  const handleSelectCountryFromHeroOrGrid = (countryName: string) => {
    setVisaSearchQuery(countryName);
    setActiveTab('visa');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 flex flex-col justify-between">
      <div>
        {/* Main Header Nav */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
          onOpenMyTrips={() => setIsMyTripsOpen(true)}
          onOpenFlightSearch={() => setIsFlightModalOpen(true)}
          savedTripsCount={savedTripsCount}
          user={user}
          onOpenLogin={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onOpenUserBookings={() => setIsUserBookingsOpen(true)}
        />

        {/* Dynamic View Content based on active tab */}
        <main className="pb-16">
          
          {/* HOME TAB: Full Landing Page */}
          {activeTab === 'home' && (
            <>
              <Hero
                onSearchVisa={(query) => {
                  setVisaSearchQuery(query);
                  setActiveTab('visa');
                }}
                onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
                onSelectCountry={handleSelectCountryFromHeroOrGrid}
              />

              <VisaSection
                onSelectVisa={(visa) => setSelectedVisaForApply(visa)}
                searchQuery={visaSearchQuery}
              />

              <ToursSection
                onBookTour={(name, details) => handleOpenBooking(name, details)}
                onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
              />

              <WhyTripateSection />

              <CountriesGridSection
                onSelectCountryName={handleSelectCountryFromHeroOrGrid}
              />

              <FaqsSection />

              <ContactSection />
            </>
          )}

          {/* TOURS TAB */}
          {activeTab === 'tours' && (
            <ToursSection
              onBookTour={(name, details) => handleOpenBooking(name, details)}
              onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
            />
          )}

          {/* VISA TAB */}
          {activeTab === 'visa' && (
            <div>
              <VisaSection
                onSelectVisa={(visa) => setSelectedVisaForApply(visa)}
                searchQuery={visaSearchQuery}
              />
              <CountriesGridSection
                onSelectCountryName={(cName) => {
                  setVisaSearchQuery(cName);
                }}
              />
              <WhyTripateSection />
            </div>
          )}

          {/* FAQS TAB */}
          {activeTab === 'faqs' && (
            <FaqsSection />
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <ContactSection />
          )}

          {/* PLANNER TAB */}
          {activeTab === 'planner' && (
            <TripPlanner
              currentTrip={currentTrip}
              onTripChange={(updated) => {
                setCurrentTrip(updated);
                setSavedTripsCount(getStoredTrips().length);
              }}
              onOpenAiModal={() => setIsAiPlannerOpen(true)}
              onOpenBookingModal={handleOpenBooking}
            />
          )}

          {/* ADMIN PORTAL */}
          {activeTab === 'admin' && (
            <AdminPage />
          )}
        </main>
      </div>

      {/* Main Footer */}
      <Footer
        onNavigateTab={setActiveTab}
        onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
      />

      {/* Global Modals & Drawers */}
      <AiPlannerModal
        isOpen={isAiPlannerOpen}
        onClose={() => setIsAiPlannerOpen(false)}
        onImportGeneratedTrip={handleImportAiTrip}
      />

      <FlightSearchModal
        isOpen={isFlightModalOpen}
        onClose={() => setIsFlightModalOpen(false)}
        onSubmitInquiry={(service, details) => {
          handleOpenBooking(service, details);
        }}
      />

      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={handleCloseBooking}
        serviceName={bookingModal.serviceName}
        initialDetails={bookingModal.initialDetails}
      />

      <MyTripsDrawer
        isOpen={isMyTripsOpen}
        onClose={() => setIsMyTripsOpen(false)}
        onSelectTrip={handleSelectTrip}
        onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
      />

      <VisaApplyModal
        isOpen={!!selectedVisaForApply}
        visa={selectedVisaForApply}
        onClose={() => setSelectedVisaForApply(null)}
        onApplicationCompleted={(newBooking) => {
          setIsUserBookingsOpen(true);
        }}
        userPhone={user?.phone || '+91 91709708777'}
      />

      <UserBookingsDrawer
        isOpen={isUserBookingsOpen}
        onClose={() => setIsUserBookingsOpen(false)}
        userPhone={user?.phone}
      />

      <UserAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
