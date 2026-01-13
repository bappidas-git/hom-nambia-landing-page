/* ============================================
   ConfigurationSelector Component - Nambiar District 25 Phase 2
   Compact dropdown selector with enhanced CTA
   ============================================ */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Box,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { configurationsData } from '../../../data/configurationsData';
import styles from './PricingSection.module.css';

const ConfigurationSelector = ({ selectedConfig, onConfigChange, onViewDetails }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentConfig = configurationsData.find(c => c.id === selectedConfig) || configurationsData[0];

  const handleChange = (event) => {
    onConfigChange(event.target.value);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.25,
      },
    }),
  };

  return (
    <motion.div
      className={styles.configCard}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Badge */}
      <Chip
        icon={<Icon icon="mdi:home-outline" />}
        label="Select Configuration"
        className={styles.configBadge}
        sx={{
          backgroundColor: '#C9A227',
          color: '#FFFFFF',
          fontWeight: 600,
          fontSize: '0.75rem',
          height: '32px',
          borderRadius: '16px',
          '& .MuiChip-icon': {
            color: '#FFFFFF',
            fontSize: '16px',
          },
        }}
      />

      {/* Dropdown Label */}
      <Typography className={styles.dropdownLabel}>
        Choose Your Apartment Type
      </Typography>

      {/* Configuration Dropdown */}
      <FormControl fullWidth className={styles.configDropdown}>
        <Select
          value={selectedConfig}
          onChange={handleChange}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          displayEmpty
          IconComponent={() => (
            <Icon
              icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              className={styles.dropdownIcon}
            />
          )}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#0A1628',
                border: '1px solid rgba(201, 162, 39, 0.3)',
                borderRadius: '10px',
                marginTop: '4px',
                maxHeight: '280px',
                '& .MuiMenuItem-root': {
                  padding: '10px 14px',
                  fontSize: '0.875rem',
                  color: '#FFFFFF',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(201, 162, 39, 0.15)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(201, 162, 39, 0.25)',
                    '&:hover': {
                      backgroundColor: 'rgba(201, 162, 39, 0.35)',
                    },
                  },
                },
              },
            },
          }}
          sx={{
            backgroundColor: 'linear-gradient(135deg, #E8D5A3 0%, #D4C085 100%)',
            background: 'linear-gradient(135deg, #E8D5A3 0%, #D4C085 100%)',
            borderRadius: '10px',
            '& .MuiOutlinedInput-notchedOutline': {
              border: '2px solid #C9A227',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: '2px solid #E5C96E',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '2px solid #C9A227',
            },
            '& .MuiSelect-select': {
              padding: '12px 14px',
              color: '#0A1628',
              fontWeight: 600,
              fontSize: '0.875rem',
            },
          }}
        >
          {configurationsData.map((config) => (
            <MenuItem key={config.id} value={config.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, width: '100%' }}>
                <span style={{ fontWeight: 600 }}>{config.type}</span>
                <span style={{ color: '#C9A227', fontSize: '0.75rem' }}>•</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8125rem' }}>{config.sqft} sq.ft</span>
                <span style={{ marginLeft: 'auto', color: '#C9A227', fontWeight: 600, fontSize: '0.8125rem' }}>
                  ₹{config.priceDisplay} {config.priceUnit}*
                </span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Configuration Details Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedConfig}
          className={styles.configDetails}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {/* Config Type Header */}
          <div className={styles.configHeader}>
            <Typography className={styles.configType}>
              {currentConfig.type}
            </Typography>
            <div className={styles.configSpecs}>
              <span className={styles.configSpec}>
                <Icon icon="mdi:bed-outline" />
                {currentConfig.bedrooms} Beds
              </span>
              <span className={styles.configSpec}>
                <Icon icon="mdi:shower" />
                {currentConfig.bathrooms} Baths
              </span>
              <span className={styles.configSpec}>
                <Icon icon="mdi:arrow-expand" />
                {currentConfig.sqft} sq.ft
              </span>
            </div>
          </div>

          {/* Price Display - Inline */}
          <div className={styles.configPriceBox}>
            <Typography className={styles.configPriceLabel}>
              Starting from
            </Typography>
            <Typography className={styles.configPrice}>
              ₹{currentConfig.priceDisplay} {currentConfig.priceUnit}*
            </Typography>
          </div>

          {/* Features List - 2 Column Grid */}
          <div className={styles.configFeatures}>
            {currentConfig.features.slice(0, 4).map((feature, index) => (
              <motion.div
                key={feature}
                className={styles.configFeature}
                custom={index}
                variants={featureVariants}
                initial="hidden"
                animate="visible"
              >
                <Icon icon="mdi:check-circle" className={styles.featureIcon} />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* View Details Button - Enhanced with Pulse */}
          <motion.button
            className={`${styles.viewDetailsBtn} ${styles.viewDetailsBtnPulse}`}
            onClick={onViewDetails}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon icon="mdi:floor-plan" />
            <span>View Detailed Pricing</span>
            <Icon icon="mdi:arrow-right" />
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ConfigurationSelector;
