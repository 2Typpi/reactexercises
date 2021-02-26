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

//Style import
import "../../stylesheets/navbar.css";

@observer
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: window.location.hash.substring(2),
    };
  }

  componentDidMount() {
    let sessionCart = getCartFromLocalStorage();
    console.log(sessionCart);
    console.log(sessionCart.cart.length);
    console.log(shopStore.amountInCart);
    if (shopStore.amountInCart === 0 && sessionCart.cart.length > 0) {
      shopStore.refreshAmountInCart(sessionCart.cart.length);
      console.log(shopStore.amountInCart);
    }
  }

  // setState is needed to reload the component
  handleItemClick(e) {
    this.setState({
      key: e,
    });
  }

  render() {
    const { amountInCart } = shopStore;
    //has to be mentioned for reload of component
    const { key } = this.state;
    let activeKey = window.location.hash.substring(2);
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
            activeKey='Home'
            onSelect={this.handleItemClick.bind(this)}
          >
            <Nav.Link as={Link} to='/home' active={activeKey === "home"} eventKey='home'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/shop' active={activeKey === "shop"} eventKey='shop'>
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
                active={key === "order"}
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
            <Nav.Link as={Link} to='/cart' active={activeKey === "cart"} eventKey='Cart'>
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
              <Nav.Link as={Link} to='/login' active={activeKey === "login"} eventKey='Login'>
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
