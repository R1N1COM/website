import React from 'react'

export const DigitalPriceList = () => (
  <>
    <div className="hero">
      <h1>Digital Marketing Service Package</h1>
    </div>
    <section className="hero is-fullheight mb-5">
      <div className="columns">
        <div className="column"></div>
        <div className="column">
          <table id="gold" className="table has-background-grey-light">
            <thead>
              <tr>
                <th className="has-text-centered">Gold </th>
              </tr>
            </thead>

            <tfoot>
              <tr>
                <th className="has-text-centered">
                  <button
                    className="button is-medium btn"
                    title="Click to Buy"
                    onClick={(event) =>
                      window.open(
                        'https://wa.me/p/7654822527892625/447749161439',
                      )
                    }
                  >
                    <span>£300</span>
                  </button>
                </th>
              </tr>
            </tfoot>

            <tbody>
              <tr>
                <th className="has-text-centered">
                  Especially <br />
                  <strong>Decent and Reliable</strong>
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  Configuring <strong>Web Server Security</strong>
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  Configuring <strong>Domain Name Security (DNSSEC)</strong>
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  <strong>Facebook Business</strong> Configuration
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  Configuring <strong>Instagram Shop</strong>
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  Configuring <strong>Google My Business</strong>
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  Linking <strong>Social Media Accounts</strong> to each other
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  Configuration of <strong>Shopify Website</strong>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="column"></div>
      </div>
    </section>
  </>
)
