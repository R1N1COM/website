# r1n1.com

Website for R1N1 LTD: automation and private AI for companies, proven on buyX and MMCC® | Mobile Mint Car Care.

Next.js (App Router) with three.js via React Three Fiber. `npm install`, then `npm run dev`.

## 3D

- `app/components/three/DayRing.tsx`: the hero. A 24-hour ring of buyX's 288 health checks, MMCC's 08:00/13:00/18:00 YouTube releases and the morning band, set to the current London time.
- `app/components/three/ServerScene.tsx`: the private server in "Your data stays with you". Scrolling pulls the network cable; the lights keep running.
- Both pause when off screen, hold still for visitors who prefer reduced motion, and fall back to the flat SVG ruler when WebGL is unavailable.
- Custom models (for example from Scenario's Blender plugin) go in `public/models/` as `.glb` and load with drei's `useGLTF`.

## Environment variables (set in Vercel)

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BOOKING_URL` | Booking page for "Book a call". Unset: the buttons jump to the contact form. |
| `CONTACT_WEBHOOK_URL` | Where contact-form messages are POSTed as JSON (for example an n8n webhook). Unset: the form tells visitors to email info@r1n1.com. |
| `CONTACT_WEBHOOK_SECRET` | Optional. Sent as the `X-R1N1-Secret` header so the webhook can reject anything else. |

The old site was an offline-cached app. `public/service-worker.js` and `ServiceWorkerCleanup` remove its worker and caches from returning visitors' browsers; old page paths redirect to `/`.
