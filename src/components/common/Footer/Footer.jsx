/* ============================================
   Footer Component - Nambiar District 25 Phase 2
   Main footer with navigation, contact info, and social links
   ============================================ */

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Grid, Box, Divider } from '@mui/material';
import { Icon } from '@iconify/react';
import styles from './Footer.module.css';
import Button from '../Button/Button';
import { useModal } from '../../../context/ModalContext';

// Footer navigation data
const footerLinks = {
  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Overview', href: '#overview' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Floor Plans', href: '#floor-plans' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ],
  configurations: [
    { label: '2 BHK Apartments', href: '#pricing' },
    { label: '3 BHK Apartments', href: '#pricing' },
    { label: '3 BHK 2T Apartments', href: '#pricing' },
    { label: '4 BHK Apartments', href: '#pricing' },
    { label: '4.5 BHK Apartments', href: '#pricing' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Disclaimer', href: '#' },
    { label: 'RERA Information', href: '#' },
  ],
};

const socialLinks = [
  { icon: 'mdi:facebook', href: '#', label: 'Facebook' },
  { icon: 'mdi:instagram', href: '#', label: 'Instagram' },
  { icon: 'mdi:twitter', href: '#', label: 'Twitter' },
  { icon: 'mdi:youtube', href: '#', label: 'YouTube' },
  { icon: 'mdi:linkedin', href: '#', label: 'LinkedIn' },
];

const contactInfo = [
  {
    icon: 'mdi:map-marker-outline',
    title: 'Address',
    content: 'Sarjapur Road, Bengaluru, Karnataka 560035',
  },
  {
    icon: 'mdi:phone-outline',
    title: 'Phone',
    content: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: 'mdi:email-outline',
    title: 'Email',
    content: 'info@nambiardistrict25.com',
    href: 'mailto:info@nambiardistrict25.com',
  },
  {
    icon: 'mdi:clock-outline',
    title: 'Office Hours',
    content: 'Mon - Sun: 9:00 AM - 7:00 PM',
  },
];

const Footer = () => {
  const { openLeadForm } = useModal();

  // Smooth scroll to section
  const scrollToSection = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Main Footer */}
      <div className={styles.mainFooter}>
        <Container maxWidth="xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Grid container spacing={{ xs: 4, md: 5 }}>
              {/* Brand Section */}
              <Grid item xs={12} md={4} lg={4}>
                <motion.div className={styles.brandSection} variants={itemVariants}>
                  <div className={styles.logoWrapper}>
                    <img
                      src="https://placehold.co/180x60/FFFFFF/C9A227?text=Nambiar"
                      alt="Nambiar Builders"
                      className={styles.footerLogo}
                    />
                  </div>
                  <p className={styles.brandDescription}>
                    Nambiar District 25 Phase 2 offers premium 2, 3 & 4 BHK apartments
                    in Bangalore's most sought-after location with world-class amenities
                    and sustainable living.
                  </p>
                  <div className={styles.socialLinks}>
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className={styles.socialLink}
                        aria-label={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon icon={social.icon} />
                      </a>
                    ))}
                  </div>
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={() => openLeadForm({ source: 'footer' })}
                    className={styles.ctaButton}
                    startIcon="mdi:calendar-check"
                  >
                    Schedule Site Visit
                  </Button>
                </motion.div>
              </Grid>

              {/* Quick Links */}
              <Grid item xs={6} sm={4} md={2} lg={2}>
                <motion.div className={styles.linksSection} variants={itemVariants}>
                  <h4 className={styles.sectionTitle}>Quick Links</h4>
                  <ul className={styles.linksList}>
                    {footerLinks.quickLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={(e) => scrollToSection(e, link.href)}
                          className={styles.link}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Grid>

              {/* Configurations */}
              <Grid item xs={6} sm={4} md={2} lg={2}>
                <motion.div className={styles.linksSection} variants={itemVariants}>
                  <h4 className={styles.sectionTitle}>Configurations</h4>
                  <ul className={styles.linksList}>
                    {footerLinks.configurations.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={(e) => scrollToSection(e, link.href)}
                          className={styles.link}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Grid>

              {/* Contact Info */}
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <motion.div className={styles.contactSection} variants={itemVariants}>
                  <h4 className={styles.sectionTitle}>Contact Us</h4>
                  <ul className={styles.contactList}>
                    {contactInfo.map((info) => (
                      <li key={info.title} className={styles.contactItem}>
                        <div className={styles.contactIcon}>
                          <Icon icon={info.icon} />
                        </div>
                        <div className={styles.contactContent}>
                          <span className={styles.contactTitle}>{info.title}</span>
                          {info.href ? (
                            <a href={info.href} className={styles.contactText}>
                              {info.content}
                            </a>
                          ) : (
                            <span className={styles.contactText}>{info.content}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </div>

      {/* Bottom Footer */}
      <div className={styles.bottomFooter}>
        <Container maxWidth="xl">
          <div className={styles.bottomContent}>
            <div className={styles.copyright}>
              <p>
                © {new Date().getFullYear()} Nambiar Builders. All Rights Reserved.
              </p>
              <p className={styles.disclaimer}>
                RERA No: PRM/KA/RERA/1251/446/PR/XXXXX | Disclaimer: This is not an official
                Nambiar website. We are authorized marketing partners.
              </p>
            </div>
            <div className={styles.legalLinks}>
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.label}>
                  <a href={link.href} className={styles.legalLink}>
                    {link.label}
                  </a>
                  {index < footerLinks.legal.length - 1 && (
                    <span className={styles.legalDivider}>|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
