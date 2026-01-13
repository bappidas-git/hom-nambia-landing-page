/* ============================================
   Entry Point - Nambiar District 25 Phase 2
   Real Estate Landing Page
   ============================================ */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Theme
import theme from './theme/muiTheme';

// Global Styles
import './styles/variables.css';
import './styles/global.css';
import './styles/animations.css';
import './styles/responsive.css';

// App Component
import App from './App';

// Performance monitoring (optional)
import reportWebVitals from './reportWebVitals';

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render application with MUI Theme Provider
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Performance monitoring - pass a function to log results
// e.g., reportWebVitals(console.log) or send to analytics
reportWebVitals();
