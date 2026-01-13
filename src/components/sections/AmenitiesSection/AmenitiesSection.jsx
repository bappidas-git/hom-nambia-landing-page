/* ============================================
   AmenitiesSection Component - Placeholder
   ============================================ */
import React from 'react';
import { Container, Box } from '@mui/material';
import styles from './AmenitiesSection.module.css';

const AmenitiesSection = () => {
  return (
    <section id="amenities" className={styles.section}>
      <Container maxWidth="xl">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <h2>Amenities</h2>
          <p>Coming soon...</p>
        </Box>
      </Container>
    </section>
  );
};

export default AmenitiesSection;
