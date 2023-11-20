import React from "react";

export const Home = () => (
  <>
    <section className="hero is-fullheight-with-navbar mb-5">
      <div className="columns has-text-centered is-vcentered">
        <div className="column fadeLeftMini">
          <div className="block">
            <h2>Expanding Our Horizons: Introducing Mobile Mint Car Care</h2>
            <p>
              R1N1 LTD, known for its innovative digital solutions, is excited
              to venture into a new realm with the introduction of Mobile Mint
              Car Care – a pioneering waterless car wash service.
            </p>
            <p>
              In our journey with digital marketing, website design, and content
              creation, we've always strived to push boundaries. Today, we're
              bringing the same ethos of innovation and quality to the
              automotive care industry.
            </p>
          </div>
          <div className="block">
            <h3>Why Choose Mobile Mint Car Care?</h3>
            <p>
              Eco-Friendly Approach: Our waterless car wash technology is
              environmentally friendly, conserving water while ensuring your
              vehicle shines.
            </p>
            <p>
              Convenience at Your Doorstep: We understand the value of your
              time. Our mobile service comes to you, whether at work or home.
            </p>
            <p>
              Unmatched Quality: Leveraging the expertise of our trained
              professionals, we guarantee a showroom-quality finish for your
              vehicle.
            </p>
          </div>
          <div className="block">
            <h4>Ready to Experience the Difference?</h4>
            <p>
              Visit{" "}
              <a href="https://mobilemintcarcare.com">
                Mobile Mint Car Care's website
              </a>{" "}
              to book your service or learn more about our revolutionary
              approach to car care.
            </p>
            <p>
              At R1N1, we're not just adapting to the future; we're creating it.
              Join us on this exciting journey.
            </p>
          </div>
        </div>

        <div className="column fadeRightMini">
          <h2>
            All your need about <br />
            <span className="fire">Social Media</span>
          </h2>
          <p>Before getting to the start, Let's get to know each other well.</p>

          <button
            className="button is-medium btn"
            title="About Us"
            onClick={(event) => (window.location.href = "/AboutUs")}
          >
            About Us
          </button>
        </div>
      </div>
    </section>
  </>
);
