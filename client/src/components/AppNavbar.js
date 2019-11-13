import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'

class AppNavbar extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img width="5%" src="images/icon.jpg" alt="logo"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/log-out">Salir</Nav.Link>
            <Nav.Link href="/login">Accede</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default AppNavbar
