// Booking configuration
export const BOOKING_CONFIG = {
  // Time slot interval in minutes (60 = 1 hour, 30 = 30 minutes)
  TIME_SLOT_INTERVAL: 60,

  // Business hours
  START_HOUR: 9,   // 9 AM
  END_HOUR: 22,    // 10 PM (22:00)

  // Services available
  SERVICES: [
    "Hair Cut",
    "Spa",
    "Facial",
    "Hair Wash",
    "Hair Color",
    "Hair Treatment",
    "Wax",
    "Others"
  ],

  // WhatsApp Configuration
  ADMIN_PHONE: process.env.ADMIN_PHONE_NUMBER || '+919178544404',
  TEST_PHONE: '+15556531770' // Meta test number
};