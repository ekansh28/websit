# Salon Booking System Setup Guide

This guide will help you set up the complete salon booking system with MongoDB integration and WhatsApp notifications.

## Features Implemented

✅ **Time Slot Management**
- Configurable time intervals (currently set to 1-hour intervals)
- Real-time availability checking against MongoDB
- Automatic time slot blocking when booked

✅ **MongoDB Integration**
- Appointment storage and tracking
- Status management (pending, approved, rejected)
- Availability checking

✅ **WhatsApp Integration**
- Admin notifications with approval buttons
- Client confirmations and rejections
- Interactive button responses

✅ **Admin Dashboard**
- View all appointments
- Filter by status
- Manual approval/rejection with automatic client notifications

## Environment Setup

1. **MongoDB Configuration**
   - Database: `salon`
   - Collection: `appointments`
   - Connection string is already configured in `.env.local`

2. **WhatsApp API Configuration**
   - Access token is configured
   - Phone ID and Business Account ID are set
   - Webhook endpoint: `/api/webhook/whatsapp`

## Time Slot Configuration

You can modify the time slot intervals in `/src/lib/config.ts`:

```typescript
export const BOOKING_CONFIG = {
  // Change this to modify interval (60 = 1 hour, 30 = 30 minutes)
  TIME_SLOT_INTERVAL: 60,

  // Business hours
  START_HOUR: 9,   // 9 AM
  END_HOUR: 22,    // 10 PM
}
```

## Webhook Setup for WhatsApp

1. **Set up your webhook URL in Meta Developer Console:**
   ```
   https://yourdomain.com/api/webhook/whatsapp
   ```

2. **Verify Token:**
   ```
   salon_webhook_verify_2024
   ```

3. **Subscribe to webhook events:**
   - messages
   - message_reads

## How the System Works

### 1. **Booking Process**
1. User selects date and available time slot
2. System checks real-time availability
3. Appointment is stored in MongoDB with "pending" status
4. WhatsApp notification is sent to admin (+91 9178544404)

### 2. **Admin Approval Process**
1. Admin receives WhatsApp notification with Approve/Reject buttons
2. Admin clicks button or uses the admin dashboard at `/admin`
3. System updates appointment status in MongoDB
4. Client receives confirmation/rejection message on WhatsApp

### 3. **Available Time Slots**
- System generates time slots based on configuration
- Checks MongoDB for existing bookings
- Returns only available slots to frontend
- Updates in real-time as bookings are made

## Admin Dashboard

Access the admin dashboard at: `https://yourdomain.com/admin`

Features:
- View all appointments with filtering
- Manual approval/rejection
- Real-time status updates
- Automatic client notifications

## Database Schema

```typescript
interface Appointment {
  _id?: ObjectId;
  appointmentId: string;     // Unique appointment ID
  name: string;              // Client name
  contact: string;           // Client contact (phone/email)
  service: string;           // Selected service
  timeSlot: string;          // Time slot (e.g., "2:00 PM")
  date: string;              // Date (YYYY-MM-DD)
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

- `GET /api/available-slots?date=YYYY-MM-DD` - Get available time slots
- `GET /api/admin/appointments` - Get all appointments
- `PATCH /api/admin/appointments` - Update appointment status
- `POST /api/webhook/whatsapp` - WhatsApp webhook handler

## Testing

1. **Test Booking:**
   - Go to your website booking section
   - Fill out the form with valid information
   - Submit the booking

2. **Test WhatsApp Notifications:**
   - Check that admin receives notification at +91 9178544404
   - Test approval/rejection buttons
   - Verify client receives appropriate message

3. **Test Admin Dashboard:**
   - Visit `/admin`
   - Check that appointments appear
   - Test manual approval/rejection

## Configuration Notes

- **Phone Number Format:** The system automatically extracts phone numbers from contact fields
- **Time Zone:** Make sure your server time zone matches your business location
- **Rate Limiting:** Consider adding rate limiting for production use
- **Security:** Add authentication to the admin dashboard for production

## Troubleshooting

1. **WhatsApp Messages Not Sending:**
   - Check access token validity
   - Verify phone number format
   - Check Meta Developer Console for errors

2. **MongoDB Connection Issues:**
   - Verify connection string
   - Check network access to MongoDB Atlas
   - Ensure database name is correct

3. **Time Slots Not Updating:**
   - Check API endpoint responses
   - Verify MongoDB queries
   - Check browser console for errors

## Production Deployment

1. Add authentication to admin dashboard
2. Set up proper error logging
3. Configure rate limiting
4. Set up monitoring for WhatsApp API
5. Add backup strategy for MongoDB
6. Set up SSL certificate for webhook endpoint

## Support

For any issues or questions, check the application logs and ensure all environment variables are properly configured.