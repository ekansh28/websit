import { getDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

export interface Appointment {
  _id?: ObjectId;
  appointmentId: string;
  name: string;
  contact: string;
  service: string;
  timeSlot: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeSlotAvailability {
  timeSlot: string;
  date: string;
  isAvailable: boolean;
}

export async function createAppointment(appointmentData: Omit<Appointment, '_id' | 'appointmentId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
  const db = await getDatabase();
  const collection = db.collection<Appointment>('appointments');

  const appointmentId = new ObjectId().toString();
  const appointment: Appointment = {
    ...appointmentData,
    appointmentId,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await collection.insertOne(appointment);
  return appointment;
}

export async function getAppointmentById(appointmentId: string): Promise<Appointment | null> {
  const db = await getDatabase();
  const collection = db.collection<Appointment>('appointments');

  return await collection.findOne({ appointmentId });
}

export async function updateAppointmentStatus(appointmentId: string, status: 'approved' | 'rejected'): Promise<boolean> {
  const db = await getDatabase();
  const collection = db.collection<Appointment>('appointments');

  const result = await collection.updateOne(
    { appointmentId },
    {
      $set: {
        status,
        updatedAt: new Date()
      }
    }
  );

  return result.modifiedCount > 0;
}

export async function checkTimeSlotAvailability(date: string, timeSlot: string): Promise<boolean> {
  const db = await getDatabase();
  const collection = db.collection<Appointment>('appointments');

  const existingAppointment = await collection.findOne({
    date,
    timeSlot,
    status: { $in: ['pending', 'approved'] }
  });

  return !existingAppointment;
}

export async function getAvailableTimeSlots(date: string): Promise<string[]> {
  // Generate 1-hour interval time slots
  const timeSlots = [];
  for (let hour = 9; hour < 22; hour++) {
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const period = hour >= 12 ? 'PM' : 'AM';
    timeSlots.push(`${displayHour}:00 ${period}`);
  }

  const db = await getDatabase();
  const collection = db.collection<Appointment>('appointments');

  // Get booked slots for the date
  const bookedSlots = await collection.find({
    date,
    status: { $in: ['pending', 'approved'] }
  }, {
    projection: { timeSlot: 1 }
  }).toArray();

  const bookedTimeSlots = bookedSlots.map(slot => slot.timeSlot);

  // Return only available slots
  return timeSlots.filter(slot => !bookedTimeSlots.includes(slot));
}

export async function getAllAppointments(limit: number = 50): Promise<Appointment[]> {
  const db = await getDatabase();
  const collection = db.collection<Appointment>('appointments');

  return await collection.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}

export async function getAppointmentsByDate(date: string): Promise<Appointment[]> {
  const db = await getDatabase();
  const collection = db.collection<Appointment>('appointments');

  return await collection.find({ date })
    .sort({ timeSlot: 1 })
    .toArray();
}

export async function getAppointmentsByStatus(status: 'pending' | 'approved' | 'rejected'): Promise<Appointment[]> {
  const db = await getDatabase();
  const collection = db.collection<Appointment>('appointments');

  return await collection.find({ status })
    .sort({ createdAt: -1 })
    .toArray();
}