import { DayKey, DaySvg } from './components/Day';
import { HeroDay } from './components/three/HeroDay';
import { Unplug } from './components/three/Unplug';
import { ContactForm } from './components/ContactForm';
import { BOOKING_URL } from './lib/site';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <h1>We build businesses that run themselves.</h1>
              <p className="lede">
                The system does the routine work, watches itself, and brings people only the
                exceptions. We built two businesses this way. This is their day.
              </p>
              <div className="hero-actions">
                <a className="btn" href={BOOKING_URL ?? '#contact'}>
                  Book a call
                </a>
                <a className="link" href="#businesses">
                  See the two businesses
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <HeroDay fallback={<DaySvg />} />
            </div>
          </div>
          <DayKey />
        </div>
      </section>

      <section id="your-data" className="band band-ink" aria-labelledby="your-data-title">
        <div className="wrap split">
          <div>
            <h2 id="your-data-title">Your data stays with you</h2>
            <p className="lede-sm">
              Security comes first in everything we build. Where data must not leave the building,
              the whole system runs on a dedicated machine with its own AI model, and it works with
              the internet unplugged.
            </p>
            <Unplug />
          </div>
          <dl className="facts">
            <div>
              <dt>A private server</dt>
              <dd>
                The automation and the AI model run on one machine, dedicated to you and placed where
                you decide. Nothing is processed on a public AI service.
              </dd>
            </div>
            <div>
              <dt>A model taught on your work</dt>
              <dd>
                It learns your documents, tone and rules, and that knowledge stays on the server.
              </dd>
            </div>
            <div>
              <dt>Offline by design</dt>
              <dd>
                Your data never leaves the machine. It connects out only where you choose, such as
                publishing a post.
              </dd>
            </div>
            <div>
              <dt>Privacy as a habit</dt>
              <dd>
                Automation, monitoring and backups run on servers under our control, and personal
                details are stripped before anything reaches an outside service.
              </dd>
            </div>
          </dl>
          <p className="proof">
            <strong>Proven, not promised.</strong> Before a private system goes live, we unplug the
            network cable in front of you and run it.
          </p>
        </div>
      </section>

      <section id="businesses" aria-labelledby="businesses-title" className="section">
        <div className="wrap">
          <h2 id="businesses-title" className="section-title">
            Two businesses we built, and run
          </h2>

          <article className="case" aria-labelledby="buyx-title">
            <header className="case-head">
              <h3 id="buyx-title">buyX</h3>
              <p>
                A UK online marketplace with its own magazine, built in about a week to run without
                staff. Pre-launch: the pages are public at{' '}
                <a href="https://buyx.day">buyx.day</a>; sign-up and payments are not open yet.
              </p>
              <ul className="stats" aria-label="buyX in numbers">
                <li>
                  <b>~20</b> automations running today
                </li>
                <li>
                  <b>140</b> automated tests guard its rules
                </li>
                <li>
                  <b>5 min</b> between health checks
                </li>
              </ul>
            </header>

            <div className="case-body">
              <div>
                <h4>What runs itself</h4>
                <ul className="items">
                  <li>
                    <strong>The magazine writes itself.</strong> Each issue is researched from live
                    sources, and a fact stays only if its exact quote is found in the source. Seven
                    checks, then it publishes on schedule and checks its own live page.
                  </li>
                  <li>
                    <strong>Search engines hear within the hour.</strong> Every new or changed page is
                    announced, and every page is audited each morning.
                  </li>
                  <li>
                    <strong>Photos become a listing.</strong> A seller takes pictures; the system fills
                    18 fields and shows which photo each fact came from.
                  </li>
                  <li>
                    <strong>Offers are answered at any hour</strong> by fixed rules, never below the
                    seller&rsquo;s private minimum.
                  </li>
                  <li>
                    <strong>One sender for every message.</strong> App alerts, email and WhatsApp, with
                    quiet hours and daily limits.
                  </li>
                  <li>
                    <strong>A rehearsal every morning.</strong> A test seller lists a test item and the
                    system runs 14 checks on itself.
                  </li>
                </ul>
              </div>

              <div>
                <h4>It heals itself</h4>
                <ul className="items">
                  <li>
                    <strong>A bad release is undone.</strong> The last working version goes back, and
                    the live site is checked again. Tested on the live magazine on 10 November 2026.
                  </li>
                  <li>
                    <strong>Stuck work is sent again</strong> every 10 minutes. A magazine issue that
                    fails its checks is skipped, never published.
                  </li>
                  <li>
                    <strong>Silence is an alarm.</strong> A backup that does not report in raises one.
                  </li>
                  <li>
                    <strong>Something watches the watcher.</strong> Two outside monitors check that the
                    automation itself is alive.
                  </li>
                  <li>
                    <strong>One calm voice.</strong> The owners hear about a failure once, and
                    &ldquo;all clear&rdquo; once.
                  </li>
                </ul>

                <h4>The lines it never crosses</h4>
                <ul className="items items-rule">
                  <li>No AI sets a price, a refund, a payout or a ban. Money follows fixed rules.</li>
                  <li>Appeals and bans always go to a person.</li>
                </ul>
              </div>
            </div>

            <p className="status">
              <strong>Where it stands:</strong> listing, offers and WhatsApp are built and waiting for
              sign-up to open. Payments, orders and disputes are designed, not built.
            </p>
          </article>

          <article className="case" aria-labelledby="mmcc-title">
            <header className="case-head">
              <h3 id="mmcc-title">MMCC® | Mobile Mint Car Care</h3>
              <p>
                A waterless mobile car care business in Surrey and London. The marketing, reporting and
                admin run themselves. See it at{' '}
                <a href="https://mobilemintcarcare.com">mobilemintcarcare.com</a>.
              </p>
              <ul className="stats" aria-label="MMCC in numbers">
                <li>
                  <b>1,700+</b> cars cleaned
                </li>
                <li>
                  <b>£0</b> advertising spend
                </li>
                <li>
                  <b>0</b> people in marketing
                </li>
              </ul>
            </header>

            <div className="case-body">
              <div>
                <h4>One video sets everything off</h4>
                <p className="body-note">
                  Each cleaned car is filmed once and posted to Instagram. From that single post, with
                  nobody touching anything:
                </p>
                <ol className="chain">
                  <li>The car is added to the official count and the water-saved report that corporate clients see.</li>
                  <li>The video is republished on YouTube at 08:00, 13:00 and 18:00 with freshly written titles and descriptions.</li>
                  <li>TikTok and Google Business versions arrive on the phone, ready to post with one tap.</li>
                  <li>The clip is filed against its service, so customers watch real jobs on the booking page.</li>
                </ol>
              </div>

              <div>
                <h4>Running in the background</h4>
                <ul className="items">
                  <li>Three blog articles a week are drafted and queued for approval.</li>
                  <li>New business leads are found and qualified daily, with a summary sent each morning.</li>
                  <li>A number plate alone is enough to price a car and read its MOT history for likely failures.</li>
                  <li>An AI assistant handles the diary and content on request.</li>
                </ul>

                <h4>A dashboard for every customer</h4>
                <ul className="items">
                  <li>
                    <strong>ESG tracking.</strong> Water saved and cars cleaned, ready for a
                    company&rsquo;s sustainability reporting.
                  </li>
                  <li>
                    <strong>MOT history for each car</strong>, read from its number plate.
                  </li>
                  <li>
                    <strong>Advice for that exact car</strong>, tailored to its make and model and drawn
                    from its MOT record.
                  </li>
                </ul>
              </div>
            </div>

            <div className="hard">
              <h4>Why it was hard</h4>
              <ul className="items">
                <li>
                  <strong>None of these platforms talk to each other.</strong> Every connection had to
                  be built by hand.
                </li>
                <li>
                  <strong>Each platform has its own rules.</strong> Where full automation is forbidden,
                  the system does the work and leaves one tap for a human.
                </li>
                <li>
                  <strong>Nothing may repeat.</strong> Every title and caption is written fresh, so
                  1,700 cars never read like copy and paste.
                </li>
                <li>
                  <strong>Things break silently.</strong> An AI service was retired overnight and posts
                  stopped; now any failure sends an alert to the phone.
                </li>
                <li>
                  <strong>Tiny faults cause real damage.</strong> A spreadsheet quietly rounded a long ID
                  number and the same video went out twice. Finding that took far longer than fixing it.
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section id="how-we-work" className="section section-tint" aria-labelledby="how-title">
        <div className="wrap">
          <h2 id="how-title" className="section-title">
            How we work
          </h2>
          <ol className="steps">
            <li>
              <h3>Call</h3>
              <p>
                Tell us which routine work eats your week. We tell you plainly what can run itself and
                what should stay with a person.
              </p>
            </li>
            <li>
              <h3>Map</h3>
              <p>
                We trace the work end to end: where it starts, which systems it touches, and the lines
                it must never cross.
              </p>
            </li>
            <li>
              <h3>Build</h3>
              <p>
                We build it on your server or ours, with tests for every rule and an alarm for every
                failure.
              </p>
            </li>
            <li>
              <h3>Prove</h3>
              <p>
                It runs in front of you before it goes live. For private systems, with the network
                cable unplugged.
              </p>
            </li>
            <li>
              <h3>Watch</h3>
              <p>
                After launch it checks itself, undoes bad releases and tells you about a failure once,
                and &ldquo;all clear&rdquo; once.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section id="contact" className="section" aria-labelledby="contact-title">
        <div className="wrap split contact">
          <div>
            <h2 id="contact-title">Tell us what should run itself</h2>
            <p className="lede-sm">
              Book a 30-minute call, or send a few lines about the work you want off your plate.
            </p>
            {BOOKING_URL ? (
              <p>
                <a className="btn" href={BOOKING_URL}>
                  Book a call
                </a>
              </p>
            ) : null}
            <p className="contact-mail">
              Or email <a href="mailto:info@r1n1.com">info@r1n1.com</a>
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
