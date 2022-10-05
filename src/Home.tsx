import React from 'react'

export const Home = () => (
  <>
    <div className="hero">
      <h1>r1n1</h1>
    </div>
    <section className="hero is-fullheight-with-navbar mb-5">
      <div className="columns has-text-centered is-vcentered">
        <div className="column fadeLeftMini">
          <div className="block">
            <h2>Interaction & Followers</h2>
            <p>Social Media Interaction & Followers Service</p>
            <p>Give your social media a boost and take it to the next level.</p>
          </div>
          <div className="block">
            <h3>Website Designing</h3>
            <p>Website Designing Service</p>
            <p>
              Your website's design conveys a lot about your brand's success.
            </p>
          </div>
          <div className="block">
            <h4>Digital Marketing</h4>
            <p>Digital Marketing Service</p>
            <p>
              Internet Marketing Services That Have Been Proven to Boost Leads
              and Sales
            </p>
          </div>
          <div className="block">
            <h5>Content Writing</h5>
            <p>Content Writing Service</p>
            <p>
              Even though we've expanded into every facet of content marketing
              strategy, r1n1's professional content writing services remain its
              base.
            </p>
          </div>
        </div>

        <div className="column fadeRightMini">
          <h2>
            All your need about
            <mark>Social Media</mark>
          </h2>
          <p>Before getting to the start, Let's get to know each other well.</p>

          <button
            className="button is-medium btn"
            title="About Us"
            onClick={(event) => (window.location.href = '/AboutUs')}
          >
            About Us
          </button>
        </div>
      </div>
    </section>
  </>
)
