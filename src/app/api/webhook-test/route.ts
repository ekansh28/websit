import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Webhook test GET request received');
    console.log('URL:', request.url);
    console.log('Search params:', request.nextUrl.searchParams.toString());

    const searchParams = request.nextUrl.searchParams;
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    console.log('Mode:', mode);
    console.log('Token:', token);
    console.log('Challenge:', challenge);
    console.log('Expected token:', process.env.WHATSAPP_VERIFY_TOKEN);

    if (mode === 'subscribe' && token === 'salon_webhook_verify_2024') {
      console.log('Verification successful, returning challenge');
      return new NextResponse(challenge);
    }

    console.log('Verification failed');
    return NextResponse.json({
      error: 'Verification failed',
      mode,
      token,
      expected: 'salon_webhook_verify_2024'
    }, { status: 403 });
  } catch (error) {
    console.error('Webhook test error:', error);
    return NextResponse.json({
      error: 'Internal error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ status: 'POST test successful' });
}