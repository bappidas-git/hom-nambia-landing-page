<?php
/**
 * Lead Form Submission Handler
 *
 * This script handles lead form submissions from the Nambiar District 25 landing page.
 * It creates the database and table if they don't exist, validates input, and saves the lead.
 */

// Set headers for CORS and JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Use POST request.'
    ]);
    exit();
}

require_once __DIR__ . '/config/database.php';

/**
 * Create database if it doesn't exist
 *
 * @return bool True on success, false on failure
 */
function createDatabaseIfNotExists() {
    $conn = getConnectionWithoutDB();
    if (!$conn) {
        return false;
    }

    try {
        $sql = "CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
        $conn->exec($sql);
        return true;
    } catch (PDOException $e) {
        error_log("Failed to create database: " . $e->getMessage());
        return false;
    }
}

/**
 * Create leads table if it doesn't exist
 *
 * @param PDO $conn Database connection
 * @return bool True on success, false on failure
 */
function createLeadsTableIfNotExists($conn) {
    try {
        $sql = "CREATE TABLE IF NOT EXISTS `leads` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(50) NOT NULL,
            `mobile` VARCHAR(15) NOT NULL,
            `email` VARCHAR(255) NOT NULL,
            `message` TEXT DEFAULT NULL,
            `source` VARCHAR(100) DEFAULT 'website',
            `ip_address` VARCHAR(45) DEFAULT NULL,
            `user_agent` TEXT DEFAULT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX `idx_email` (`email`),
            INDEX `idx_mobile` (`mobile`),
            INDEX `idx_created_at` (`created_at`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

        $conn->exec($sql);
        return true;
    } catch (PDOException $e) {
        error_log("Failed to create leads table: " . $e->getMessage());
        return false;
    }
}

/**
 * Sanitize input string
 *
 * @param string $input Input string to sanitize
 * @return string Sanitized string
 */
function sanitizeInput($input) {
    if ($input === null) {
        return '';
    }
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

/**
 * Validate name (2-50 characters, letters/spaces/hyphens/apostrophes)
 *
 * @param string $name Name to validate
 * @return bool True if valid
 */
function validateName($name) {
    $name = trim($name);
    if (strlen($name) < 2 || strlen($name) > 50) {
        return false;
    }
    return preg_match("/^[a-zA-Z\s\-']+$/", $name);
}

/**
 * Validate Indian mobile number (10 digits, starts with 6-9)
 *
 * @param string $mobile Mobile number to validate
 * @return bool True if valid
 */
function validateMobile($mobile) {
    $mobile = preg_replace('/[^0-9]/', '', $mobile);
    return preg_match('/^[6-9]\d{9}$/', $mobile);
}

/**
 * Validate email address
 *
 * @param string $email Email to validate
 * @return bool True if valid
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validate message (optional, max 500 characters)
 *
 * @param string $message Message to validate
 * @return bool True if valid
 */
function validateMessage($message) {
    if (empty($message)) {
        return true;
    }
    return strlen($message) <= 500;
}

/**
 * Get client IP address
 *
 * @return string Client IP address
 */
function getClientIP() {
    $ipKeys = [
        'HTTP_CLIENT_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_FORWARDED',
        'HTTP_X_CLUSTER_CLIENT_IP',
        'HTTP_FORWARDED_FOR',
        'HTTP_FORWARDED',
        'REMOTE_ADDR'
    ];

    foreach ($ipKeys as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = $_SERVER[$key];
            // Handle comma-separated IPs (X-Forwarded-For)
            if (strpos($ip, ',') !== false) {
                $ip = trim(explode(',', $ip)[0]);
            }
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }

    return 'unknown';
}

// Main execution
try {
    // Get POST data (supports both form-data and JSON)
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (strpos($contentType, 'application/json') !== false) {
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON data');
        }
    } else {
        $data = $_POST;
    }

    // Extract and sanitize fields
    $name = sanitizeInput($data['name'] ?? '');
    $mobile = preg_replace('/[^0-9]/', '', $data['mobile'] ?? '');
    $email = sanitizeInput($data['email'] ?? '');
    $message = sanitizeInput($data['message'] ?? '');
    $source = sanitizeInput($data['source'] ?? 'website');

    // Validate required fields
    $errors = [];

    if (empty($name)) {
        $errors[] = 'Name is required';
    } elseif (!validateName($name)) {
        $errors[] = 'Please enter a valid name (2-50 characters, letters only)';
    }

    if (empty($mobile)) {
        $errors[] = 'Mobile number is required';
    } elseif (!validateMobile($mobile)) {
        $errors[] = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (empty($email)) {
        $errors[] = 'Email is required';
    } elseif (!validateEmail($email)) {
        $errors[] = 'Please enter a valid email address';
    }

    if (!validateMessage($message)) {
        $errors[] = 'Message must be less than 500 characters';
    }

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $errors
        ]);
        exit();
    }

    // Create database if not exists
    if (!createDatabaseIfNotExists()) {
        throw new Exception('Failed to create database');
    }

    // Get database connection
    $conn = getConnection();
    if (!$conn) {
        throw new Exception('Database connection failed');
    }

    // Create table if not exists
    if (!createLeadsTableIfNotExists($conn)) {
        throw new Exception('Failed to create leads table');
    }

    // Check for duplicate submission (same email or mobile in last 24 hours)
    $checkSql = "SELECT id FROM leads
                 WHERE (email = :email OR mobile = :mobile)
                 AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->execute([
        ':email' => $email,
        ':mobile' => $mobile
    ]);

    if ($checkStmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'You have already submitted an enquiry recently. Our team will contact you soon.',
            'duplicate' => true
        ]);
        exit();
    }

    // Insert lead into database
    $sql = "INSERT INTO leads (name, mobile, email, message, source, ip_address, user_agent)
            VALUES (:name, :mobile, :email, :message, :source, :ip_address, :user_agent)";

    $stmt = $conn->prepare($sql);
    $result = $stmt->execute([
        ':name' => $name,
        ':mobile' => $mobile,
        ':email' => $email,
        ':message' => $message ?: null,
        ':source' => $source,
        ':ip_address' => getClientIP(),
        ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null
    ]);

    if ($result) {
        $leadId = $conn->lastInsertId();

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your interest! Our team will contact you shortly.',
            'lead_id' => $leadId
        ]);
    } else {
        throw new Exception('Failed to save lead');
    }

} catch (Exception $e) {
    error_log("Lead submission error: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while processing your request. Please try again later.'
    ]);
}
