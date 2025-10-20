'use server';

import { z } from 'zod';
import { createAppointment, checkTimeSlotAvailability } from '@/lib/appointments';
import { sendAdminNotification, type AppointmentData } from '@/lib/whatsapp';

const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string()
    .regex(/^[0-9]{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  service: z.string().min(1, { message: "Please select a service." }),
  timeSlot: z.string().min(1, { message: "Please select a time slot." }),
  date: z.string().min(1, { message: "Please select a date." }),
});

export type BookingState = {
  errors?: {
    name?: string[];
    contact?: string[];
    service?: string[];
    timeSlot?: string[];
    date?: string[];
  };
  message?: string | null;
  success?: boolean;
}

export async function bookAppointment(prevState: BookingState, formData: FormData): Promise<BookingState> {
  const validatedFields = bookingSchema.safeParse({
    name: formData.get('name'),
    contact: formData.get('contact'),
    service: formData.get('service'),
    timeSlot: formData.get('timeSlot'),
    date: formData.get('date'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Booking failed. Please check the fields.',
      success: false,
    };
  }

  const { name, contact, service, timeSlot, date } = validatedFields.data;

  // Add +91 prefix to the phone number
  const fullPhoneNumber = `+91${contact}`;

  try {
    // Check if the time slot is still available
    const isAvailable = await checkTimeSlotAvailability(date, timeSlot);
    if (!isAvailable) {
      return {
        message: 'Sorry, this time slot is no longer available. Please select another time.',
        success: false,
      };
    }

    // Create appointment in database
    const appointment = await createAppointment({
      name,
      contact: fullPhoneNumber,
      service,
      timeSlot,
      date,
    });

    // Prepare appointment data for WhatsApp notification
    const appointmentData: AppointmentData = {
      name,
      contact: fullPhoneNumber,
      service,
      timeSlot,
      date,
      appointmentId: appointment.appointmentId,
    };

    // Send WhatsApp notification to admin
    try {
      await sendAdminNotification(appointmentData);
    } catch (whatsappError) {
      console.error('WhatsApp notification failed:', whatsappError);
      // Don't fail the booking if WhatsApp fails
    }

    return {
      message: 'Appointment request submitted successfully! You will receive a WhatsApp confirmation once approved.',
      success: true,
    };
  } catch (error) {
    console.error('Booking error:', error);
    return {
      message: 'Failed to book appointment. Please try again.',
      success: false,
    };
  }
}
