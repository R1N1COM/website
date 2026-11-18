import { NextResponse } from 'next/server';

// Messages are forwarded as JSON to CONTACT_WEBHOOK_URL (for example an n8n webhook
// that sends a Telegram alert and an email). Optional CONTACT_WEBHOOK_SECRET is sent
// as the X-R1N1-Secret header so the webhook can reject anything else.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'The form data was unreadable. Try again.' }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend success.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const message = clean(body.message, 4000);

  if (!name || !message) {
    return NextResponse.json({ error: 'Add your name and a few lines about the work.' }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: 'Enter an email address we can reply to.' }, { status: 400 });
  }

  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json(
      { error: 'The form isn’t connected yet. Email info@r1n1.com and we’ll pick it up there.' },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.CONTACT_WEBHOOK_SECRET
          ? { 'X-R1N1-Secret': process.env.CONTACT_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        source: 'r1n1.com',
        name,
        email,
        company,
        message,
        receivedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
  } catch {
    return NextResponse.json(
      { error: 'Your message wasn’t delivered. Email info@r1n1.com instead.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
