/* ============================================
   PricingSection Component - Nambiar District 25 Phase 2
   Pricing configuration selector with EMI calculator
   ============================================ */

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import ConfigurationSelector from './ConfigurationSelector';
import EMICalculator from './EMICalculator';
import { configurationsData, priceRange } from '../../../data/configurationsData';
import { useModal } from '../../../context/ModalContext';
import styles from './PricingSection.module.css';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const PricingSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openLeadForm } = useModal();

  // Selected configuration state
  const [selectedConfigId, setSelectedConfigId] = useState(1);

  // Get current selected configuration
  const selectedConfig = configurationsData.find(c => c.id === selectedConfigId) || configurationsData[0];

  // Handle configuration change
  const handleConfigChange = (configId) => {
    setSelectedConfigId(configId);
  };

  // Handle view details
  const handleViewDetails = () => {
    openLeadForm({
      title: 'Get Detailed Pricing',
      subtitle: `For ${selectedConfig.type} - ${selectedConfig.sqft} sq.ft`,
      source: 'pricing_section',
    });
  };

  return (
    <section className={styles.pricingSection} id="pricing" ref={ref}>
      {/* Background Elements */}
      <div className={styles.bgPattern} />
      <div className={styles.bgGradientLeft} />
      <div className={styles.bgGradientRight} />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <Chip
              label="PRICING & EMI"
              className={styles.pricingBadge}
              sx={{
                backgroundColor: 'rgba(201, 162, 39, 0.15)',
                color: '#C9A227',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                height: '32px',
                borderRadius: '20px',
                border: '1px solid rgba(201, 162, 39, 0.3)',
              }}
            />

            <Typography
              variant="h2"
              className={styles.sectionTitle}
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.75rem' },
                color: '#FFFFFF',
                marginTop: '1rem',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              Choose Your Perfect
              <br />
              <span className={styles.goldText}>Home</span>
            </Typography>

            <div className={styles.titleUnderline}>
              <span className={styles.underlineBar} />
            </div>

            <Typography className={styles.sectionSubtitle}>
              Starting from <span className={styles.priceHighlight}>₹{priceRange.startingFrom}*</span> onwards
            </Typography>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={isMobile ? 2 : 4} alignItems="stretch">
              {/* Configuration Selector */}
              <Grid item xs={12} md={6}>
                <ConfigurationSelector
                  selectedConfig={selectedConfigId}
                  onConfigChange={handleConfigChange}
                  onViewDetails={handleViewDetails}
                />
              </Grid>

              {/* EMI Calculator */}
              <Grid item xs={12} md={6}>
                <EMICalculator propertyPrice={selectedConfig.price} />
              </Grid>
            </Grid>
          </motion.div>

          {/* Bottom Info Cards */}
          <motion.div variants={itemVariants} className={styles.infoCards}>
            <Grid container spacing={isMobile ? 1.5 : 3}>
              <Grid item xs={6} sm={3}>
                <motion.div
                  className={styles.infoCard}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <div className={styles.infoIconWrapper} style={{ backgroundColor: 'rgba(76, 175, 80, 0.15)' }}>
                    <Icon icon="mdi:check-decagram" style={{ color: '#4CAF50' }} />
                  </div>
                  <Typography className={styles.infoTitle}>RERA Approved</Typography>
                  <Typography className={styles.infoSubtitle}>100% Legal</Typography>
                </motion.div>
              </Grid>

              <Grid item xs={6} sm={3}>
                <motion.div
                  className={styles.infoCard}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <div className={styles.infoIconWrapper} style={{ backgroundColor: 'rgba(33, 150, 243, 0.15)' }}>
                    <Icon icon="mdi:bank-outline" style={{ color: '#2196F3' }} />
                  </div>
                  <Typography className={styles.infoTitle}>Bank Approved</Typography>
                  <Typography className={styles.infoSubtitle}>Easy Loans</Typography>
                </motion.div>
              </Grid>

              <Grid item xs={6} sm={3}>
                <motion.div
                  className={styles.infoCard}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <div className={styles.infoIconWrapper} style={{ backgroundColor: 'rgba(156, 39, 176, 0.15)' }}>
                    <Icon icon="mdi:percent-outline" style={{ color: '#9C27B0' }} />
                  </div>
                  <Typography className={styles.infoTitle}>Flexible Payment</Typography>
                  <Typography className={styles.infoSubtitle}>Easy Plans</Typography>
                </motion.div>
              </Grid>

              <Grid item xs={6} sm={3}>
                <motion.div
                  className={styles.infoCard}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <div className={styles.infoIconWrapper} style={{ backgroundColor: 'rgba(255, 152, 0, 0.15)' }}>
                    <Icon icon="mdi:shield-check-outline" style={{ color: '#FF9800' }} />
                  </div>
                  <Typography className={styles.infoTitle}>Price Protection</Typography>
                  <Typography className={styles.infoSubtitle}>No Hidden Costs</Typography>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={itemVariants} className={styles.disclaimer}>
            <Icon icon="mdi:information-outline" />
            <Typography>
              *Prices mentioned are indicative and subject to change. GST and other statutory charges applicable.
              Please contact our sales team for the latest pricing and offers.
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default PricingSection;
