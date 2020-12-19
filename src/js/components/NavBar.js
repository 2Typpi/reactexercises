import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

//Component imports
import ShoppingCart from "./ShoppingCart";

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
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>My Own Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            variant="pills"
            className="mr-auto"
            activeKey="Home"
            onSelect={this.handleItemClick.bind(this)}
          >
            <Nav.Link
              as={Link}
              to="/home"
              active={key === "Home"}
              eventKey="Home"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/shop"
              active={key === "Shop"}
              eventKey="Shop"
            >
              Shop
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="justify-content-end">
          <NavDropdown title={"Items in Cart: " + amountInCart}>
            <ShoppingCart />
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
