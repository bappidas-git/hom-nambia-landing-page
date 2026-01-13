/* ============================================
   ProjectHighlights Component - Placeholder
   ============================================ */
import React from 'react';
import { Container, Box } from '@mui/material';
import styles from './ProjectHighlights.module.css';

const ProjectHighlights = () => {
  return (
    <section id="highlights" className={styles.section}>
      <Container maxWidth="xl">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <h2>Project Highlights</h2>
          <p>Coming soon...</p>
        </Box>
      </Container>
    </section>
  );
};

export default ProjectHighlights;
