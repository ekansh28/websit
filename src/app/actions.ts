'use server';

import { z } from 'zod';

const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().min(5, { message: "Please enter valid contact details." }),
  service: z.string().min(1, { message: "Please select a service." }),
  timeSlot: z.string().min(1, { message: "Please select a time slot." }),
});

export type BookingState = {
  errors?: {
    name?: string[];
    contact?: string[];
    service?: string[];
    timeSlot?: string[];
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
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Booking failed. Please check the fields.',
      success: false,
    };
  }
  
  // Here you would typically save the data to a database.
  // For this example, we'll just log it.
  console.log('New Appointment Booked:', validatedFields.data);

  return {
    message: 'Appointment booked successfully! We will contact you shortly to confirm.',
    success: true,
  };
}
