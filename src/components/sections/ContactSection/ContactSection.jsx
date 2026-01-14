/* ============================================
   ContactSection Component - Nambiar District 25 Phase 2
   "A Rare Opportunity to Own Your Dream Home" contact section
   ============================================ */

import React, { useState, useCallback, useRef } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Player } from '@lottiefiles/react-lottie-player';
import Swal from 'sweetalert2';
import Button from '../../common/Button/Button';
import {
  validateIndianMobile,
  validateEmail,
  validateName,
  getMobileErrorMessage,
  getEmailErrorMessage,
  getNameErrorMessage,
} from '../../../utils/validators';
import buildingAnimation from '../../../assets/lottie/building-animation.json';
import styles from './ContactSection.module.css';

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

const ContactSection = () => {
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
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

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
        if (formData.email) {
          errorMessage = getEmailErrorMessage(formData.email);
        }
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
      email: formData.email ? getEmailErrorMessage(formData.email) : '',
      message: '',
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      mobile: true,
      email: true,
      message: true,
    });

    return !newErrors.name && !newErrors.mobile && !newErrors.email;
  }, [formData]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
      // Focus first field with error
      if (!formData.name || errors.name) {
        nameRef.current?.focus();
      } else if (!formData.mobile || errors.mobile) {
        mobileRef.current?.focus();
      } else if (errors.email) {
        emailRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success handling
      setFormData(initialFormState);
      setTouched({});

      // Show success message with SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        text: 'Our team will contact you within 24 hours.',
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Great!',
        timer: 4000,
        timerProgressBar: true,
      });
    } catch (error) {
      // Show error message with SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong. Please try again or call us directly.',
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Try Again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact info items
  const contactInfo = [
    {
      icon: 'mdi:map-marker-outline',
      title: 'Visit Us',
      content: 'Thanisandra Main Road, Near Manyata Tech Park, Bangalore - 560064',
    },
    {
      icon: 'mdi:phone-outline',
      title: 'Call Us',
      content: '+91 98765 43210',
      href: 'tel:+919876543210',
    },
    {
      icon: 'mdi:email-outline',
      title: 'Email Us',
      content: 'sales@nambiardistrict25.com',
      href: 'mailto:sales@nambiardistrict25.com',
    },
    {
      icon: 'mdi:clock-outline',
      title: 'Office Hours',
      content: 'Mon - Sun: 9:30 AM - 7:30 PM',
    },
  ];

  return (
    <section id="contact" className={styles.section}>
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Grid container spacing={6} alignItems="center">
            {/* Left Side - Content */}
            <Grid item xs={12} lg={6}>
              <motion.div variants={itemVariants} className={styles.contentWrapper}>
                {/* Badge */}
                <span className={styles.badge}>CONTACT US</span>

                {/* Title */}
                <Typography variant="h2" className={styles.title}>
                  A Rare Opportunity to Own{' '}
                  <span className={styles.highlight}>Your Dream Home</span>
                </Typography>

                {/* Description */}
                <Typography variant="body1" className={styles.description}>
                  Experience luxury living at its finest. Get in touch with our team to learn more
                  about Nambiar District 25 Phase 2 and schedule your exclusive site visit today.
                </Typography>

                {/* Lottie Animation (Mobile Only) */}
                <motion.div variants={itemVariants} className={styles.mobileAnimation}>
                  <Player
                    autoplay
                    loop
                    src={buildingAnimation}
                    className={styles.lottiePlayer}
                  />
                </motion.div>

                {/* Contact Info */}
                <div className={styles.contactInfo}>
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={styles.contactItem}
                    >
                      <div className={styles.contactIcon}>
                        <Icon icon={item.icon} />
                      </div>
                      <div className={styles.contactText}>
                        <Typography variant="subtitle2" className={styles.contactTitle}>
                          {item.title}
                        </Typography>
                        {item.href ? (
                          <a href={item.href} className={styles.contactLink}>
                            {item.content}
                          </a>
                        ) : (
                          <Typography variant="body2" className={styles.contactContent}>
                            {item.content}
                          </Typography>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            </Grid>

            {/* Right Side - Form */}
            <Grid item xs={12} lg={6}>
              <motion.div variants={formVariants} className={styles.formWrapper}>
                {/* Form Header */}
                <div className={styles.formHeader}>
                  <Typography variant="h5" className={styles.formTitle}>
                    Book A Site Visit
                  </Typography>
                  <Typography variant="body2" className={styles.formSubtitle}>
                    Fill in your details and we'll get back to you
                  </Typography>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  {/* Name Field */}
                  <TextField
                    inputRef={nameRef}
                    fullWidth
                    placeholder="Name"
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

                  {/* Mobile Field */}
                  <TextField
                    inputRef={mobileRef}
                    fullWidth
                    placeholder="Mobile"
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
                          <span className={styles.countryCode}>+91</span>
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

                  {/* Email Field */}
                  <TextField
                    inputRef={emailRef}
                    fullWidth
                    placeholder="Email"
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

                  {/* Message Field */}
                  <TextField
                    inputRef={messageRef}
                    fullWidth
                    placeholder="Message (Optional)"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={formData.message}
                    onChange={handleChange('message')}
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

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
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
                      'Submit'
                    )}
                  </Button>

                  {/* Privacy Note */}
                  <Typography variant="caption" className={styles.privacyNote}>
                    By submitting, you agree to our{' '}
                    <a href="#privacy" className={styles.privacyLink}>Privacy Policy</a>
                    {' '}and consent to receive communications about Nambiar District 25.
                  </Typography>
                </form>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Background Decorations */}
      <div className={styles.bgDecoration1} />
      <div className={styles.bgDecoration2} />
      <div className={styles.bgPattern} />
    </section>
  );
};

export default ContactSection;
