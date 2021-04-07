import React, { Component } from "react";
import { Navbar, Nav, Figure } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

// config
import config from "../../config/main.config";

//Helper imports
import { removeTokenFromStorage, getCartFromLocalStorage } from "../helper/util";

//Store imports
import shopStore from "../stores/ShopStore";
import userStore from "../stores/userStore";
import navBarStore from "../stores/NavBarStore";

//Style import
import "../../stylesheets/navbar.css";

@observer
class NavBar extends Component {
  constructor(props) {
    super(props);
    navBarStore.setStatus(
      window.location.hash.substring(2) ? window.location.hash.substring(2) : "home"
    );
  }

  componentDidMount() {
    let sessionCart = getCartFromLocalStorage();
    if (sessionCart !== null && shopStore.amountInCart === 0 && sessionCart.cart.length > 0) {
      shopStore.refreshAmountInCart(sessionCart.cart.length);
    }
  }

  handleItemClick(e) {
    navBarStore.setStatus(e);
  }

  render() {
    const { amountInCart } = shopStore;
    //has to be mentioned for reload of component
    const { status } = navBarStore;
    return (
      <Navbar className='navbar-all' variant='dark' expand='lg' fixed='top'>
        <Navbar.Brand>
          <Figure.Image className='logo' src={config.BASE_URL + "images/bioKumaButterfly2.png"} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav
            variant='pills'
            className='mr-auto'
            status='Home'
            onSelect={this.handleItemClick.bind(this)}
          >
            <Nav.Link as={Link} to='/home' active={status === "home"} eventKey='home'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/shop' active={status === "shop"} eventKey='shop'>
              Shop
            </Nav.Link>
            {userStore.userFromServer !== null &&
            (userStore.userFromServer.role === "supervisor" ||
              userStore.userFromServer.role === "admin") ? (
              <Nav.Link
                as={Link}
                to='/creation'
                active={status === "creation"}
                eventKey='creation'
                onSelect={this.handleItemClick.bind(this)}
              >
                Neues Prdoukt
              </Nav.Link>
            ) : (
              <div></div>
            )}
          </Nav>
          {userStore.userFromServer !== null &&
          (userStore.userFromServer.role === "supervisor" ||
            userStore.userFromServer.role === "admin") ? (
            <Nav variant='pills' className='justify-content-end'>
              <Nav.Link
                as={Link}
                to='/order/all'
                active={status === "orderall"}
                eventKey='orderall'
                onSelect={this.handleItemClick.bind(this)}
              >
                Alle Bestellungen
              </Nav.Link>
            </Nav>
          ) : (
            <div></div>
          )}
          {userStore.userFromServer !== null && userStore.userFromServer.role === "basic" ? (
            <Nav variant='pills' className='justify-content-end'>
              <Nav.Link
                as={Link}
                to='/order'
                active={status === "order"}
                eventKey='order'
                onSelect={this.handleItemClick.bind(this)}
              >
                Bestellungen
              </Nav.Link>
            </Nav>
          ) : (
            <div></div>
          )}
          <Nav
            variant='pills'
            className='justify-content-end'
            onSelect={this.handleItemClick.bind(this)}
          >
            <Nav.Link as={Link} to='/cart' active={status === "cart"} eventKey='cart'>
              <div>
                Im Warenkorb: {amountInCart}
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
              <Nav.Link as={Link} to='/login' active={status === "login"} eventKey='login'>
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
              <Nav.Link as={Link} to='/login' active={false} eventKey='login'>
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
