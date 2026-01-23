<?php
/**
 * Email Configuration
 *
 * This file contains Gmail SMTP settings for sending lead notifications.
 * Update these values with your actual Gmail credentials.
 *
 * IMPORTANT: For Gmail, you need to:
 * 1. Enable 2-Factor Authentication on your Google account
 * 2. Generate an App Password: https://myaccount.google.com/apppasswords
 * 3. Use the App Password (not your regular password) for SMTP_PASS
 */

// Gmail SMTP Settings
define('SMTP_HOST', getenv('SMTP_HOST') ?: 'smtp.gmail.com');
define('SMTP_PORT', getenv('SMTP_PORT') ?: 587);
define('SMTP_USER', getenv('SMTP_USER') ?: 'your-email@gmail.com');
define('SMTP_PASS', getenv('SMTP_PASS') ?: 'your-app-password');
define('SMTP_SECURE', 'tls'); // Use 'tls' for port 587, 'ssl' for port 465

// Email Recipients
define('EMAIL_FROM', getenv('EMAIL_FROM') ?: SMTP_USER);
define('EMAIL_FROM_NAME', getenv('EMAIL_FROM_NAME') ?: 'Nambiar District 25');
define('EMAIL_TO', getenv('EMAIL_TO') ?: 'sales@nambiardistrict25.com');
define('EMAIL_TO_NAME', getenv('EMAIL_TO_NAME') ?: 'Sales Team');

// Optional: CC Recipients (comma-separated)
define('EMAIL_CC', getenv('EMAIL_CC') ?: '');

// Email Settings
define('EMAIL_SUBJECT_PREFIX', '[New Lead] ');
