import React from 'react'
import assets from '../assets'

export const Footer = () => (
  <>
    <footer className="hero-footer color-nav mt-5">
      <div className="columns has-text-centered is-vcentered">
        <div className="column has-text-left-desktop-only">
          <p>
            <mark>r1n1</mark>- Hic et ubique terrarum - ©{' '}
            {new Date().getFullYear()} | R1N1 LTD | UK
          </p>
        </div>
        <div className="column has-text-right-desktop-only">
          <p>
            <a href="tel:+447749161439" target="_new" title="Call Us">
              <img className="img" src={assets.phone} alt="Telephone" />
            </a>
            &nbsp;
            <a
              href="https://wa.link/r1n1com"
              target="_new"
              title="R1N1 on Whatsapp"
            >
              <img className="img" src={assets.whatsapp} alt="Whatsapp" />
            </a>
            &nbsp;
            <a
              href="https://www.twitter.com/r1n1com_"
              target="_new"
              title="R1N1 on Twitter"
            >
              <img className="img" src={assets.twitter} alt="Twitter" />
            </a>
            &nbsp;
            <a
              href="https://www.instagram.com/r1n1com"
              target="_new"
              title="R1N1 on Instagram"
            >
              <img className="img" src={assets.instagram} alt="Instagram" />
            </a>
            &nbsp;
            <a
              href="https://www.facebook.com/r1n1com"
              target="_new"
              title="R1N1 on Facebook"
            >
              <img className="img" src={assets.facebook} alt="Facebook" />
            </a>
            &nbsp;
            <a
              href="https://www.linkedin.com/company/r1n1com"
              target="_new"
              title="R1N1 on LinkedIn"
            >
              <img className="img" src={assets.linkedin} alt="LinkedIn" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  </>
)
