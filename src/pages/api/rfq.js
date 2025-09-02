import { validateRFQForm } from '../../utils/validation.js';

// Enable server-side rendering for this API endpoint
export const prerender = false;

// Email sending function using Resend API
async function sendRFQEmail(formData) {
  const emailContent = `
New RFQ Request from Driver's Choice Clearance

Company: ${formData.company}
Contact Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Country: ${formData.country}

Products Interested In:
${formData.products}

Quantity: ${formData.quantity}

Message:
${formData.message}

Submitted: ${new Date().toLocaleString()}
  `.trim();

  // HTML version for better formatting
  const htmlContent = `
    <h2>New RFQ Request from Driver's Choice Clearance</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company:</td><td style="padding: 8px; border: 1px solid #ddd;">${formData.company}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Contact Name:</td><td style="padding: 8px; border: 1px solid #ddd;">${formData.name}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td><td style="padding: 8px; border: 1px solid #ddd;">${formData.email}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone:</td><td style="padding: 8px; border: 1px solid #ddd;">${formData.phone || 'Not provided'}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Country:</td><td style="padding: 8px; border: 1px solid #ddd;">${formData.country}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Quantity:</td><td style="padding: 8px; border: 1px solid #ddd;">${formData.quantity}</td></tr>
    </table>
    <h3>Products Interested In:</h3>
    <p style="background: #f5f5f5; padding: 10px; border-left: 4px solid #007bff;">${formData.products.replace(/\n/g, '<br>')}</p>
    <h3>Message:</h3>
    <p style="background: #f5f5f5; padding: 10px; border-left: 4px solid #007bff;">${formData.message.replace(/\n/g, '<br>')}</p>
    <p style="color: #666; font-size: 12px;">Submitted: ${new Date().toLocaleString()}</p>
  `;

  // Try multiple email services in order of preference
  const emailServices = [
    // Resend API (recommended)
    async () => {
      const RESEND_API_KEY = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
      if (!RESEND_API_KEY) throw new Error('No Resend API key');
      
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'RFQ System <onboarding@resend.dev>',
          to: ['pranav@kidskreationsco.com'],
          subject: `New RFQ from ${formData.company} - ${formData.name}`,
          html: htmlContent,
          text: emailContent,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Resend API error: ${response.status}`);
      }
      
      return await response.json();
    },
    
    // Fallback: Log to console (for development)
    async () => {
      console.log('=== EMAIL TO pranav@kidskreationsco.com ===');
      console.log('Subject: New RFQ from', formData.company, '-', formData.name);
      console.log(emailContent);
      console.log('=== END EMAIL ===');
      return { id: 'console-log', message: 'Logged to console' };
    }
  ];

  // Try each service until one succeeds
  for (const service of emailServices) {
    try {
      const result = await service();
      return result;
    } catch (error) {
      console.log('Email service failed, trying next:', error.message);
      continue;
    }
  }
  
  throw new Error('All email services failed');
}

export async function POST({ request }) {
  try {
    // Debug logging
    console.log('=== RFQ API DEBUG ===');
    console.log('Content-Type:', request.headers.get('content-type'));
    console.log('Method:', request.method);
    
    // Parse request body with error handling
    let formData;
    const contentType = request.headers.get('content-type') || '';
    
    try {
      if (contentType.includes('application/json')) {
        // Handle JSON submission (AJAX)
        const text = await request.text();
        if (!text.trim()) {
          throw new Error('Empty request body');
        }
        formData = JSON.parse(text);
      } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
        // Handle form-data submission (no JavaScript)
        const data = await request.formData();
        formData = {
          company: data.get('company') || '',
          name: data.get('name') || '',
          email: data.get('email') || '',
          phone: data.get('phone') || '',
          country: data.get('country') || '',
          products: data.get('products') || '',
          quantity: data.get('quantity') || '',
          message: data.get('message') || ''
        };
      } else {
        // Default to JSON parsing for React form submissions
        const text = await request.text();
        if (!text.trim()) {
          throw new Error('Empty request body');
        }
        formData = JSON.parse(text);
      }
    } catch (parseError) {
      console.error('Request parsing error:', parseError);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid request format'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Validate form data
    const validation = validateRFQForm(formData);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: validation.errors
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Send email notification
    try {
      await sendRFQEmail(formData);
      console.log('RFQ email sent successfully to pranav@kidskreationsco.com');
    } catch (emailError) {
      console.error('Failed to send RFQ email:', emailError);
      // Continue processing even if email fails
    }

    // Log the submission for backup
    console.log('RFQ Submission:', {
      timestamp: new Date().toISOString(),
      ...formData
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Quote request submitted successfully'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('RFQ API Error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

// Handle non-POST requests
export async function GET() {
  return new Response(
    JSON.stringify({
      message: 'RFQ endpoint - POST only'
    }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}