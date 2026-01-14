/* ============================================
   UnifiedLeadForm Component
   Single reusable lead capture form with:
   - Duplicate prevention
   - Trust badges
   - Consent text
   - Redirect to Thank You page
   - Customizable title, subtitle, and phone CTA
   ============================================ */

import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import Button from '../Button/Button';
import {
  getMobileErrorMessage,
  getEmailErrorMessage,
  getNameErrorMessage,
  getMessageErrorMessage,
} from '../../../utils/validators';
import styles from './UnifiedLeadForm.module.css';

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

const UnifiedLeadForm = ({
  variant = 'default', // 'default', 'dark', 'hero', 'drawer'
  title = 'Book A Site Visit',
  subtitle = 'Fill in your details and our experts will get in touch with you',
  submitButtonText = 'Submit Enquiry',
  showTitle = true,
  showSubtitle = true,
  showMessage = true,
  showTrustBadges = true,
  showConsent = true,
  showPhoneButton = false,
  onClose, // Called when drawer should close (for drawer variant)
  onSubmitSuccess,
  className = '',
  formId = 'unified-lead-form',
}) => {
  const navigate = useNavigate();

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
        if (showMessage && formData.message) {
          errorMessage = getMessageErrorMessage(formData.message);
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: errorMessage,
    }));
  }, [formData, showMessage]);

  // Validate entire form
  const validateForm = useCallback(() => {
    const newErrors = {
      name: getNameErrorMessage(formData.name),
      mobile: getMobileErrorMessage(formData.mobile),
      email: getEmailErrorMessage(formData.email),
      message: showMessage && formData.message ? getMessageErrorMessage(formData.message) : '',
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      mobile: true,
      email: true,
      message: true,
    });

    return Object.values(newErrors).every((error) => !error);
  }, [formData, showMessage]);

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
      } else if (showMessage && (errors.message || !formData.message)) {
        messageRef.current?.focus();
      }
      return;
    }

    // Check for duplicate lead
    if (checkDuplicateLead(formData.email, formData.mobile)) {
      // Close drawer first if it exists
      if (onClose) {
        onClose();
      }

      await Swal.fire({
        icon: 'info',
        title: 'Already Registered!',
        html: `
          <p style="margin-bottom: 12px;">You have already submitted an enquiry with this email or mobile number.</p>
          <p style="color: #666; font-size: 14px;">Our team will contact you soon. For immediate assistance, please call us.</p>
        `,
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Got it!',
        showCancelButton: true,
        cancelButtonText: 'Call Now',
        cancelButtonColor: '#0A1628',
        customClass: {
          popup: styles.swalPopup,
        },
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

      // Reset form
      setFormData(initialFormState);
      setTouched({});
      setErrors(initialErrorState);

      // Close drawer first if it exists
      if (onClose) {
        onClose();
      }

      // Show success message with SweetAlert2
      await Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        html: `
          <p style="margin-bottom: 8px;">Your enquiry has been submitted successfully.</p>
          <p style="font-size: 14px; color: #666;">Redirecting you to more information...</p>
        `,
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Continue',
        timer: 3000,
        timerProgressBar: true,
        allowOutsideClick: false,
        customClass: {
          popup: styles.swalPopup,
        },
      });

      // Callback for parent component
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }

      // Navigate to thank you page
      navigate('/thank-you');

    } catch (error) {
      // Close drawer first if it exists
      if (onClose) {
        onClose();
      }

      // Show error message with SweetAlert2
      await Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong. Please try again.',
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Try Again',
        customClass: {
          popup: styles.swalPopup,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * i, duration: 0.3 },
    }),
  };

  // Determine styles based on variant
  const getVariantClass = () => {
    switch (variant) {
      case 'dark':
        return styles.variantDark;
      case 'hero':
        return styles.variantHero;
      case 'drawer':
        return styles.variantDrawer;
      default:
        return styles.variantDefault;
    }
  };

  return (
    <div className={`${styles.formContainer} ${getVariantClass()} ${className}`}>
      {/* Form Header */}
      {(showTitle || showSubtitle) && (
        <div className={styles.formHeader}>
          {showTitle && (
            <Typography variant="h5" className={styles.formTitle}>
              {title}
            </Typography>
          )}
          {showSubtitle && subtitle && (
            <Typography variant="body2" className={styles.formSubtitle}>
              {subtitle}
            </Typography>
          )}
        </div>
      )}

      {/* Form */}
      <form
        id={formId}
        onSubmit={handleSubmit}
        className={styles.form}
        noValidate
        autoComplete="off"
      >
        {/* Name Field */}
        <motion.div
          custom={0}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
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
        <motion.div
          custom={1}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
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
        <motion.div
          custom={2}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
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
        {showMessage && (
          <motion.div
            custom={3}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <TextField
              inputRef={messageRef}
              fullWidth
              placeholder="Message (Optional)"
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
        )}

        {/* Submit Button */}
        <motion.div
          custom={showMessage ? 4 : 3}
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
                <Icon icon="mdi:send" className={styles.submitIcon} />
                <span>{submitButtonText}</span>
              </>
            )}
          </Button>
        </motion.div>

        {/* Trust Badges */}
        {showTrustBadges && (
          <motion.div
            custom={showMessage ? 5 : 4}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            className={styles.trustBadges}
          >
            <div className={styles.trustBadge}>
              <Icon icon="mdi:shield-check" className={styles.trustIcon} />
              <span>100% Secure</span>
            </div>
            <div className={styles.trustBadge}>
              <Icon icon="mdi:phone-in-talk" className={styles.trustIcon} />
              <span>Quick Response</span>
            </div>
            <div className={styles.trustBadge}>
              <Icon icon="mdi:lock" className={styles.trustIcon} />
              <span>Privacy Protected</span>
            </div>
          </motion.div>
        )}

        {/* Consent Text */}
        {showConsent && (
          <motion.div
            custom={showMessage ? 6 : 5}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography variant="caption" className={styles.consentText}>
              By submitting, you agree to our{' '}
              <a href="#privacy" className={styles.privacyLink}>Privacy Policy</a>
              {' '}and consent to receive communications about Nambiar District 25.
            </Typography>
          </motion.div>
        )}
      </form>

      {/* Phone Button */}
      {showPhoneButton && (
        <div className={styles.phoneSection}>
          <Typography className={styles.orText}>Or call us directly</Typography>
          <a href="tel:+919876543210" className={styles.phoneLink}>
            <Icon icon="mdi:phone" />
            <span>+91 98765 43210</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default UnifiedLeadForm;
