/* ============================================
   Footer Component - Nambiar District 25 Phase 2
   Bottom footer with copyright and legal links
   ============================================ */

import React from 'react';
import { Container } from '@mui/material';
import styles from './Footer.module.css';

// Legal links data
const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Disclaimer', href: '#' },
  { label: 'RERA Information', href: '#' },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
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
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.label}>
                  <a href={link.href} className={styles.legalLink}>
                    {link.label}
                  </a>
                  {index < legalLinks.length - 1 && (
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
