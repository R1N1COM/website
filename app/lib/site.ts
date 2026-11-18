// Set NEXT_PUBLIC_BOOKING_URL in Vercel to your booking page (for example a Cal.com link).
// While it is unset, every "Book a call" button jumps to the contact form instead.
export const BOOKING_URL: string | undefined = process.env.NEXT_PUBLIC_BOOKING_URL || undefined;
