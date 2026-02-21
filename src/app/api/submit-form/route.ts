import { NextRequest, NextResponse } from 'next/server';
import { myApp, myAppNumber } from '@/utils/constants';

/** Max lengths for form fields */
const LIMITS = {
  name: 200,
  email: 254,
  message: 5000,
} as const;

/** Simple email format check (RFC 5322 simplified) */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Allowed app values: menu labels from myApp (JA/EN), excluding home */
const ALLOWED_APP_VALUES = new Set<string>([
  ...myApp(1024, true).map((a) => a.text.menu).filter((_, i) => i !== myAppNumber.home),
  ...myApp(1024, false).map((a) => a.text.menu).filter((_, i) => i !== myAppNumber.home),
]);

/**
 * Validates and sanitizes form body. Returns null if valid, or an error response body.
 */
function validateFormBody(body: unknown): { name: string; email: string; app: string; message: string } | NextResponse {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
  }
  const raw = body as Record<string, unknown>;
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  const email = typeof raw.email === 'string' ? raw.email.trim() : '';
  const app = typeof raw.app === 'string' ? raw.app.trim() : '';
  const message = typeof raw.message === 'string' ? raw.message.trim() : '';

  if (!name) {
    return NextResponse.json({ success: false, message: 'Name is required' }, { status: 400 });
  }
  if (name.length > LIMITS.name) {
    return NextResponse.json(
      { success: false, message: `Name must be at most ${LIMITS.name} characters` },
      { status: 400 }
    );
  }

  if (!email) {
    return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ success: false, message: 'Invalid email format' }, { status: 400 });
  }
  if (email.length > LIMITS.email) {
    return NextResponse.json(
      { success: false, message: `Email must be at most ${LIMITS.email} characters` },
      { status: 400 }
    );
  }

  if (!app) {
    return NextResponse.json({ success: false, message: 'App selection is required' }, { status: 400 });
  }
  if (!ALLOWED_APP_VALUES.has(app)) {
    return NextResponse.json({ success: false, message: 'Invalid app selection' }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ success: false, message: 'Message is required' }, { status: 400 });
  }
  if (message.length > LIMITS.message) {
    return NextResponse.json(
      { success: false, message: `Message must be at most ${LIMITS.message} characters` },
      { status: 400 }
    );
  }

  return { name, email, app, message };
}

/**
 * Form submission API route for contact form processing
 * Handles contact form submissions by forwarding data to Google Forms for storage and processing.
 * Validates incoming data, maps form fields to Google Forms entry IDs, and provides
 * appropriate success/error responses. Includes proper error handling, development logging,
 * and HTTP status codes for different scenarios including successful submission,
 * validation errors, and server errors.
 *
 * This route:
 * - Receives form data from the client
 * - Validates and sanitizes required fields (name, email, app, message)
 * - Maps form fields to Google Forms entry IDs
 * - Submits data to Google Forms
 * - Returns appropriate success/error responses
 */
export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const validated = validateFormBody(body);
    if (validated instanceof NextResponse) {
      return validated;
    }
    const { name, email, app, message } = validated;

    const formId = process.env.GOOGLE_FORM_ID?.trim();
    if (!formId) {
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const isEmbedFormId = formId.includes('FAIpQL');
    const formResponseUrl = isEmbedFormId
      ? `https://docs.google.com/forms/u/0/d/e/${formId}/formResponse`
      : `https://docs.google.com/forms/u/0/d/${formId}/formResponse`;

    // Fetch form page to get fbzx (required by Google to record the response)
    let fbzx: string | null = null;
    if (isEmbedFormId) {
      try {
        const viewformUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;
        const formPageRes = await fetch(viewformUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FormSubmit/1.0)' },
        });
        const html = await formPageRes.text();
        const fbzxMatch = html.match(/name="fbzx"\s+value="([^"]*)"/) ?? html.match(/name="fbzx" value="([^"]*)"/);
        if (fbzxMatch?.[1]) fbzx = fbzxMatch[1];
      } catch (e) {
        if (process.env.NODE_ENV === 'development') console.error('Failed to fetch fbzx', e);
      }
    }

    const formData = new URLSearchParams();
    formData.append('entry.1179215924', name);
    formData.append('entry.21222962', email);
    formData.append('entry.914237572', app);
    formData.append('entry.1423252519', message);
    formData.append('pageHistory', '0');
    if (fbzx) formData.append('fbzx', fbzx);
    formData.append('submit', 'Submit');

    const response = await fetch(formResponseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    // Development environment response logging for debugging
    if (process.env.NODE_ENV === 'development') {
      // console.log('Google Forms response status:', response.status);
    }

    // Return success response if form submission was successful
    // Google Forms returns 200 status even for successful submissions
    if (response.ok) {
      return NextResponse.json({ 
        success: true, 
        message: 'Form submitted successfully' 
      });
    } else {
      // Return error response if Google Forms submission failed
      // This could happen due to network issues or invalid form configuration
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to submit form',
        status: response.status
      }, { status: 400 });
    }
  } catch (error) {
    // Handle server errors and return appropriate error response
    if (process.env.NODE_ENV === 'development') {
      console.error('Form submission error:', error);
    }
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 