import { observer } from "mobx-react";
import React from "react";
import { Button, Alert, Row, Col, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { NotificationContainer, NotificationManager } from "react-notifications";

//Stores
import shopStore from "../stores/ShopStore";
import userStore from "../stores/userStore";
import navBarStore from "../stores/NavBarStore";

// Helpers
import { calcTotalPrice, getCartFromLocalStorage } from "../helper/util";

//Selfmade Components
import CartList from "../components/CartList";

//Styling
import "react-notifications/lib/notifications.css";
import "../../stylesheets/cart.css";

@observer
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.cartList = [];
  }

  createTransferData() {
    let transferCart = [];
    this.cartList.forEach((item) => {
      transferCart.push({ count: item.count, articleId: item.article.id });
    });
    let transferData = {
      user: userStore.userFromServer,
      cart: transferCart,
    };
    return transferData;
  }

  buyNow(e) {
    // Check if something is in the cart
    if (this.cartList.length <= 0) {
      return;
    }

    // Reduces data to id and count for the transfer
    shopStore.buyArticles(this.createTransferData());
    NotificationManager.success("Vielen Dank für ihren Einkauf!");
  }

  /**
   * Check if there exists a Cart in the LocalStorage
   */
  localStoreCheck() {
    this.cartList = shopStore.itemsInCart;
    let localStoreCart = getCartFromLocalStorage() ? getCartFromLocalStorage().cart : [];
    if (this.cartList.length < localStoreCart.length) {
      shopStore.refreshAmountInCart(localStoreCart.length);
      shopStore.refreshCart(localStoreCart);
      this.cartList = shopStore.itemsInCart;
    }
  }

  goToLogin() {
    navBarStore.setStatus("login");
    this.props.history.push("/login");
  }

  render() {
    this.localStoreCheck();

    let totalPrice = 0.0;
    if (this.cartList.length > 0) {
      totalPrice = calcTotalPrice(this.cartList);
    }

    console.log(this.cartList);
    // Split in Half for better displaying
    let cart = this.cartList.map((article) => <CartList itemAndAmount={article} isOrder={false} />);
    let leftSide;
    let rightSide;
    if (cart.length > 0) {
      let halfLength = Math.ceil(cart.length / 2);
      leftSide = cart.slice(0, halfLength);
      rightSide = cart.slice(halfLength, cart.length);
    } else {
      leftSide = (
        <p className='emptyCart'>
          Ihr Warenkorb
          <Icon.Cart /> ist derzeit leer!
        </p>
      );
    }

    return (
      <div>
        <NotificationContainer />
        <h4>
          Ihr Warenkorb
          <Icon.Cart />
        </h4>
        <Container>
          <Row>
            <Col sm={12} md={12} lg={6} xl={6}>
              {leftSide}
            </Col>
            <Col sm={12} md={12} lg={6} xl={6}>
              {rightSide}
            </Col>
          </Row>
        </Container>
        <hr />
        <div className='priceContainer'>
          <b>Gesamtpreis: {totalPrice} €</b>
          {userStore.userFromServer !== null ? (
            <Button className='buyNow' onClick={this.buyNow.bind(this)}>
              Jetzt Kaufen
            </Button>
          ) : (
            <Button className='buyNow' onClick={this.goToLogin.bind(this)}>
              Jetzt Kaufen
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Cart;
