import { NextRequest, NextResponse } from 'next/server';
import { getAppointmentById, updateAppointmentStatus } from '@/lib/appointments';
import { sendClientConfirmation, sendClientRejection } from '@/lib/whatsapp';

export async function GET(request: NextRequest) {
  // Verify webhook (required by Meta)
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // You should set a verify token in your environment variables
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'your_verify_token';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge);
  }

  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if it's a message webhook
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === 'messages') {
            const messages = change.value.messages;

            if (messages) {
              for (const message of messages) {
                // Handle interactive button responses
                if (message.type === 'interactive' && message.interactive.type === 'button_reply') {
                  const buttonId = message.interactive.button_reply.id;

                  if (buttonId.startsWith('approve_') || buttonId.startsWith('reject_')) {
                    const action = buttonId.startsWith('approve_') ? 'approve' : 'reject';
                    const appointmentId = buttonId.replace(/^(approve_|reject_)/, '');

                    await handleAppointmentAction(appointmentId, action);
                  }
                }
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleAppointmentAction(appointmentId: string, action: 'approve' | 'reject') {
  try {
    // Get appointment details
    const appointment = await getAppointmentById(appointmentId);
    if (!appointment) {
      console.error(`Appointment not found: ${appointmentId}`);
      return;
    }

    // Update appointment status
    const status = action === 'approve' ? 'approved' : 'rejected';
    const updated = await updateAppointmentStatus(appointmentId, status);

    if (!updated) {
      console.error(`Failed to update appointment status: ${appointmentId}`);
      return;
    }

    // Contact is already in +91xxxxxxxxxx format
    const clientPhone = appointment.contact;

    // Send confirmation or rejection to client
    if (action === 'approve') {
      await sendClientConfirmation(clientPhone, {
        name: appointment.name,
        contact: appointment.contact,
        service: appointment.service,
        timeSlot: appointment.timeSlot,
        date: appointment.date,
        appointmentId: appointment.appointmentId,
      });
    } else {
      await sendClientRejection(clientPhone, {
        name: appointment.name,
        contact: appointment.contact,
        service: appointment.service,
        timeSlot: appointment.timeSlot,
        date: appointment.date,
        appointmentId: appointment.appointmentId,
      });
    }

    console.log(`Appointment ${appointmentId} ${action}ed and client notified`);
  } catch (error) {
    console.error(`Error handling appointment action:`, error);
  }
}