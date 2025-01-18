// app/api/recaptcha/route.ts
import { NextResponse } from 'next/server';

const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY!;

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "No reCAPTCHA token provided" },
        { status: 400 }
      );
    }

    // reCAPTCHA
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", token);

    const verifyRes = await fetch(verifyUrl, {
      method: "POST",
      body: params,
    });
    const verifyData = await verifyRes.json();
    console.log("verifyData:", verifyData);

    if (!verifyData.success) {
      return NextResponse.json(
        { ok: false, message: "Invalid reCAPTCHA" },
        { status: 400 }
      );
    }

    // Successful response
    return NextResponse.json({ ok: true, message: "Recaptcha verified!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
