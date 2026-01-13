/* ============================================
   ContactSection Component - Placeholder
   ============================================ */
import React from 'react';
import { Container, Box } from '@mui/material';
import styles from './ContactSection.module.css';

const ContactSection = () => {
  return (
    <section id="contact" className={styles.section}>
      <Container maxWidth="xl">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <h2>Contact Us</h2>
          <p>Coming soon...</p>
        </Box>
      </Container>
    </section>
  );
};

export default ContactSection;
