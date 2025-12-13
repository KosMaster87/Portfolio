<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../libs/vendor/PHPMailer-7.0.1/src/Exception.php';
require __DIR__ . '/../libs/vendor/PHPMailer-7.0.1/src/PHPMailer.php';
require __DIR__ . '/../libs/vendor/PHPMailer-7.0.1/src/SMTP.php';

/**
 * Logs mailer-specific events.
 *
 * @param string $level Log level (e.g., ERROR, INFO)
 * @param string $message Log message
 * @param array $context Additional context data
 * @return void
 */
function logMailerEvent(string $level, string $message, array $context = []): void
{
  $logFile = __DIR__ . '/contact_logs.txt';
  $timestamp = date('Y-m-d H:i:s');
  $logEntry = sprintf(
    "[%s] MAILER_SERVICE %s: %s | Context: %s\n",
    $timestamp,
    $level,
    $message,
    json_encode($context)
  );
  file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

/**
 * Sends an email via SMTP using PHPMailer.
 *
 * @param string $toEmail Recipient email address
 * @param string $toName Recipient name
 * @param string $subject Email subject
 * @param string $htmlBody HTML content of the email
 * @return bool True on success, false on failure
 */
function sendSmtpEmail(string $toEmail, string $toName, string $subject, string $htmlBody): bool
{
  $mail = new PHPMailer(true);

  try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.ionos.de';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your-email@example.com';
    $mail->Password   = 'YOUR_SMTP_PASSWORD_HERE';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';
    $mail->setFrom('your-email@example.com', 'FirstName LastName');
    $mail->addAddress($toEmail, $toName);
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $htmlBody;
    $mail->AltBody = strip_tags($htmlBody);
    $mail->send();
    return true;
  } catch (Exception $e) {
    logMailerEvent('ERROR', 'PHPMailer failed to send email.', ['error' => $mail->ErrorInfo]);
    return false;
  }
}

/**
 * Sends an email via SMTP using PHPMailer with a custom Reply-To address.
 *
 * @param string $toEmail Recipient email address
 * @param string $toName Recipient name
 * @param string $subject Email subject
 * @param string $htmlBody HTML content of the email
 * @param string $replyToEmail Reply-To email address
 * @param string $replyToName Reply-To name
 * @return bool True on success, false on failure
 */
function sendSmtpEmailWithReplyTo(string $toEmail, string $toName, string $subject, string $htmlBody, string $replyToEmail, string $replyToName): bool
{
  $mail = new PHPMailer(true);

  try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.ionos.de';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your-email@example.com';
    $mail->Password   = 'YOUR_SMTP_PASSWORD_HERE';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';
    $mail->setFrom('your-email@example.com', 'first name Last Name');
    $mail->addAddress($toEmail, $toName);
    $mail->addReplyTo($replyToEmail, $replyToName);
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $htmlBody;
    $mail->AltBody = strip_tags($htmlBody);
    $mail->send();
    return true;
  } catch (Exception $e) {
    logMailerEvent('ERROR', 'PHPMailer failed to send email.', ['error' => $mail->ErrorInfo, 'exception' => $e->getMessage()]);
    return false;
  }
}
