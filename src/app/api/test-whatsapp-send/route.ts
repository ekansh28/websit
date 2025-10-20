import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  const WHATSAPP_API_URL = `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_ID}/messages`;

  // Simple test message
  const message = {
    messaging_product: "whatsapp",
    to: process.env.ADMIN_PHONE_NUMBER,
    type: "text",
    text: {
      body: "🧪 Test message from salon booking system!"
    }
  };

  try {
    console.log('Testing WhatsApp API...');
    console.log('URL:', WHATSAPP_API_URL);
    console.log('Token length:', process.env.WHATSAPP_ACCESS_TOKEN?.length);
    console.log('To:', process.env.ADMIN_PHONE_NUMBER);

    const response = await axios.post(WHATSAPP_API_URL, message, {
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('WhatsApp API Success:', response.data);
    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('WhatsApp API Error:', error.response?.data || error.message);
    return NextResponse.json({
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status
    }, { status: 500 });
  }
}