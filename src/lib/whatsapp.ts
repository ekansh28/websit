import axios from 'axios';

const WHATSAPP_API_URL = `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_ID}/messages`;

export interface AppointmentData {
  name: string;
  contact: string;
  service: string;
  timeSlot: string;
  date: string;
  appointmentId: string;
}

export async function sendAdminNotification(appointmentData: AppointmentData) {
  const message = {
    messaging_product: "whatsapp",
    to: process.env.ADMIN_PHONE_NUMBER,
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "🪒 New Appointment Request"
      },
      body: {
        text: `*New Booking Details:*\n\n📝 *Name:* ${appointmentData.name}\n📞 *Contact:* ${appointmentData.contact}\n✂️ *Service:* ${appointmentData.service}\n🕐 *Time:* ${appointmentData.timeSlot}\n📅 *Date:* ${appointmentData.date}\n\n*ID:* ${appointmentData.appointmentId}`
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: `approve_${appointmentData.appointmentId}`,
              title: "✅ Approve"
            }
          },
          {
            type: "reply",
            reply: {
              id: `reject_${appointmentData.appointmentId}`,
              title: "❌ Reject"
            }
          }
        ]
      }
    }
  };

  try {
    const response = await axios.post(WHATSAPP_API_URL, message, {
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
}

export async function sendClientConfirmation(clientPhone: string, appointmentData: AppointmentData) {
  const message = {
    messaging_product: "whatsapp",
    to: clientPhone,
    type: "text",
    text: {
      body: `✅ *Appointment Confirmed!*\n\nHello ${appointmentData.name},\n\nYour appointment has been confirmed:\n\n✂️ *Service:* ${appointmentData.service}\n🕐 *Time:* ${appointmentData.timeSlot}\n📅 *Date:* ${appointmentData.date}\n\nWe look forward to seeing you! 💇‍♀️✨`
    }
  };

  try {
    const response = await axios.post(WHATSAPP_API_URL, message, {
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending client confirmation:', error);
    throw error;
  }
}

export async function sendClientRejection(clientPhone: string, appointmentData: AppointmentData) {
  const message = {
    messaging_product: "whatsapp",
    to: clientPhone,
    type: "text",
    text: {
      body: `❌ *Appointment Update*\n\nHello ${appointmentData.name},\n\nWe're sorry, but your requested appointment for ${appointmentData.service} on ${appointmentData.date} at ${appointmentData.timeSlot} is not available.\n\nPlease visit our website to book another time slot. Thank you for understanding! 🙏`
    }
  };

  try {
    const response = await axios.post(WHATSAPP_API_URL, message, {
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending client rejection:', error);
    throw error;
  }
}