<?php

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

/**
 * Checks rate limiting based on IP address.
 * @param string $ip - Client IP address
 * @return bool - True if allowed, false if rate limit reached
 */
function checkRateLimit($ip) {
    $rateFile = __DIR__ . '/rate_limit.json';
    $maxRequests = 3;
    $timeWindow = 3600;
    $rateData = [];

    if (file_exists($rateFile)) {
        $rateData = json_decode(file_get_contents($rateFile), true) ?: [];
    }

    $currentTime = time();
    $clientData = $rateData[$ip] ?? ['requests' => [], 'blocked_until' => 0];
    $clientData['requests'] = array_filter(
        $clientData['requests'],
        function($timestamp) use ($currentTime, $timeWindow) {
            return ($currentTime - $timestamp) < $timeWindow;
        }
    );

    if (count($clientData['requests']) >= $maxRequests) {
        $clientData['blocked_until'] = $currentTime + $timeWindow;
        $rateData[$ip] = $clientData;
        file_put_contents($rateFile, json_encode($rateData));
        return false;
    }

    $clientData['requests'][] = $currentTime;
    $rateData[$ip] = $clientData;
    $rateData = array_filter($rateData, function($data) use ($currentTime) {
        return !empty($data['requests']) &&
               ($currentTime - max($data['requests'])) < 86400;
    });

    file_put_contents($rateFile, json_encode($rateData));
    return true;
}

/**
 * Logs events to file.
 * @param string $level - Log level (INFO, ERROR, WARNING)
 * @param string $message - Log message
 * @param array $context - Additional context data
 */
function logEvent($level, $message, $context = []) {
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
 * Creates the HTML email template for contact form submissions.
 * @param string $name - Sender's name
 * @param string $email - Sender's email
 * @param string $message - Email message
 * @return string - HTML email template
 */
function createEmailTemplate($name, $email, $message) {
    $date = date('d.m.Y H:i:s');
    return "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Contact Request - Portfolio</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #00BC8F, #5988FF); color: white; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 10px 0 0; opacity: 0.95; }
            .content { padding: 30px; }
            .field { margin-bottom: 20px; }
            .field-label { font-weight: bold; color: #333; display: block; margin-bottom: 8px; font-size: 14px; }
            .field-value { background: #f8f9fa; padding: 12px; border-radius: 4px; border-left: 4px solid #00BC8F; }
            .message-content { background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 4px; white-space: pre-wrap; line-height: 1.8; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #e0e0e0; }
            .footer p { margin: 5px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>💼 Portfolio Contact Request</h1>
                <p>New message from contact form</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='field-label'>👤 Name:</span>
                    <div class='field-value'>$name</div>
                </div>
                <div class='field'>
                    <span class='field-label'>📧 Email:</span>
                    <div class='field-value'>$email</div>
                </div>
                <div class='field'>
                    <span class='field-label'>💬 Message:</span>
                    <div class='message-content'>" . nl2br($message) . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>📅 Sent on: $date</p>
                <p>🌐 From: your-domain.com</p>
            </div>
        </div>
    </body>
    </html>";
}

/**
 * Creates the confirmation HTML email template for sender.
 * @param string $name - Sender's name
 * @return string - HTML confirmation email template
 */
function createConfirmationTemplate($name) {
    return "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Confirmation - Portfolio</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #5988FF, #00BC8F); color: white; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { padding: 30px; color: #333; }
            .content p { margin: 15px 0; }
            .button { display: inline-block; background: linear-gradient(135deg, #00BC8F, #5988FF); color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; transition: transform 0.2s; }
            .button:hover { transform: translateY(-2px); }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #e0e0e0; }
            .footer p { margin: 5px 0; }
            .hours { background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #00BC8F; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>💼 Your Name</h1>
                <p>Full-Stack Developer</p>
            </div>
            <div class='content'>
                <p>Hello <strong>$name</strong>,</p>
                <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
                <p>I usually respond within <strong>24-48 hours</strong> during business days.</p>
                <div class='hours'>
                    <strong>📞 Availability:</strong><br>
                    Monday - Friday: 09:00 - 17:00 (CET)<br>
                    Weekend: By appointment
                </div>
                <p style='text-align: center;'>
                    <a href='https://your-domain.com' class='button'>Visit My Portfolio</a>
                </p>
                <p>Best regards,<br>
                <strong>Your Name</strong><br>
                Full-Stack Developer</p>
            </div>
            <div class='footer'>
                <p>📧 your-email@example.com</p>
                <p>🌐 your-domain.com</p>
            </div>
        </div>
    </body>
    </html>";
}

switch ($_SERVER['REQUEST_METHOD']) {
    case "OPTIONS":
        header("Access-Control-Allow-Origin: https://your-domain.com");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Max-Age: 3600");
        http_response_code(200);
        exit;

    case "POST":
        header("Access-Control-Allow-Origin: https://your-domain.com");
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

        // Honeypot check (optional, if you add a hidden field)
        if (isset($params['website']) && !empty(trim($params['website']))) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Spam detected']);
            exit;
        }

        $email = filter_var(trim($params['email']), FILTER_VALIDATE_EMAIL);

        if (!$email) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid email address']);
            exit;
        }

        $name = htmlspecialchars(trim($params['name']), ENT_QUOTES, 'UTF-8');
        $message = htmlspecialchars(trim($params['message']), ENT_QUOTES, 'UTF-8');

        if (strlen($name) > 100) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Name too long (max 100 characters)']);
            exit;
        }

        if (strlen($message) > 2000) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Message too long (max 2000 characters)']);
            exit;
        }

        logEvent('INFO', 'Contact form submitted', [
            'name' => $name,
            'email' => $email
        ]);

        $recipient = 'your-email@example.com';
        $emailSubject = "Portfolio Contact from $name";
        $emailMessage = createEmailTemplate($name, $email, $message);
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=utf-8',
            'From: noreply@your-domain.com',
            'Reply-To: ' . $email,
            'X-Mailer: Portfolio Contact Form'
        ];

        $mailSent = mail($recipient, $emailSubject, $emailMessage, implode("\r\n", $headers));

        if (!$mailSent) {
            logEvent('ERROR', 'Failed to send email', ['recipient' => $recipient]);
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to send email']);
            exit;
        }

        logEvent('INFO', 'Email sent successfully', ['recipient' => $recipient]);

        $confirmationSubject = "Thank you for contacting me - Your Name";
        $confirmationMessage = createConfirmationTemplate($name);
        $confirmationHeaders = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=utf-8',
            'From: Your Name <noreply@your-domain.com>',
            'Reply-To: your-email@example.com',
            'X-Mailer: Portfolio Contact Form'
        ];

        $confirmationSent = mail($email, $confirmationSubject, $confirmationMessage, implode("\r\n", $confirmationHeaders));

        if ($confirmationSent) {
            logEvent('INFO', 'Confirmation email sent', ['recipient' => $email]);
        } else {
            logEvent('WARNING', 'Failed to send confirmation email', ['recipient' => $email]);
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
