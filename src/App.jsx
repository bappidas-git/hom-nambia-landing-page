/* ============================================
   App Component - Nambiar District 25 Phase 2
   Main application component with providers
   ============================================ */

import React, { Suspense, lazy } from 'react';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';

// Context Providers
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';

// Components (Eager loaded for critical path)
import Header from './components/common/Header/Header';
import HeroSection from './components/sections/HeroSection/HeroSection';
import OverviewSection from './components/sections/OverviewSection/OverviewSection';
import Footer from './components/common/Footer/Footer';
import Modal from './components/common/Modal/Modal';
import MobileNavigation from './components/common/MobileNavigation/MobileNavigation';

// Lazy loaded sections for performance
const ProjectHighlights = lazy(() => import('./components/sections/ProjectHighlights/ProjectHighlights'));
const AmenitiesSection = lazy(() => import('./components/sections/AmenitiesSection/AmenitiesSection'));
const PricingSection = lazy(() => import('./components/sections/PricingSection/PricingSection'));
const FloorPlansSection = lazy(() => import('./components/sections/FloorPlansSection/FloorPlansSection'));
const LocationSection = lazy(() => import('./components/sections/LocationSection/LocationSection'));
const CTASection = lazy(() => import('./components/sections/CTASection/CTASection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection/ContactSection'));

// App Styles
import './App.css';

// Loading component for lazy sections
const SectionLoader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      width: '100%',
    }}
  >
    <CircularProgress
      sx={{
        color: '#C9A227',
      }}
    />
  </Box>
);

// Main App Component
const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <CustomThemeProvider>
      <ModalProvider>
        <div className="app">
          {/* Skip to main content link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/* Header/Navigation */}
          <Header />

          {/* Main Content */}
          <main id="main-content">
            {/* Hero Section - Critical, loaded immediately */}
            <HeroSection />

            {/* Overview Section - Critical, loaded immediately */}
            <OverviewSection />

            {/* Lazy loaded sections */}
            <Suspense fallback={<SectionLoader />}>
              <ProjectHighlights />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <AmenitiesSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <PricingSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <FloorPlansSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <LocationSection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <CTASection />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <ContactSection />
            </Suspense>
          </main>

          {/* Footer */}
          <Footer />

          {/* Mobile Bottom Navigation */}
          {isMobile && <MobileNavigation />}

          {/* Global Modal */}
          <Modal />
        </div>
      </ModalProvider>
    </CustomThemeProvider>
  );
};

export default App;
