import React from 'react'
import assets from './assets'

export const NoMatch = () => (
  <>
    <div className="hero">
      <h1>Page Not Found / 404</h1>
    </div>
    <section className="hero is-fullheight mb-5">
      <div className="columns has-text-centered is-vcentered">
        <div className="column fadeLeftMini">
          <h2>
            It's <span className="fire">r1n1</span>
          </h2>
          <p>
            We are working with all our strength to keep up with the constantly
            renewed technology. While following these innovations, we need to
            leave some things behind. That's why you're on this page right now.
          </p>
          <p>
            We have learned very well that losers are those who give up. So
            never give up.
          </p>
          <p>
            While we're here, let's talk about the story of this site; The color
            of our name, <span className="fire">r1n1</span>, is the color of
            fire. It always represents enlightenment and progress. Other texts
            are in silver, protecting us from Vampires.
          </p>
          <p>And, Mithril is said to resemble silver highly.</p>
          <p>
            "<span className="fire">Not all those who wander are lost</span>"
          </p>
          <p>
            Sincerely, <span className="fire">r1n1</span>
          </p>
        </div>
        <div className="column fadeRightMini">
          <img
            src={assets.tolkien}
            alt="J.R.R. Tolkien"
            height="600px"
            width="400px"
          />
        </div>
      </div>
    </section>
  </>
)
