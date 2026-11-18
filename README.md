# r1n1.com

Website for R1N1 LTD: automation and private AI for companies, proven on buyX and MMCC® | Mobile Mint Car Care.

Next.js (App Router) with three.js via React Three Fiber. `npm install`, then `npm run dev`.

## 3D

One full-screen three.js world (`app/components/three/World.tsx`) sits behind the page. Sections marked `data-chapter` move the camera through it as you scroll:

0. The day: a 24-hour ring of buyX's 288 health checks and MMCC's 08:00/13:00/18:00 YouTube releases, set to the current London time.
1. Your data: a private server whose network cable is pulled as you scroll; its lights keep running.
2. buyX: around 20 automations orbiting one marketplace, inside the rules it never crosses.
3. MMCC: one Instagram post fanning out to the car count and water report, YouTube, TikTok, Google Business and the booking page.

It pauses when you scroll past the story or the tab is hidden, holds still for reduced-motion visitors and is skipped without WebGL. Custom models (for example from Scenario's Blender plugin) can go in `public/models/` as `.glb` and load with drei's `useGLTF`.

## Environment variables (set in Vercel)

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BOOKING_URL` | Booking page for "Book a call". Unset: the buttons jump to the contact form. |
| `CONTACT_WEBHOOK_URL` | Where contact-form messages are POSTed as JSON (for example an n8n webhook). Unset: the form tells visitors to email info@r1n1.com. |
| `CONTACT_WEBHOOK_SECRET` | Optional. Sent as the `X-R1N1-Secret` header so the webhook can reject anything else. |

The old site was an offline-cached app. `public/service-worker.js` and `ServiceWorkerCleanup` remove its worker and caches from returning visitors' browsers; old page paths redirect to `/`.
