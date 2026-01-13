/* ============================================
   LocationSection Component - Placeholder
   ============================================ */
import React from 'react';
import { Container, Box } from '@mui/material';
import styles from './LocationSection.module.css';

const LocationSection = () => {
  return (
    <section id="location" className={styles.section}>
      <Container maxWidth="xl">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <h2>Location</h2>
          <p>Coming soon...</p>
        </Box>
      </Container>
    </section>
  );
};

export default LocationSection;
