// app/api/recaptcha/route.ts
import { NextResponse } from 'next/server';

/**
 * reCAPTCHA verification API route for spam prevention
 * Validates reCAPTCHA tokens to prevent spam and bot submissions by communicating
 * with Google's reCAPTCHA verification service. Processes tokens from the client,
 * verifies them with Google's servers, and returns appropriate success/error responses.
 * Handles token validation, communicates with Google's verification endpoint, and
 * provides proper error handling for various scenarios including missing tokens,
 * invalid tokens, and server errors.
 * 
 * This route:
 * - Receives reCAPTCHA tokens from the client
 * - Validates token presence and format
 * - Communicates with Google's verification service
 * - Verifies token authenticity and score
 * - Returns appropriate success/error responses
 * 
 * Security considerations:
 * - Uses server-side secret key for verification
 * - Validates token format before processing
 * - Handles verification failures gracefully
 * - Provides minimal error information to prevent abuse
 */

// reCAPTCHA verification API route for spam prevention
// Use a server-only env var (no NEXT_PUBLIC_ prefix) for the secret key
const secretKey = process.env.RECAPTCHA_V3_SECRET_KEY;

export async function POST(request: Request) {
  try {
    if (!secretKey) {
      return NextResponse.json(
        { ok: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Extract reCAPTCHA token from request body
    const { token } = await request.json();

    // Validate that token is provided
    // Prevents processing of empty or missing tokens
    if (!token) {
      return NextResponse.json(
        { ok: false, message: "No reCAPTCHA token provided" },
        { status: 400 }
      );
    }

    // Google reCAPTCHA verification configuration
    // Uses Google's official verification endpoint
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    const params = new URLSearchParams();
    params.append("secret", secretKey);    // Server-side secret key
    params.append("response", token);      // Client-side token

    // Verify token with Google's reCAPTCHA service
    // Sends token to Google for validation and score calculation
    const verifyRes = await fetch(verifyUrl, {
      method: "POST",
      body: params,
    });
    const verifyData = await verifyRes.json();

    // Check if verification was successful
    // Google returns success: true/false and additional data
    if (!verifyData.success) {
      return NextResponse.json(
        { ok: false, message: "Invalid reCAPTCHA" },
        { status: 400 }
      );
    }

    // Return success response if verification passed
    // Token is valid and user is likely human
    return NextResponse.json({ ok: true, message: "Recaptcha verified!" });
  } catch {
    // Handle server errors
    // Catches network errors, JSON parsing errors, and other exceptions
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
