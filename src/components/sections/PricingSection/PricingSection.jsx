/* ============================================
   PricingSection Component - Placeholder
   ============================================ */
import React from 'react';
import { Container, Box } from '@mui/material';
import styles from './PricingSection.module.css';

const PricingSection = () => {
  return (
    <section id="pricing" className={styles.section}>
      <Container maxWidth="xl">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <h2>Pricing</h2>
          <p>Coming soon...</p>
        </Box>
      </Container>
    </section>
  );
};

export default PricingSection;
