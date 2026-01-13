/* ============================================
   App Component - Nambiar District 25 Phase 2
   Main application component with providers,
   lazy loading, and performance optimizations
   ============================================ */

import React, { Suspense, lazy, useEffect, useState, memo } from 'react';
import { CircularProgress, useMediaQuery, useTheme, Skeleton, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// App Styles
import './App.css';

// Context Providers
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';

// Components (Eager loaded for critical path - Above the fold)
import Header from './components/common/Header/Header';
import HeroSection from './components/sections/HeroSection/HeroSection';
import Footer from './components/common/Footer/Footer';
import Modal from './components/common/Modal/Modal';
import MobileNavigation from './components/common/MobileNavigation/MobileNavigation';

// Lazy loaded sections for performance (Below the fold)
const OverviewSection = lazy(() =>
  import(/* webpackChunkName: "overview" */ './components/sections/OverviewSection/OverviewSection')
);
const ProjectHighlights = lazy(() =>
  import(/* webpackChunkName: "highlights" */ './components/sections/ProjectHighlights/ProjectHighlights')
);
const AmenitiesSection = lazy(() =>
  import(/* webpackChunkName: "amenities" */ './components/sections/AmenitiesSection/AmenitiesSection')
);
const PricingSection = lazy(() =>
  import(/* webpackChunkName: "pricing" */ './components/sections/PricingSection/PricingSection')
);
const FloorPlansSection = lazy(() =>
  import(/* webpackChunkName: "floorplans" */ './components/sections/FloorPlansSection/FloorPlansSection')
);
const LocationSection = lazy(() =>
  import(/* webpackChunkName: "location" */ './components/sections/LocationSection/LocationSection')
);
const CTASection = lazy(() =>
  import(/* webpackChunkName: "cta" */ './components/sections/CTASection/CTASection')
);
const ContactSection = lazy(() =>
  import(/* webpackChunkName: "contact" */ './components/sections/ContactSection/ContactSection')
);

// ===========================================
// Error Boundary Component
// ===========================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Section Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            backgroundColor: '#F8F9FA',
            borderRadius: '8px',
            margin: '20px',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div>
            <p style={{ color: '#666', marginBottom: '10px' }}>
              Something went wrong loading this section.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                backgroundColor: '#C9A227',
                color: '#0A1628',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Try Again
            </button>
          </div>
        </Box>
      );
    }

    return this.props.children;
  }
}

// ===========================================
// Section Loader Component
// ===========================================
const SectionLoader = memo(({ height = 300, variant = 'default' }) => {
  const variants = {
    default: (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: height,
          width: '100%',
          background: 'linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CircularProgress
            size={40}
            thickness={3}
            sx={{
              color: '#C9A227',
            }}
          />
        </motion.div>
      </Box>
    ),
    skeleton: (
      <Box sx={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Skeleton
          variant="text"
          width="30%"
          height={40}
          sx={{ margin: '0 auto 20px', bgcolor: 'rgba(201, 162, 39, 0.1)' }}
        />
        <Skeleton
          variant="text"
          width="60%"
          height={60}
          sx={{ margin: '0 auto 30px', bgcolor: 'rgba(201, 162, 39, 0.1)' }}
        />
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={250}
              height={180}
              sx={{ bgcolor: 'rgba(201, 162, 39, 0.05)' }}
            />
          ))}
        </Box>
      </Box>
    ),
    minimal: (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: height,
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#C9A227',
            animation: 'pulse 1s ease-in-out infinite',
          }}
        />
      </Box>
    ),
  };

  return variants[variant] || variants.default;
});

SectionLoader.displayName = 'SectionLoader';

// ===========================================
// Scroll Progress Indicator
// ===========================================
const ScrollProgressIndicator = memo(() => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '3px',
        background: 'linear-gradient(90deg, #C9A227 0%, #E5C96E 100%)',
        zIndex: 9999,
        transition: 'width 0.1s ease-out',
      }}
    />
  );
});

ScrollProgressIndicator.displayName = 'ScrollProgressIndicator';

// ===========================================
// Back to Top Button
// ===========================================
const BackToTopButton = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#C9A227',
            color: '#0A1628',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 20px rgba(201, 162, 39, 0.4)',
            zIndex: 1000,
          }}
          aria-label="Back to top"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
});

BackToTopButton.displayName = 'BackToTopButton';

// ===========================================
// Preload Manager - Preload sections on idle
// ===========================================
const useIdlePreload = () => {
  useEffect(() => {
    // Preload sections during idle time
    if ('requestIdleCallback' in window) {
      const sections = [
        () => import('./components/sections/OverviewSection/OverviewSection'),
        () => import('./components/sections/ProjectHighlights/ProjectHighlights'),
        () => import('./components/sections/AmenitiesSection/AmenitiesSection'),
        () => import('./components/sections/PricingSection/PricingSection'),
        () => import('./components/sections/FloorPlansSection/FloorPlansSection'),
        () => import('./components/sections/LocationSection/LocationSection'),
        () => import('./components/sections/CTASection/CTASection'),
        () => import('./components/sections/ContactSection/ContactSection'),
      ];

      let currentIndex = 0;

      const preloadNext = (deadline) => {
        while (deadline.timeRemaining() > 0 && currentIndex < sections.length) {
          sections[currentIndex]();
          currentIndex++;
        }
        if (currentIndex < sections.length) {
          window.requestIdleCallback(preloadNext, { timeout: 2000 });
        }
      };

      const idleId = window.requestIdleCallback(preloadNext, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }
  }, []);
};

// ===========================================
// Main App Component
// ===========================================
const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Enable idle preloading
  useIdlePreload();

  // Hide initial loader after mount
  useEffect(() => {
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) {
      initialLoader.classList.add('hidden');
      setTimeout(() => {
        initialLoader.style.display = 'none';
      }, 300);
    }
  }, []);

  // Smooth scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Register service worker for offline capability (if available)
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch(() => {
          // Service worker registration failed
        });
      });
    }
  }, []);

  return (
    <CustomThemeProvider>
      <ModalProvider>
        <div className="app" id="app-root">
          {/* Scroll Progress Indicator */}
          <ScrollProgressIndicator />

          {/* Skip to main content link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/* Header/Navigation */}
          <Header />

          {/* Main Content */}
          <main id="main-content" className="main-content">
            {/* Hero Section - Critical, loaded immediately */}
            <HeroSection />

            {/* Lazy loaded sections with error boundaries */}
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader height={500} variant="skeleton" />}>
                <OverviewSection />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoader height={400} variant="skeleton" />}>
                <ProjectHighlights />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoader height={600} variant="skeleton" />}>
                <AmenitiesSection />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoader height={500} variant="skeleton" />}>
                <PricingSection />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoader height={400} variant="skeleton" />}>
                <FloorPlansSection />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoader height={400} variant="skeleton" />}>
                <LocationSection />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoader height={300} variant="default" />}>
                <CTASection />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<SectionLoader height={500} variant="skeleton" />}>
                <ContactSection />
              </Suspense>
            </ErrorBoundary>
          </main>

          {/* Footer */}
          <Footer />

          {/* Mobile Bottom Navigation */}
          {isMobile && <MobileNavigation />}

          {/* Back to Top Button */}
          <BackToTopButton />

          {/* Global Modal */}
          <Modal />
        </div>
      </ModalProvider>
    </CustomThemeProvider>
  );
};

export default App;
