import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

//Helper imports
import { removeTokenFromStorage } from "../helper/util";

//Store imports
import shopStore from "../stores/ShopStore";
import userStore from "../stores/userStore";

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
            <Nav.Link as={Link} to='/home' active={key === "Home"} eventKey='Home'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/shop' active={key === "Shop"} eventKey='Shop'>
              Shop
            </Nav.Link>
          </Nav>
          {userStore.userFromServer === null ? (
            <div></div>
          ) : (
            <Nav variant='pills' className='justify-content-end'>
              <Nav.Link
                as={Link}
                to='/order'
                active={key === "Order"}
                eventKey='Order'
                onSelect={this.handleItemClick.bind(this)}
              >
                Bestellungen
              </Nav.Link>
            </Nav>
          )}
          <Nav
            variant='pills'
            className='justify-content-end'
            onSelect={this.handleItemClick.bind(this)}
          >
            <Nav.Link as={Link} to='/cart' active={key === "Cart"} eventKey='Cart'>
              <div>
                Items in Cart: {amountInCart}
                <Icon.Cart />
              </div>
            </Nav.Link>
          </Nav>
          {userStore.userFromServer === null ? (
            <Nav
              variant='pills'
              className='justify-content-end'
              onSelect={this.handleItemClick.bind(this)}
            >
              <Nav.Link as={Link} to='/login' active={key === "Login"} eventKey='Login'>
                Login
              </Nav.Link>
            </Nav>
          ) : (
            <Nav
              variant='pills'
              className='justify-content-end'
              onSelect={() => {
                removeTokenFromStorage();
                userStore.user = null;
                this.setState({});
              }}
            >
              <Nav.Link as={Link} to='/login' active={false} eventKey='Login'>
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
