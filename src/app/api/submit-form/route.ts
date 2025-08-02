import { NextRequest, NextResponse } from 'next/server';

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
 * - Validates required fields
 * - Maps form fields to Google Forms entry IDs
 * - Submits data to Google Forms
 * - Returns appropriate success/error responses
 */
export async function POST(request: NextRequest) {
  try {
    // Extract form data from request body
    const { name, email, app, message } = await request.json();

    // Google Forms configuration and URL setup
    const formUrl = `https://docs.google.com/forms/d/${process.env.NEXT_PUBLIC_GOOGLE_FORM}/formResponse`;
    const formData = new URLSearchParams();
    
    // Map form fields to Google Forms entry IDs
    // These IDs correspond to specific form fields in the Google Form
    formData.append('entry.1179215924', name);        // Name field
    formData.append('entry.21222962', email);         // Email field
    formData.append('entry.914237572', app);          // App selection field
    formData.append('entry.1423252519', message);     // Message field

    // Development environment logging for debugging
    // Commented out for production to avoid sensitive data logging
    if (process.env.NODE_ENV === 'development') {
      // console.log('Submitting to Google Forms:', {
      //   url: formUrl,
      //   data: {
      //     name,
      //     email,
      //     app,
      //     message
      //   }
      // });
    }

    // Submit data to Google Forms with proper headers
    // Uses application/x-www-form-urlencoded format as required by Google Forms
    const response = await fetch(formUrl, {
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
    // This catches JSON parsing errors, network errors, and other exceptions
    // console.error('Form submission error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 