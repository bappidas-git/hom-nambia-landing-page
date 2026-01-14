/* ============================================
   LeadFormDrawer Component
   Full-width side drawer from left with lead form
   ============================================ */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import Button from '../Button/Button';
import {
  validateIndianMobile,
  validateEmail,
  validateName,
  validateMessage,
  getMobileErrorMessage,
  getEmailErrorMessage,
  getNameErrorMessage,
  getMessageErrorMessage,
} from '../../../utils/validators';
import styles from './LeadFormDrawer.module.css';

// Local storage key for leads
const LEADS_STORAGE_KEY = 'nambiar_submitted_leads';

// Initial form state
const initialFormState = {
  name: '',
  mobile: '',
  email: '',
  message: '',
};

// Initial error state
const initialErrorState = {
  name: '',
  mobile: '',
  email: '',
  message: '',
};

const LeadFormDrawer = ({
  isOpen,
  onClose,
  title = 'Get Expert Assistance',
  subtitle = 'Fill the form and our experts will get in touch with you within 24 hours',
  source = 'general',
  onSubmitSuccess,
}) => {
  // Form state
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for input focus management
  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  // Reset form when drawer opens
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormState);
      setErrors(initialErrorState);
      setTouched({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Check if lead already exists in localStorage
  const checkDuplicateLead = useCallback((email, mobile) => {
    try {
      const storedLeads = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
      return storedLeads.some(
        (lead) => lead.email.toLowerCase() === email.toLowerCase() || lead.mobile === mobile
      );
    } catch {
      return false;
    }
  }, []);

  // Save lead to localStorage
  const saveLeadToStorage = useCallback((leadData) => {
    try {
      const storedLeads = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
      storedLeads.push({
        email: leadData.email,
        mobile: leadData.mobile,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(storedLeads));
    } catch (error) {
      console.error('Error saving lead to storage:', error);
    }
  }, []);

  // Handle input change
  const handleChange = useCallback((field) => (event) => {
    let value = event.target.value;

    // Special handling for mobile number - only allow digits
    if (field === 'mobile') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  }, [errors]);

  // Handle input blur - validate on blur
  const handleBlur = useCallback((field) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    // Validate the field
    let errorMessage = '';

    switch (field) {
      case 'name':
        errorMessage = getNameErrorMessage(formData.name);
        break;
      case 'mobile':
        errorMessage = getMobileErrorMessage(formData.mobile);
        break;
      case 'email':
        errorMessage = getEmailErrorMessage(formData.email);
        break;
      case 'message':
        errorMessage = getMessageErrorMessage(formData.message);
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: errorMessage,
    }));
  }, [formData]);

  // Validate entire form
  const validateForm = useCallback(() => {
    const newErrors = {
      name: getNameErrorMessage(formData.name),
      mobile: getMobileErrorMessage(formData.mobile),
      email: getEmailErrorMessage(formData.email),
      message: getMessageErrorMessage(formData.message),
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      mobile: true,
      email: true,
      message: true,
    });

    return Object.values(newErrors).every((error) => !error);
  }, [formData]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
      // Focus first field with error
      if (errors.name || !formData.name) {
        nameRef.current?.focus();
      } else if (errors.mobile || !formData.mobile) {
        mobileRef.current?.focus();
      } else if (errors.email || !formData.email) {
        emailRef.current?.focus();
      } else if (errors.message || !formData.message) {
        messageRef.current?.focus();
      }
      return;
    }

    // Check for duplicate lead
    if (checkDuplicateLead(formData.email, formData.mobile)) {
      Swal.fire({
        icon: 'info',
        title: 'Already Registered!',
        html: `
          <p>You have already submitted an enquiry with this email or mobile number.</p>
          <p style="margin-top: 12px; color: #666;">Our team will contact you soon. For immediate assistance, please call us.</p>
        `,
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Got it!',
        showCancelButton: true,
        cancelButtonText: 'Call Now',
        cancelButtonColor: '#0A1628',
      }).then((result) => {
        if (!result.isConfirmed && result.dismiss === 'cancel') {
          window.location.href = 'tel:+919876543210';
        }
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save lead to localStorage
      saveLeadToStorage(formData);

      // Set lead submitted flag for thank you page access
      sessionStorage.setItem('lead_submitted', 'true');
      sessionStorage.setItem('lead_name', formData.name);

      // Close drawer first
      onClose();

      // Show success message with SweetAlert2
      await Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        html: `
          <p>Your enquiry has been submitted successfully.</p>
          <p style="margin-top: 8px; font-size: 14px; color: #666;">Redirecting you to more information...</p>
        `,
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Continue',
        timer: 3000,
        timerProgressBar: true,
        allowOutsideClick: false,
      });

      // Callback for parent component - redirect to thank you page
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }

    } catch (error) {
      // Show error message with SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong. Please try again.',
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Try Again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const drawerVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeInOut' },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.05, duration: 0.3 },
    }),
  };

  const drawerContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.div
            className={styles.drawer}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            {/* Close Button */}
            <IconButton
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close drawer"
            >
              <Icon icon="mdi:close" />
            </IconButton>

            {/* Drawer Content */}
            <div className={styles.drawerContent}>
              {/* Header */}
              <div className={styles.header}>
                <div className={styles.headerIcon}>
                  <Icon icon="mdi:home-city" />
                </div>
                <Typography variant="h4" id="drawer-title" className={styles.title}>
                  {title}
                </Typography>
                <Typography className={styles.subtitle}>
                  {subtitle}
                </Typography>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                {/* Name Field */}
                <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
                  <TextField
                    inputRef={nameRef}
                    fullWidth
                    placeholder="Your Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    disabled={isSubmitting}
                    className={styles.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="mdi:account-outline" className={styles.inputIcon} />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      'aria-label': 'Your name',
                      maxLength: 50,
                    }}
                  />
                </motion.div>

                {/* Mobile Field */}
                <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
                  <TextField
                    inputRef={mobileRef}
                    fullWidth
                    placeholder="Mobile Number"
                    variant="outlined"
                    value={formData.mobile}
                    onChange={handleChange('mobile')}
                    onBlur={handleBlur('mobile')}
                    error={touched.mobile && !!errors.mobile}
                    helperText={touched.mobile && errors.mobile}
                    disabled={isSubmitting}
                    className={styles.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" className={styles.mobilePrefix}>
                          <Typography variant="body2" className={styles.countryCode}>
                            +91
                          </Typography>
                          <span className={styles.prefixDivider}>-</span>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      'aria-label': 'Mobile number',
                      maxLength: 10,
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                    }}
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
                  <TextField
                    inputRef={emailRef}
                    fullWidth
                    placeholder="Email Address"
                    type="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    disabled={isSubmitting}
                    className={styles.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="mdi:email-outline" className={styles.inputIcon} />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      'aria-label': 'Email address',
                    }}
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
                  <TextField
                    inputRef={messageRef}
                    fullWidth
                    placeholder="Your Message (Optional)"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={formData.message}
                    onChange={handleChange('message')}
                    onBlur={handleBlur('message')}
                    error={touched.message && !!errors.message}
                    helperText={touched.message && errors.message}
                    disabled={isSubmitting}
                    className={`${styles.textField} ${styles.messageField}`}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" className={styles.messageAdornment}>
                          <Icon icon="mdi:message-outline" className={styles.inputIcon} />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      'aria-label': 'Your message',
                      maxLength: 500,
                    }}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  custom={4}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  className={styles.submitWrapper}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting}
                    className={styles.submitButton}
                  >
                    {isSubmitting ? (
                      <Box className={styles.loadingState}>
                        <CircularProgress size={20} color="inherit" />
                        <span>Submitting...</span>
                      </Box>
                    ) : (
                      <>
                        <Icon icon="mdi:send" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Trust Indicators */}
              <div className={styles.trustSection}>
                <div className={styles.trustItem}>
                  <Icon icon="mdi:shield-check" />
                  <span>100% Secure</span>
                </div>
                <div className={styles.trustItem}>
                  <Icon icon="mdi:phone-in-talk" />
                  <span>Quick Response</span>
                </div>
                <div className={styles.trustItem}>
                  <Icon icon="mdi:lock" />
                  <span>Privacy Protected</span>
                </div>
              </div>

              {/* Contact Alternative */}
              <div className={styles.contactAlternative}>
                <Typography className={styles.orText}>Or call us directly</Typography>
                <a href="tel:+919876543210" className={styles.phoneLink}>
                  <Icon icon="mdi:phone" />
                  <span>+91 98765 43210</span>
                </a>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className={styles.decorativeCircle1} />
            <div className={styles.decorativeCircle2} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
};

export default LeadFormDrawer;
