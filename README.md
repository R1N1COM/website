# r1n1.com

Website for R1N1 LTD: automation and private AI for companies, proven on buyX and MMCC® | Mobile Mint Car Care.

Next.js (App Router). `npm install`, then `npm run dev`.

## Environment variables (set in Vercel)

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BOOKING_URL` | Booking page for "Book a call". Unset: the buttons jump to the contact form. |
| `CONTACT_WEBHOOK_URL` | Where contact-form messages are POSTed as JSON (for example an n8n webhook). Unset: the form tells visitors to email info@r1n1.com. |
| `CONTACT_WEBHOOK_SECRET` | Optional. Sent as the `X-R1N1-Secret` header so the webhook can reject anything else. |

The old site was an offline-cached app. `public/service-worker.js` and `ServiceWorkerCleanup` remove its worker and caches from returning visitors' browsers; old page paths redirect to `/`.
