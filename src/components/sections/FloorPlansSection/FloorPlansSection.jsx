/* ============================================
   FloorPlansSection Component - Placeholder
   ============================================ */
import React from 'react';
import { Container, Box } from '@mui/material';
import styles from './FloorPlansSection.module.css';

const FloorPlansSection = () => {
  return (
    <section id="floor-plans" className={styles.section}>
      <Container maxWidth="xl">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <h2>Floor Plans</h2>
          <p>Coming soon...</p>
        </Box>
      </Container>
    </section>
  );
};

export default FloorPlansSection;
