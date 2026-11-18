import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy notice | R1N1',
  description: 'How R1N1 LTD handles the details you send through r1n1.com.',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <section className="section prose-page">
      <div className="wrap prose">
        <h1>Privacy notice</h1>
        <p>
          This notice covers r1n1.com. The site is run by R1N1 LTD, a company registered in England
          and Wales, company number 13218580, registered office 1a Langton Road, West Molesey,
          England, KT8 2HX. R1N1 LTD is the data controller for the details described here.
        </p>

        <h2>What we collect</h2>
        <p>
          When you use the contact form we receive your name, email address, company (if you give
          it) and your message. If you email us, we receive what you send. The site sets no
          advertising or tracking cookies.
        </p>

        <h2>Why we use it</h2>
        <p>
          We use your details only to reply to you and, if you ask, to discuss or provide our
          services. Our lawful basis is legitimate interests in responding to an enquiry, or steps
          taken at your request before entering into a contract.
        </p>

        <h2>Where it goes</h2>
        <p>
          Form messages pass through our website host and are emailed to our inbox by our email
          delivery provider, Resend. We do not sell your details or share them for marketing.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep enquiries for up to two years from our last contact with you, unless they become
          part of a contract, in which case we keep them as long as the law requires.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask to see, correct or delete the details we hold about you, or object to how we
          use them. Email <a href="mailto:info@r1n1.com">info@r1n1.com</a>. If you are unhappy with
          our answer you can complain to the Information Commissioner&rsquo;s Office at{' '}
          <a href="https://ico.org.uk">ico.org.uk</a>.
        </p>

        <p className="updated">Last updated 18 November 2026.</p>
      </div>
    </section>
  );
}
