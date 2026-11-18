import { NextResponse } from 'next/server';

// Contact form → email via Resend (https://resend.com), sent from the verified r1n1.com domain.
//   RESEND_API_KEY  required
//   CONTACT_TO      inbox that receives enquiries (default info@r1n1.com)
//   CONTACT_FROM    sender (default "R1N1 website <website@r1n1.com>")
// Optional: CONTACT_WEBHOOK_URL also receives a JSON copy (for example an n8n workflow).

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'The form isn’t connected yet. Email info@r1n1.com and we’ll pick it up there.' },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO || 'info@r1n1.com';
  const from = process.env.CONTACT_FROM || 'R1N1 website <website@r1n1.com>';
  const subject = `New enquiry from ${name}${company ? `, ${company}` : ''}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || '-'}`,
    '',
    message,
    '',
    'Sent from the contact form on r1n1.com. Reply to this email to answer them.',
  ].join('\n');
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#14202b">
      <p style="margin:0 0 12px"><strong>New enquiry from r1n1.com</strong></p>
      <table cellpadding="0" cellspacing="0" style="margin:0 0 16px">
        <tr><td style="padding:2px 16px 2px 0;color:#4f5f6d">Name</td><td>${esc(name)}</td></tr>
        <tr><td style="padding:2px 16px 2px 0;color:#4f5f6d">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:2px 16px 2px 0;color:#4f5f6d">Company</td><td>${esc(company || '-')}</td></tr>
      </table>
      <p style="margin:0 0 6px;color:#4f5f6d">What should run itself?</p>
      <p style="margin:0;white-space:pre-wrap">${esc(message)}</p>
      <p style="margin:20px 0 0;color:#4f5f6d;font-size:13px">Reply to this email to answer them.</p>
    </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text, html }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text().catch(() => ''));
      throw new Error(`resend ${res.status}`);
    }
  } catch {
    return NextResponse.json(
      { error: 'Your message wasn’t delivered. Email info@r1n1.com instead.' },
      { status: 502 },
    );
  }

  // Optional JSON copy for automations; never blocks the visitor.
  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (hook) {
    await fetch(hook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.CONTACT_WEBHOOK_SECRET ? { 'X-R1N1-Secret': process.env.CONTACT_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({ source: 'r1n1.com', name, email, company, message, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(5_000),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
