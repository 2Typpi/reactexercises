import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { key: "Home" };
  }

  handleItemClick(e) {
    this.setState({
      key: e,
    });
  }

  render() {
    const { key } = this.state;
    return (
      <Navbar bg="dark" variant='dark' expand="lg">
        <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            variant='pills'
            className="mr-auto"
            activeKey="Home"
            onSelect={this.handleItemClick.bind(this)}
          >
            <Nav.Link as={Link} to='/home' active={key === 'Home'} eventKey='Home'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/shop' active={key === 'Shop'} eventKey='Shop'>
              Shop
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
