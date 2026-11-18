'use client';

import { useState } from 'react';

type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

export function ContactForm() {
  const [state, setState] = useState<State>({ kind: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState({ kind: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState({
          kind: 'error',
          message: body.error ?? 'Your message wasn’t sent. Email info@r1n1.com instead.',
        });
        return;
      }
      form.reset();
      setState({ kind: 'sent' });
    } catch {
      setState({
        kind: 'error',
        message: 'Your message wasn’t sent because the connection dropped. Try again, or email info@r1n1.com.',
      });
    }
  }

  if (state.kind === 'sent') {
    return (
      <div className="form-done" role="status">
        <h3>Message sent</h3>
        <p>We have your details and will reply by email.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" autoComplete="name" required maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="email">Work email</label>
        <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} />
      </div>
      <div className="field">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" autoComplete="organization" maxLength={160} />
      </div>
      <div className="field">
        <label htmlFor="message">What should run itself?</label>
        <textarea id="message" name="message" rows={5} required maxLength={4000} />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="form-note">
        We use these details only to reply to you. See our <a href="/privacy">privacy notice</a>.
      </p>
      {state.kind === 'error' ? (
        <p className="form-error" role="alert">
          {state.message}
        </p>
      ) : null}
      <button className="btn" type="submit" disabled={state.kind === 'sending'}>
        {state.kind === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
