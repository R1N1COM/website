import Link from 'next/link';
import { BOOKING_URL } from '../lib/site';

export function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="R1N1 home">
      <svg viewBox="0 0 64 64" aria-hidden="true" className="wordmark-mark">
        <rect width="64" height="64" rx="12" fill="currentColor" />
        <rect x="12" y="14" width="10" height="36" fill="var(--paper)" />
        <rect x="27" y="14" width="25" height="10" fill="var(--signal)" />
        <rect x="27" y="29" width="17" height="10" fill="var(--teal)" />
        <rect x="27" y="44" width="9" height="6" fill="var(--paper)" />
      </svg>
      <span>R1N1</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Wordmark />
        <nav aria-label="Main">
          <ul>
            <li>
              <Link href="/#businesses">Our businesses</Link>
            </li>
            <li>
              <Link href="/#your-data">Your data</Link>
            </li>
            <li>
              <Link href="/#how-we-work">How we work</Link>
            </li>
          </ul>
        </nav>
        <a className="btn btn-small" href={BOOKING_URL ?? '/#contact'}>
          Book a call
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Wordmark />
          <p className="footer-line">
            Automation and private AI for companies.
            <br />
            <a href="mailto:info@r1n1.com">info@r1n1.com</a>
          </p>
        </div>
        <div className="legal">
          <p>
            R1N1 LTD is a company registered in England and Wales, company number 13218580.
            Registered office: 1a Langton Road, West Molesey, England, KT8 2HX.
          </p>
          <p>
            MMCC® | Mobile Mint Car Care is a trading name of R1N1 LTD:{' '}
            <a href="https://mobilemintcarcare.com">mobilemintcarcare.com</a>
          </p>
          <p className="footer-meta">
            <span>© {year} R1N1 LTD</span>
            <Link href="/privacy">Privacy notice</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
