import React from 'react'

export const WebsitePriceList = () => (
  <>
    <div className="hero">
      <h1>Website Designing Service Package</h1>
    </div>
    <section className="hero is-fullheight mb-5">
      <div className="columns">
        <div className="column"></div>

        <div className="column">
          <table id="gold" className="table has-background-grey-light">
            <thead>
              <tr>
                <th className="has-text-centered">
                  Gold <br />
                </th>
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
                        'https://wa.me/p/7544519665620334/447749161439',
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
                  <strong>Designing for Real Performance & SEO</strong>
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  <strong>Performance</strong> 90+
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  <strong>Accessibility</strong> 90+
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  <strong>Best Practices</strong> 90+
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  <strong>SEO</strong> 90+
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  <strong>PWA</strong> (Progressive Web Application)
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  Only <strong>4 pages</strong> (Home Page, About Page, Contact
                  Page, Product Page)
                </th>
              </tr>
              <tr>
                <th className="has-text-centered">
                  Delivery <strong>within 15 days</strong>
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
