<?php

declare(strict_types=1);

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

require_once __DIR__ . '/mailer.service.php';
require_once __DIR__ . '/rate-limiter.php';

/**
 * Logs events to file.
 *
 * @param string $level Log level (INFO, ERROR, WARNING)
 * @param string $message Log message
 * @param array $context Additional context data
 * @return void
 */
function logEvent(string $level, string $message, array $context = []): void
{
  $logFile = __DIR__ . '/contact_logs.txt';
  $timestamp = date('Y-m-d H:i:s');
  $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
  $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
  $logEntry = sprintf(
    "[%s] %s: %s | IP: %s | Context: %s | UserAgent: %s\n",
    $timestamp,
    $level,
    $message,
    $ip,
    json_encode($context),
    $userAgent
  );

  file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

/**
 * Loads an HTML template and replaces placeholders with actual values.
 *
 * @param string $templateFile Template filename (e.g., 'email_template.html')
 * @param array<string, string> $variables Key-value pairs for placeholder replacement
 * @return string Processed HTML content
 */
function loadTemplate(string $templateFile, array $variables): string
{
  $templatePath = __DIR__ . "/templates/$templateFile";

  if (!file_exists($templatePath)) {
    logEvent('ERROR', 'Template file not found', ['file' => $templateFile]);
    return '';
  }

  $content = file_get_contents($templatePath);
  if ($content === false) {
    logEvent('ERROR', 'Failed to read template file', ['file' => $templateFile]);
    return '';
  }

  foreach ($variables as $key => $value) {
    $content = str_replace("{{" . $key . "}}", $value, $content);
  }

  return $content;
}

/**
 * Creates the HTML email template for contact form submissions.
 *
 * @param string $name Sender's name
 * @param string $email Sender's email address
 * @param string $message Message content
 * @return string HTML email template
 */
function createEmailTemplate(string $name, string $email, string $message): string
{
  return loadTemplate('email_template.html', [
    'name' => $name,
    'email' => $email,
    'message' => nl2br($message),
    'date' => date('d.m.Y H:i:s')
  ]);
}

/**
 * Creates the HTML confirmation email template.
 *
 * @param string $name Recipient's name
 * @return string HTML confirmation template
 */
function createConfirmationTemplate(string $name): string
{
  return loadTemplate('confirmation_template.html', [
    'name' => $name
  ]);
}


// Main request handler
switch ($_SERVER['REQUEST_METHOD']) {
  case "OPTIONS":
    header("Access-Control-Allow-Origin: your-email@example.com");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    http_response_code(200);
    exit;

  case "POST":
    header("Access-Control-Allow-Origin: your-email@example.com");
    header("Content-Type: application/json; charset=utf-8");

    $clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

    if (!checkRateLimit($clientIP)) {
      http_response_code(429);
      echo json_encode([
        'success' => false,
        'message' => 'Too many requests. Please try again in one hour.',
        'retry_after' => 3600
      ]);
      exit;
    }

    $json = file_get_contents('php://input');
    if (!$json) {
      http_response_code(400);
      echo json_encode(['success' => false, 'message' => 'No data received']);
      exit;
    }

    $params = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
      http_response_code(400);
      echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
      exit;
    }

    $requiredFields = ['email', 'name', 'message'];
    foreach ($requiredFields as $field) {
      if (empty($params[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);
        exit;
      }
    }

    $email = filter_var(trim($params['email']), FILTER_VALIDATE_EMAIL);
    $name = htmlspecialchars(trim($params['name']), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($params['message']), ENT_QUOTES, 'UTF-8');

    logEvent('INFO', 'Contact form submitted', ['name' => $name, 'email' => $email]);

    // ==================================================================
    // NEW: Sending email to you via SMTP
    // ==================================================================
    $recipient = 'your-email@example.com';
    $emailSubject = "Portfolio Contact from $name";
    $emailMessage = createEmailTemplate($name, $email, $message);

    $mailSent = sendSmtpEmailWithReplyTo(
      $recipient,               // To: Email
      'first name Last Name',   // To: Name
      $emailSubject,            // Subject
      $emailMessage,            // Body
      $email,                   // Reply-To: Email
      $name                     // Reply-To: Name
    );

    if (!$mailSent) {
      logEvent('ERROR', 'Failed to send email via SMTP', ['recipient' => $recipient]);
      http_response_code(500);
      echo json_encode(['success' => false, 'message' => 'Failed to send email']);
      exit;
    }

    logEvent('INFO', 'Email sent successfully via SMTP', ['recipient' => $recipient]);

    // ==================================================================
    // NEW: Sending confirmation email to the user via SMTP
    // ==================================================================
    $confirmationSubject = "Thank you for contacting me - first name Last Name";
    $confirmationMessage = createConfirmationTemplate($name);

    $confirmationSent = sendSmtpEmail(
      $email,                 // To: Email
      $name,                  // To: Name
      $confirmationSubject,   // Subject
      $confirmationMessage    // Body
    );

    if ($confirmationSent) {
      logEvent('INFO', 'Confirmation email sent via SMTP', ['recipient' => $email]);
    } else {
      logEvent('WARNING', 'Failed to send confirmation email via SMTP', ['recipient' => $email]);
    }

    echo json_encode([
      'success' => true,
      'message' => 'Message sent successfully'
    ]);
    break;

  default:
    header("Allow: POST", true, 405);
    echo json_encode([
      'success' => false,
      'message' => 'Method not allowed'
    ]);
    exit;
}
