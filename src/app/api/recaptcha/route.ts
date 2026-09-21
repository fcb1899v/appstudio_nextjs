// app/api/recaptcha/route.ts
import { NextResponse } from 'next/server';

/** Verifies a client reCAPTCHA token against Google's endpoint with the server secret.
 * Returns minimal error detail so failures reveal nothing useful to bots. */

// Server-only env var (no NEXT_PUBLIC_ prefix), so the secret never reaches the client bundle
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
