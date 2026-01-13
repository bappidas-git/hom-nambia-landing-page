/* ============================================
   App Component - Nambiar District 25 Phase 2
   Real Estate Landing Page
   ============================================ */

import React, { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';

// Context Providers
import { ModalProvider } from './context/ModalContext';

// Common Components
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import MobileNavigation from './components/common/MobileNavigation/MobileNavigation';

// Lazy load sections for better performance
const HeroSection = lazy(() => import('./components/sections/HeroSection/HeroSection'));
const OverviewSection = lazy(() => import('./components/sections/OverviewSection/OverviewSection'));
const ProjectHighlights = lazy(() => import('./components/sections/ProjectHighlights/ProjectHighlights'));
const AmenitiesSection = lazy(() => import('./components/sections/AmenitiesSection/AmenitiesSection'));
const PricingSection = lazy(() => import('./components/sections/PricingSection/PricingSection'));
const FloorPlansSection = lazy(() => import('./components/sections/FloorPlansSection/FloorPlansSection'));
const LocationSection = lazy(() => import('./components/sections/LocationSection/LocationSection'));
const CTASection = lazy(() => import('./components/sections/CTASection/CTASection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection/ContactSection'));

// Loading fallback component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      width: '100%',
    }}
  >
    <CircularProgress
      sx={{
        color: 'secondary.main',
      }}
      size={48}
      thickness={4}
    />
  </Box>
);

const App = () => {
  return (
    <ModalProvider>
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
        }}
      >
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Suspense fallback={<LoadingFallback />}>
          {/* Hero Section */}
          <HeroSection />

          {/* Overview Section */}
          <OverviewSection />

          {/* Project Highlights */}
          <ProjectHighlights />

          {/* Amenities Section */}
          <AmenitiesSection />

          {/* Pricing Section */}
          <PricingSection />

          {/* Floor Plans Section */}
          <FloorPlansSection />

          {/* Location Section */}
          <LocationSection />

          {/* CTA Section */}
          <CTASection />

          {/* Contact Section */}
          <ContactSection />
        </Suspense>

        {/* Footer */}
        <Footer />

        {/* Mobile Bottom Navigation */}
        <MobileNavigation />
      </Box>
    </ModalProvider>
  );
};

export default App;
