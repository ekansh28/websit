import { NextRequest, NextResponse } from 'next/server';
import { getAvailableTimeSlots } from '@/lib/appointments';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
    }

    const availableSlots = await getAvailableTimeSlots(date);
    return NextResponse.json(availableSlots);
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}