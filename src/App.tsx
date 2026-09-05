import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingView } from './components/views/LandingView';
import { ToursView } from './components/views/ToursView';
import { VisaView } from './components/views/VisaView';
import { ContactView } from './components/views/ContactView';
import { BlogsView } from './components/views/BlogsView';
import { FaqsView } from './components/views/FaqsView';
import { WizardView } from './components/views/WizardView';
import { UserDashboardView } from './components/views/UserDashboardView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { AdminLoginView } from './components/views/AdminLoginView';
import { AccessDeniedView } from './components/views/AccessDeniedView';
import { PaymentTrackerView } from './components/views/PaymentTrackerView';
import { VisaDetailModal } from './components/modals/VisaDetailModal';
import { AdditionalServiceModals } from './components/modals/AdditionalServiceModals';
import { AuthModal } from './components/modals/AuthModal';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <LandingView />;
      case 'tours':
        return <ToursView />;
      case 'visa-finder':
        return <VisaView />;
      case 'contact':
        return <ContactView />;
      case 'blogs':
        return <BlogsView />;
      case 'faqs':
        return <FaqsView />;
      case 'wizard':
        return <WizardView />;
      case 'user-dashboard':
        return <UserDashboardView />;
      case 'admin-login':
        return <AdminLoginView />;
      case 'admin-dashboard':
        return <AdminDashboardView />;
      case 'access-denied':
        return <AccessDeniedView />;
      case 'payment-tracker':
        return <PaymentTrackerView />;
      default:
        return <LandingView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />
      <div className="flex-1 pb-16 lg:pb-0">
        {renderView()}
      </div>
      <Footer />

      {/* Global Modals */}
      <AuthModal />
      <VisaDetailModal />
      <AdditionalServiceModals />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
