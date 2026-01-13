/* ============================================
   FloorPlansSection Component - Nambiar District 25 Phase 2
   Floor plan showcase with filtering and details
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
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import {
  floorPlanFilters,
  floorPlanHighlights,
  getFloorPlansByType,
} from '../../../data/floorPlansData';
import { useModal } from '../../../context/ModalContext';
import styles from './FloorPlansSection.module.css';

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
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const FloorPlansSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openLeadForm } = useModal();

  // State
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get filtered floor plans
  const filteredPlans = getFloorPlansByType(selectedFilter);

  // Handle filter change
  const handleFilterChange = (event, newValue) => {
    setSelectedFilter(newValue);
  };

  // Handle view floor plan
  const handleViewPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  // Handle request callback
  const handleRequestCallback = (plan) => {
    openLeadForm({
      title: 'Request Floor Plan Details',
      subtitle: `For ${plan.type} - ${plan.sqft} sq.ft`,
      source: 'floor_plans_section',
    });
  };

  return (
    <section className={styles.floorPlansSection} id="floor-plans" ref={ref}>
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
              label="FLOOR PLANS"
              className={styles.floorPlansBadge}
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
                color: '#0A1628',
                marginTop: '1rem',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              Thoughtfully Designed
              <br />
              <span className={styles.goldText}>Living Spaces</span>
            </Typography>

            <div className={styles.titleUnderline}>
              <span className={styles.underlineBar} />
            </div>

            <Typography className={styles.sectionSubtitle}>
              Choose from 7 unique configurations ranging from 2 BHK to 4.5 BHK
            </Typography>
          </motion.div>

          {/* Highlights Strip */}
          <motion.div variants={itemVariants} className={styles.highlightsStrip}>
            {floorPlanHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.id}
                className={styles.highlightItem}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                <div
                  className={styles.highlightIcon}
                  style={{ backgroundColor: `${highlight.color}15`, color: highlight.color }}
                >
                  <Icon icon={highlight.icon} />
                </div>
                <span>{highlight.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={itemVariants} className={styles.filterWrapper}>
            <Tabs
              value={selectedFilter}
              onChange={handleFilterChange}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              centered={!isMobile}
              className={styles.filterTabs}
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#C9A227',
                  height: '3px',
                  borderRadius: '3px',
                }
              }}
              sx={{
                '& .MuiTab-root': {
                  color: '#6B7280',
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
                    color: '#0A1628',
                  },
                },
              }}
            >
              {floorPlanFilters.map((filter) => (
                <Tab
                  key={filter.id}
                  value={filter.value}
                  label={filter.label}
                />
              ))}
            </Tabs>
          </motion.div>

          {/* Floor Plans Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFilter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className={styles.plansGrid}
            >
              <Grid container spacing={isMobile ? 2 : 3}>
                {filteredPlans.map((plan, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={plan.id}>
                    <motion.div
                      className={styles.planCard}
                      custom={index}
                      variants={cardVariants}
                      whileHover={{
                        y: -8,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {/* Popular Badge */}
                      {plan.isPopular && (
                        <div className={styles.popularBadge}>
                          <Icon icon="mdi:star" />
                          <span>Popular</span>
                        </div>
                      )}

                      {/* Limited Badge */}
                      {plan.isLimited && (
                        <div className={styles.limitedBadge}>
                          <Icon icon="mdi:clock-outline" />
                          <span>Limited Units</span>
                        </div>
                      )}

                      {/* Floor Plan Image */}
                      <div
                        className={styles.planImageWrapper}
                        onClick={() => handleViewPlan(plan)}
                      >
                        <img
                          src={plan.image}
                          alt={`${plan.name} Floor Plan`}
                          className={styles.planImage}
                          loading="lazy"
                        />
                        <div className={styles.planImageOverlay}>
                          <div className={styles.viewPlanBtn}>
                            <Icon icon="mdi:magnify-plus-outline" />
                            <span>View Plan</span>
                          </div>
                        </div>
                      </div>

                      {/* Plan Info */}
                      <div className={styles.planInfo}>
                        {/* Plan Header */}
                        <div className={styles.planHeader}>
                          <Typography className={styles.planType}>
                            {plan.type}
                          </Typography>
                          <Typography className={styles.planName}>
                            {plan.name}
                          </Typography>
                        </div>

                        {/* Plan Specs */}
                        <div className={styles.planSpecs}>
                          <div className={styles.planSpec}>
                            <Icon icon="mdi:bed-outline" />
                            <span>{plan.bedrooms} Beds</span>
                          </div>
                          <div className={styles.planSpec}>
                            <Icon icon="mdi:shower" />
                            <span>{plan.bathrooms} Baths</span>
                          </div>
                          <div className={styles.planSpec}>
                            <Icon icon="mdi:arrow-expand" />
                            <span>{plan.sqft} sq.ft</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className={styles.planPriceRow}>
                          <div className={styles.planPrice}>
                            <span className={styles.priceLabel}>Starting</span>
                            <span className={styles.priceValue}>₹{plan.price}*</span>
                          </div>
                          <motion.button
                            className={styles.enquireBtn}
                            onClick={() => handleRequestCallback(plan)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Icon icon="mdi:phone-outline" />
                            Enquire
                          </motion.button>
                        </div>

                        {/* Features Preview */}
                        <div className={styles.planFeatures}>
                          {plan.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className={styles.planFeature}>
                              <Icon icon="mdi:check-circle" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaContent}>
                <div className={styles.ctaIcon}>
                  <Icon icon="mdi:floor-plan" />
                </div>
                <div className={styles.ctaText}>
                  <Typography className={styles.ctaTitle}>
                    Need Help Choosing?
                  </Typography>
                  <Typography className={styles.ctaSubtitle}>
                    Our experts will help you find the perfect floor plan for your needs
                  </Typography>
                </div>
              </div>
              <motion.button
                className={styles.ctaBtn}
                onClick={() => openLeadForm({
                  title: 'Get Expert Guidance',
                  subtitle: 'Find your perfect home',
                  source: 'floor_plans_cta',
                })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon icon="mdi:phone-in-talk" />
                <span>Request Callback</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Floor Plan Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        className={styles.planModal}
        PaperProps={{
          sx: {
            borderRadius: { xs: '16px', md: '24px' },
            maxHeight: '90vh',
            margin: { xs: '16px', md: '32px' },
          }
        }}
      >
        {selectedPlan && (
          <DialogContent className={styles.modalContent}>
            {/* Close Button */}
            <IconButton
              className={styles.modalClose}
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <Icon icon="mdi:close" />
            </IconButton>

            <Grid container spacing={3}>
              {/* Floor Plan Image */}
              <Grid item xs={12} md={7}>
                <div className={styles.modalImageWrapper}>
                  <img
                    src={selectedPlan.image}
                    alt={`${selectedPlan.name} Floor Plan`}
                    className={styles.modalImage}
                  />
                </div>
              </Grid>

              {/* Floor Plan Details */}
              <Grid item xs={12} md={5}>
                <div className={styles.modalDetails}>
                  <Typography className={styles.modalType}>
                    {selectedPlan.type}
                  </Typography>
                  <Typography className={styles.modalName}>
                    {selectedPlan.name}
                  </Typography>
                  <Typography className={styles.modalDesc}>
                    {selectedPlan.description}
                  </Typography>

                  {/* Specs Grid */}
                  <div className={styles.modalSpecs}>
                    <div className={styles.modalSpecItem}>
                      <Icon icon="mdi:bed-outline" />
                      <span className={styles.specValue}>{selectedPlan.bedrooms}</span>
                      <span className={styles.specLabel}>Bedrooms</span>
                    </div>
                    <div className={styles.modalSpecItem}>
                      <Icon icon="mdi:shower" />
                      <span className={styles.specValue}>{selectedPlan.bathrooms}</span>
                      <span className={styles.specLabel}>Bathrooms</span>
                    </div>
                    <div className={styles.modalSpecItem}>
                      <Icon icon="mdi:balcony" />
                      <span className={styles.specValue}>{selectedPlan.balconies}</span>
                      <span className={styles.specLabel}>Balconies</span>
                    </div>
                    <div className={styles.modalSpecItem}>
                      <Icon icon="mdi:arrow-expand" />
                      <span className={styles.specValue}>{selectedPlan.sqft}</span>
                      <span className={styles.specLabel}>Sq.ft</span>
                    </div>
                  </div>

                  {/* Area Details */}
                  <div className={styles.modalAreaDetails}>
                    <div className={styles.areaRow}>
                      <span>Carpet Area</span>
                      <span>{selectedPlan.carpetArea}</span>
                    </div>
                    <div className={styles.areaRow}>
                      <span>Built-up Area</span>
                      <span>{selectedPlan.builtUpArea}</span>
                    </div>
                    <div className={styles.areaRow}>
                      <span>Super Built-up</span>
                      <span>{selectedPlan.superBuiltUpArea}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className={styles.modalPrice}>
                    <span className={styles.modalPriceLabel}>Starting from</span>
                    <span className={styles.modalPriceValue}>₹{selectedPlan.price}*</span>
                  </div>

                  {/* Features */}
                  <div className={styles.modalFeatures}>
                    <Typography className={styles.featuresTitle}>Key Features</Typography>
                    <div className={styles.featuresList}>
                      {selectedPlan.features.map((feature, idx) => (
                        <div key={idx} className={styles.modalFeatureItem}>
                          <Icon icon="mdi:check-circle" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className={styles.modalActions}>
                    <motion.button
                      className={styles.modalPrimaryBtn}
                      onClick={() => handleRequestCallback(selectedPlan)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon icon="mdi:phone-in-talk" />
                      <span>Request Callback</span>
                    </motion.button>
                    <motion.button
                      className={styles.modalSecondaryBtn}
                      onClick={() => openLeadForm({
                        title: 'Download Brochure',
                        subtitle: `${selectedPlan.type} - ${selectedPlan.sqft} sq.ft`,
                        source: 'floor_plan_modal',
                      })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon icon="mdi:download" />
                      <span>Download Brochure</span>
                    </motion.button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default FloorPlansSection;
