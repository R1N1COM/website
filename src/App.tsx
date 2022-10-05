import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { Test } from './Test'
import { NavigationBar } from './components/NavigationBar'
import { Footer } from './components/Footer'
import { InteractionFollowers } from './InteractionFollowers'
import { InteractionPriceList } from './InteractionPriceList'
import { WebsiteDesigning } from './WebsiteDesigning'
import { WebsitePriceList } from './WebsitePriceList'
import { DigitalMarketing } from './DigitalMarketing'
import { DigitalPriceList } from './DigitalPriceList'
import { ContentWriting } from './ContentWriting'
import { ContentPriceList } from './ContentPriceList'
import { AboutUs } from './AboutUs'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Test" element={<Test />} />
            <Route
              path="/InteractionFollowers"
              element={<InteractionFollowers />}
            />
            <Route
              path="/InteractionPriceList"
              element={<InteractionPriceList />}
            />
            <Route path="/WebsiteDesigning" element={<WebsiteDesigning />} />
            <Route path="/WebsitePriceList" element={<WebsitePriceList />} />
            <Route path="/DigitalMarketing" element={<DigitalMarketing />} />
            <Route path="/DigitalPriceList" element={<DigitalPriceList />} />
            <Route path="/ContentWriting" element={<ContentWriting />} />
            <Route path="/ContentPriceList" element={<ContentPriceList />} />
            <Route path="/AboutUs" element={<AboutUs />} />
          </Routes>
          <Footer />
        </Router>
      </React.Fragment>
    )
  }
}

export default App
