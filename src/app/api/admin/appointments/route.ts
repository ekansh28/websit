import { NextRequest, NextResponse } from 'next/server';
import { getAllAppointments, updateAppointmentStatus, getAppointmentById } from '@/lib/appointments';
import { sendClientConfirmation, sendClientRejection } from '@/lib/whatsapp';

export async function GET() {
  try {
    const appointments = await getAllAppointments();
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { appointmentId, status } = await request.json();

    if (!appointmentId || !status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    // Get appointment details first
    const appointment = await getAppointmentById(appointmentId);
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Update status in database
    const updated = await updateAppointmentStatus(appointmentId, status);
    if (!updated) {
      return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
    }

    // Contact is already in +91xxxxxxxxxx format
    const clientPhone = appointment.contact;

    // Send WhatsApp notification to client
    try {
      const appointmentData = {
        name: appointment.name,
        contact: appointment.contact,
        service: appointment.service,
        timeSlot: appointment.timeSlot,
        date: appointment.date,
        appointmentId: appointment.appointmentId,
      };

      if (status === 'approved') {
        await sendClientConfirmation(clientPhone, appointmentData);
      } else {
        await sendClientRejection(clientPhone, appointmentData);
      }
    } catch (whatsappError) {
      console.error('WhatsApp notification failed:', whatsappError);
      // Don't fail the update if WhatsApp fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}