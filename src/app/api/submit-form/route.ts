import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, app, message } = await request.json();

    // GoogleフォームのURLとエントリーID
    const formUrl = `https://docs.google.com/forms/d/${process.env.NEXT_PUBLIC_GOOGLE_FORM}/formResponse`;
    const formData = new URLSearchParams();
    
    formData.append('entry.1179215924', name);
    formData.append('entry.21222962', email);
    formData.append('entry.914237572', app);
    formData.append('entry.1423252519', message);

    // 開発環境でのみログを出力
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

    // Googleフォームに送信
    const response = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (process.env.NODE_ENV === 'development') {
      // console.log('Google Forms response status:', response.status);
    }

    if (response.ok) {
      return NextResponse.json({ 
        success: true, 
        message: 'Form submitted successfully' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to submit form',
        status: response.status
      }, { status: 400 });
    }
  } catch (error) {
    // console.error('Form submission error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 