/* ============================================
   CTASection Component - Nambiar District 25 Phase 2
   "Ready to Experience the SOHO Life?" call-to-action section
   ============================================ */

import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Player } from '@lottiefiles/react-lottie-player';
import Button from '../../common/Button/Button';
import { useModal } from '../../../context/ModalContext';
import familyHomeAnimation from '../../../assets/lottie/family-home.json';
import styles from './CTASection.module.css';

const CTASection = () => {
  const { openSiteVisit } = useModal();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const handleScheduleVisit = () => {
    openSiteVisit({ source: 'cta-section' });
  };

  return (
    <section id="cta" className={styles.section}>
      {/* Background Pattern */}
      <div className={styles.bgPattern} />

      {/* Animated Background Elements */}
      <motion.div
        className={styles.floatingElement1}
        variants={floatVariants}
        initial="initial"
        animate="animate"
      >
        <Icon icon="mdi:home-variant" />
      </motion.div>

      <motion.div
        className={styles.floatingElement2}
        variants={floatVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: '1s' }}
      >
        <Icon icon="mdi:star-four-points" />
      </motion.div>

      <motion.div
        className={styles.floatingElement3}
        variants={floatVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: '2s' }}
      >
        <Icon icon="mdi:key-variant" />
      </motion.div>

      <Container maxWidth="lg">
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Lottie Animation */}
          <motion.div variants={itemVariants} className={styles.animationWrapper}>
            <Player
              autoplay
              loop
              src={familyHomeAnimation}
              className={styles.lottiePlayer}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div variants={itemVariants} className={styles.textContent}>
            <Typography variant="overline" className={styles.preTitle}>
              Don't Miss This Opportunity
            </Typography>

            <Typography variant="h2" className={styles.title}>
              Ready to Experience the{' '}
              <span className={styles.highlight}>SOHO Life?</span>
            </Typography>

            <Typography variant="body1" className={styles.description}>
              Take the first step towards owning your dream home. Schedule a site visit
              today and discover the perfect blend of luxury, comfort, and convenience
              at Nambiar District 25 Phase 2.
            </Typography>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className={styles.ctaButtons}>
              <Button
                variant="secondary"
                size="large"
                endIcon="mdi:arrow-right"
                onClick={handleScheduleVisit}
                className={styles.primaryBtn}
              >
                Schedule a Site Visit
              </Button>

              <Button
                variant="dark"
                size="large"
                startIcon="mdi:phone-outline"
                href="tel:+919876543210"
                className={styles.secondaryBtn}
              >
                Call Now
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className={styles.trustIndicators}>
              <div className={styles.trustItem}>
                <Icon icon="mdi:shield-check" className={styles.trustIcon} />
                <span>RERA Registered</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <Icon icon="mdi:bank" className={styles.trustIcon} />
                <span>Bank Loan Approved</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <Icon icon="mdi:account-group" className={styles.trustIcon} />
                <span>750+ Happy Families</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Decorative Elements */}
      <div className={styles.cornerDecoration1} />
      <div className={styles.cornerDecoration2} />
    </section>
  );
};

export default CTASection;
