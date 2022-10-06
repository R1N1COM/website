import React from 'react'
import './navigationbar.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export const NavigationBar = () => (
  <>
    <Navbar className="color-nav" expand="lg">
      <Container fluid>
        <Navbar.Brand className="navItem t2" href="/">
          r1n1
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navItem t1" href="/InteractionFollowers">
              Interaction & Followers
            </Nav.Link>
            <Nav.Link className="navItem t1" href="/WebsiteDesigning">
              Website Designing
            </Nav.Link>
            <Nav.Link className="navItem t1" href="/DigitalMarketing">
              Digital Marketing
            </Nav.Link>
            <Nav.Link className="navItem t1" href="/ContentWriting">
              Content Writing
            </Nav.Link>
            <Nav.Link className="navItem t1" href="/AboutUs">
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
)
