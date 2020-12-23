import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

//Store imports
import shopStore from "../stores/ShopStore";

@observer
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "Home",
    };
  }

  handleItemClick(e) {
    this.setState({
      key: e,
    });
  }

  render() {
    const { amountInCart } = shopStore;
    const { key } = this.state;
    return (
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Navbar.Brand>My Own Store</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav
            variant='pills'
            className='mr-auto'
            activeKey='Home'
            onSelect={this.handleItemClick.bind(this)}
          >
            <Nav.Link
              as={Link}
              to='/home'
              active={key === "Home"}
              eventKey='Home'
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to='/shop'
              active={key === "Shop"}
              eventKey='Shop'
            >
              Shop
            </Nav.Link>
          </Nav>
          <Nav
            variant='pills'
            className='justify-content-end'
            onSelect={this.handleItemClick.bind(this)}
          >
            <Nav.Link
              as={Link}
              to='/cart'
              active={key === "Cart"}
              eventKey='Cart'
            >
              <a>Items in Cart: {amountInCart} </a>
              <Icon.Cart />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
