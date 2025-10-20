import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    phoneId: process.env.WHATSAPP_PHONE_ID,
    hasToken: !!process.env.WHATSAPP_ACCESS_TOKEN,
    tokenLength: process.env.WHATSAPP_ACCESS_TOKEN?.length,
    adminPhone: process.env.ADMIN_PHONE_NUMBER,
    apiUrl: `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_ID}/messages`
  });
}