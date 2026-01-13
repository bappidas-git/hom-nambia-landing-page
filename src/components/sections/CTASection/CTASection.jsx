/* ============================================
   CTASection Component - Placeholder
   ============================================ */
import React from 'react';
import { Container, Box } from '@mui/material';
import styles from './CTASection.module.css';

const CTASection = () => {
  return (
    <section id="cta" className={styles.section}>
      <Container maxWidth="xl">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <h2>Ready to Experience the SOHO Life?</h2>
          <p>Coming soon...</p>
        </Box>
      </Container>
    </section>
  );
};

export default CTASection;
