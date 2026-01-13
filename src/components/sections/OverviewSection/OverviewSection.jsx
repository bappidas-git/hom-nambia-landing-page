/* ============================================
   OverviewSection Component - Nambiar District 25 Phase 2
   Project overview with stats cards and animations
   ============================================ */

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Container, Typography, Grid, Chip, useMediaQuery, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import AnimatedCounter from '../../common/AnimatedCounter/AnimatedCounter';
import styles from './OverviewSection.module.css';

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

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// Stats cards data
const statsCards = [
  {
    icon: 'mdi:office-building-marker-outline',
    value: '100',
    label: 'Acres',
    sublabel: 'Integrated Township',
    color: '#C9A227',
    bgColor: '#FEF9E7',
  },
  {
    icon: 'mdi:tree',
    value: '4000+',
    label: 'Trees',
    sublabel: 'Green Living',
    color: '#4CAF50',
    bgColor: '#E8F5E9',
  },
  {
    icon: 'mdi:account-group',
    value: '700+',
    label: 'Families',
    sublabel: 'Happy Residents',
    color: '#9C27B0',
    bgColor: '#F3E5F5',
  },
  {
    icon: 'mdi:shield-check',
    value: '24/7',
    label: 'Security',
    sublabel: 'Safe & Secure',
    color: '#FF9800',
    bgColor: '#FFF3E0',
  },
];

const OverviewSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.overviewSection} id="overview" ref={ref}>
      {/* Background Pattern */}
      <div className={styles.patternBg} />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <Chip
              label="OUR PROJECT"
              className={styles.sectionBadge}
              sx={{
                backgroundColor: '#0A1628',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                height: '32px',
                borderRadius: '20px',
              }}
            />

            <Typography
              variant="h2"
              className={styles.sectionTitle}
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                color: '#0A1628',
                marginTop: '1rem',
                textAlign: 'center',
              }}
            >
              Where Quality Meets{' '}
              <span className={styles.goldText}>Affordability</span>
            </Typography>

            <div className={styles.titleUnderline}>
              <span className={styles.underlineBar} />
            </div>

            <Typography
              variant="body1"
              className={styles.sectionDescription}
              sx={{
                color: '#6B7280',
                fontSize: { xs: '0.9375rem', md: '1.0625rem' },
                maxWidth: '700px',
                margin: '0 auto',
                marginTop: '1.5rem',
                textAlign: 'center',
                lineHeight: 1.7,
              }}
            >
              After the success of Phase 1 with <strong style={{ color: '#0A1628' }}>700+ families</strong>,
              we launch <span className={styles.goldTextInline}>Phase 2</span> – modern architecture,
              luxury lifestyle in Bangalore's most promising location.
            </Typography>
          </motion.div>

          {/* Stats Cards Grid */}
          <motion.div variants={itemVariants} className={styles.statsWrapper}>
            <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
              {statsCards.map((card, index) => (
                <Grid item xs={6} sm={6} md={3} key={index}>
                  <motion.div
                    className={styles.statsCard}
                    custom={index}
                    variants={cardVariants}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div
                      className={styles.statsIconWrapper}
                      style={{ backgroundColor: card.bgColor }}
                    >
                      <Icon
                        icon={card.icon}
                        className={styles.statsIcon}
                        style={{ color: card.color }}
                      />
                    </div>
                    <div className={styles.statsContent}>
                      <AnimatedCounter
                        value={card.value}
                        className={styles.statsValue}
                        duration={2}
                        delay={0.3 + index * 0.1}
                      />
                      <span className={styles.statsLabel}>{card.label}</span>
                      <span className={styles.statsSublabel}>{card.sublabel}</span>
                    </div>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default OverviewSection;
