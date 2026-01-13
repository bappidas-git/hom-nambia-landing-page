/* ============================================
   AmenitiesSection Component - Nambiar District 25 Phase 2
   Amenities showcase with clubhouse feature and category cards
   ============================================ */

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  Chip,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import {
  amenitiesCategories,
  amenitiesStats,
  getFeaturedAmenities,
  getAmenitiesByCategory,
} from '../../../data/amenitiesData';
import styles from './AmenitiesSection.module.css';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const clubhouseVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const AmenitiesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  // Get filtered amenities based on category
  const getFilteredAmenities = () => {
    if (selectedCategory === 'all') {
      return getFeaturedAmenities();
    }
    return getAmenitiesByCategory(selectedCategory);
  };

  const filteredAmenities = getFilteredAmenities();

  return (
    <section className={styles.amenitiesSection} id="amenities" ref={ref}>
      {/* Background Elements */}
      <div className={styles.bgOverlay} />
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <Chip
              label={`${amenitiesStats.totalAmenities} AMENITIES`}
              className={styles.amenitiesBadge}
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
              Everything You Need,
              <br />
              <span className={styles.goldText}>Within Your Community</span>
            </Typography>

            <div className={styles.titleUnderline}>
              <span className={styles.underlineBar} />
            </div>
          </motion.div>

          {/* Clubhouse Feature Section */}
          <motion.div variants={clubhouseVariants} className={styles.clubhouseSection}>
            <div className={styles.clubhouseCard}>
              {/* Clubhouse Info */}
              <div className={styles.clubhouseInfo}>
                <div className={styles.clubhouseLabel}>
                  <Icon icon="mdi:home-city-outline" className={styles.clubhouseLabelIcon} />
                  <span>Clubhouse</span>
                </div>
                <Typography
                  variant="h3"
                  className={styles.clubhouseTitle}
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    color: '#0A1628',
                  }}
                >
                  {amenitiesStats.clubhouseSize}
                  <span className={styles.clubhouseHighlight}> Clubhouse</span>
                </Typography>
                <Typography className={styles.clubhouseSubtext}>
                  Spread over <strong>{amenitiesStats.clubhouseAcres}</strong> with world-class amenities
                </Typography>

                {/* Clubhouse Quick Stats */}
                <div className={styles.clubhouseStats}>
                  <div className={styles.clubhouseStat}>
                    <Icon icon="mdi:pool" className={styles.clubhouseStatIcon} />
                    <span>Swimming Pool</span>
                  </div>
                  <div className={styles.clubhouseStat}>
                    <Icon icon="mdi:dumbbell" className={styles.clubhouseStatIcon} />
                    <span>Gymnasium</span>
                  </div>
                  <div className={styles.clubhouseStat}>
                    <Icon icon="mdi:spa-outline" className={styles.clubhouseStatIcon} />
                    <span>Spa & Wellness</span>
                  </div>
                  <div className={styles.clubhouseStat}>
                    <Icon icon="mdi:tennis" className={styles.clubhouseStatIcon} />
                    <span>Sports Courts</span>
                  </div>
                </div>
              </div>

              {/* Clubhouse Image */}
              <div className={styles.clubhouseImageWrapper}>
                <img
                  src="https://placehold.co/800x500/0A1628/C9A227?text=Clubhouse+800x500"
                  alt="Nambiar District 25 Clubhouse"
                  className={styles.clubhouseImage}
                  loading="lazy"
                />
                <div className={styles.clubhouseImageOverlay}>
                  <span className={styles.clubhouseImageBadge}>
                    <Icon icon="mdi:play-circle" />
                    Virtual Tour
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div variants={itemVariants} className={styles.categoryWrapper}>
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              centered={!isMobile}
              className={styles.categoryTabs}
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#C9A227',
                  height: '3px',
                  borderRadius: '3px',
                }
              }}
              sx={{
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontWeight: 500,
                  fontSize: { xs: '0.8125rem', md: '0.9375rem' },
                  textTransform: 'none',
                  minWidth: 'auto',
                  padding: { xs: '12px 16px', md: '14px 24px' },
                  '&.Mui-selected': {
                    color: '#C9A227',
                    fontWeight: 600,
                  },
                  '&:hover': {
                    color: '#FFFFFF',
                  },
                },
              }}
            >
              <Tab value="all" label="Featured" icon={<Icon icon="mdi:star-outline" />} iconPosition="start" />
              {amenitiesCategories.map((category) => (
                <Tab
                  key={category.id}
                  value={category.id}
                  label={category.title}
                  icon={<Icon icon={category.icon} />}
                  iconPosition="start"
                />
              ))}
            </Tabs>
          </motion.div>

          {/* Amenities Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className={styles.amenitiesGrid}
            >
              <Grid container spacing={isMobile ? 1.5 : 2}>
                {filteredAmenities.map((amenity, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={2.4} key={amenity.id}>
                    <motion.div
                      className={styles.amenityCard}
                      custom={index}
                      variants={cardVariants}
                      whileHover={{
                        y: -6,
                        transition: { duration: 0.25 }
                      }}
                    >
                      <div
                        className={styles.amenityIconWrapper}
                        style={{ backgroundColor: `${amenity.iconColor}15` }}
                      >
                        <Icon
                          icon={amenity.icon}
                          className={styles.amenityIcon}
                          style={{ color: amenity.iconColor }}
                        />
                      </div>
                      <Typography className={styles.amenityName}>
                        {amenity.name}
                      </Typography>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>

          {/* Additional Amenities Counter */}
          <motion.div variants={itemVariants} className={styles.moreAmenities}>
            <div className={styles.moreAmenitiesContent}>
              <div className={styles.moreAmenitiesIcon}>
                <Icon icon="mdi:plus-circle-multiple-outline" />
              </div>
              <div className={styles.moreAmenitiesText}>
                <Typography className={styles.moreAmenitiesTitle}>
                  And {parseInt(amenitiesStats.totalAmenities) - filteredAmenities.length}+ More Amenities
                </Typography>
                <Typography className={styles.moreAmenitiesSubtext}>
                  Discover all the premium amenities designed for your comfort
                </Typography>
              </div>
            </div>
          </motion.div>

          {/* Amenity Categories Cards (Bottom Row) */}
          <motion.div variants={itemVariants} className={styles.categorySummary}>
            <Grid container spacing={isMobile ? 1.5 : 3}>
              {amenitiesCategories.map((category, index) => {
                const categoryAmenities = getAmenitiesByCategory(category.id);
                return (
                  <Grid item xs={6} sm={3} key={category.id}>
                    <motion.div
                      className={styles.categoryCard}
                      custom={index}
                      variants={cardVariants}
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.25 }
                      }}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className={styles.categoryCardIcon}>
                        <Icon icon={category.icon} />
                      </div>
                      <Typography className={styles.categoryCardTitle}>
                        {category.title}
                      </Typography>
                      <Typography className={styles.categoryCardCount}>
                        {categoryAmenities.length}+ Amenities
                      </Typography>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AmenitiesSection;
