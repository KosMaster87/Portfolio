# Contact API Setup

This directory contains the PHP contact form handler for the portfolio.

## Files

- `contact.php` - **Production file (not in Git)** - Contains real credentials
- `contact.example.php` - Example template with placeholders
- `rate_limit.json` - Rate limiting data (auto-generated, not in Git)
- `contact_logs.txt` - Contact form logs (auto-generated, not in Git)

## Setup

1. **Copy the example file:**

   ```bash
   cp contact.example.php contact.php
   ```

2. **Update credentials in `contact.php`:**

   - Replace `https://your-domain.com` with your actual domain
   - Replace `your-email@example.com` with your email
   - Update the email templates with your branding

3. **Set permissions:**
   ```bash
   chmod 644 contact.php
   chmod 666 rate_limit.json      # If exists
   chmod 666 contact_logs.txt     # If exists
   ```

## Security Features

- Rate limiting (3 requests per hour per IP)
- Input validation and sanitization
- XSS protection headers
- Email validation
- Spam honeypot support
- Request logging
- CORS protection

## Email Features

### For You (Site Owner):

- Professional HTML email with gradient header
- Sender information clearly displayed
- Message content formatted
- Timestamp and origin information

### For Sender (Confirmation):

- Branded confirmation email
- Expected response time
- Contact information
- Link back to portfolio

## Troubleshooting

### Email not sending:

1. Check PHP `mail()` function is enabled
2. Verify SMTP settings on server
3. Check `contact_logs.txt` for errors
4. Ensure `From:` email domain matches server domain

### Rate limiting issues:

1. Delete `rate_limit.json` to reset all limits
2. Adjust `$maxRequests` and `$timeWindow` in `contact.php`

### CORS errors:

1. Verify `Access-Control-Allow-Origin` matches your domain
2. Check server allows `.htaccess` overrides

## Logs

Check `contact_logs.txt` for:

- Successful submissions
- Failed email sends
- Rate limit blocks
- Validation errors

Format: `[timestamp] LEVEL: message | IP: xxx | Context: {...}`

## Configuration

```php
// Rate limiting (in checkRateLimit function)
$maxRequests = 3;           // Max requests per time window
$timeWindow = 3600;         // Time window in seconds (1 hour)

// Input limits
$nameMaxLength = 100;       // Maximum name length
$messageMaxLength = 2000;   // Maximum message length
```
