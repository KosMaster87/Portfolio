# Security Recommendations for PHP Contact API

## Current Security Measures ✅

Your PHP contact API already implements several good security practices:

1. **Rate Limiting**: Prevents spam (20 requests/minute per IP)
2. **Input Validation**: Email validation with `filter_var()`
3. **XSS Prevention**: Uses `htmlspecialchars()` with ENT_QUOTES
4. **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
5. **Logging**: Comprehensive event logging

## Additional Recommendations 🔒

### 1. CSRF Protection

Add CSRF token validation to prevent cross-site request forgery:

```php
// Generate token (in a session or separate endpoint)
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

// Validate token in contact.php
if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    http_response_code(403);
    exit;
}
```

### 2. Content Security Policy (CSP)

Add stricter CSP header:

```php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
```

### 3. Input Length Limits

Add maximum length validation:

```php
if (strlen($name) > 100 || strlen($email) > 254 || strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Input too long']);
    exit;
}
```

### 4. Honeypot Field

Add hidden field to catch bots:

```html
<!-- In Angular template -->
<input type="text" name="website" style="display:none" tabindex="-1" />
```

```php
// In PHP
if (!empty($params['website'])) {
    // Bot detected, silently reject
    exit;
}
```

### 5. SSL/TLS Only

Ensure HTTPS in production:

```php
if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on') {
    header('Location: https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
    exit;
}
```

### 6. File Permissions

Set restrictive permissions:

```bash
chmod 600 contact.php
chmod 600 rate_limit_data.json
chmod 600 contact_logs.txt
```

### 7. IP Validation

Improve IP detection (proxy awareness):

```php
function getClientIP(): string {
    $headers = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            $ip = $_SERVER[$header];
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return 'unknown';
}
```

## Monitoring 📊

Consider adding:

- Failed attempt monitoring
- Alert system for suspicious activity
- Regular log rotation
- Automated backups of rate limit data
