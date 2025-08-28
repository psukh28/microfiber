# Email Setup for RFQ System

The RFQ system is configured to send emails to **ps2pranav@gmail.com** when customers submit quote requests.

## Current Status
✅ RFQ form is working and submitting data  
✅ API endpoint is processing requests  
✅ Email system is configured with fallback to console logging  

## Quick Setup Options

### Option 1: Resend (Recommended - Free tier available)
1. Sign up at https://resend.com
2. Get your API key from https://resend.com/api-keys
3. Create a `.env` file in the project root:
   ```
   RESEND_API_KEY=your_api_key_here
   ```
4. Emails will be sent automatically

### Option 2: Development Mode (Current)
- All RFQ submissions are logged to the console
- You can see the email content in your server logs
- No additional setup needed for testing

### Option 3: Other Email Services
The system supports multiple email providers:
- SendGrid
- Mailgun  
- Postmark
- Any SMTP service

## Testing the RFQ System

1. Fill out the RFQ form on your website
2. Check the server console for the email content
3. If Resend is configured, check ps2pranav@gmail.com for the email

## Email Content Includes:
- Company name and contact details
- Products they're interested in
- Quantity requirements
- Custom message
- Timestamp
- Formatted as both HTML and plain text

## Next Steps
1. Set up Resend API key for production
2. Test the form submission
3. Update email address when ready for production