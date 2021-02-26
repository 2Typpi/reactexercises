import { observer } from "mobx-react";
import React from "react";
import { Button, Alert, Row, Col, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

//Stores
import shopStore from "../stores/ShopStore";
import userStore from "../stores/userStore";

// Helpers
import { calcTotalPrice, getCartFromLocalStorage } from "../helper/util";

//Selfmade Components
import CartList from "../components/CartList";

//Styling
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
  }

  toggleToast(e) {
    shopStore.toggleBoughtToast(false);
  }

  localStoreCheck() {
    this.cartList = shopStore.itemsInCart;
    let localStoreCart = getCartFromLocalStorage().cart;
    if (this.cartList.length < localStoreCart.length) {
      console.log("use Session");
      shopStore.refreshAmountInCart(localStoreCart.length);
      shopStore.refreshCart(localStoreCart);
      this.cartList = shopStore.itemsInCart;
    }
  }

  render() {
    this.localStoreCheck();

    let totalPrice = 0.0;
    if (this.cartList.length > 0) {
      totalPrice = calcTotalPrice(this.cartList);
    }
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
            <Button className='buyNow' href='#login'>
              Jetzt Kaufen
            </Button>
          )}
        </div>
        {shopStore.boughtToast ? (
          <Alert variant='success' dismissible={true} onClose={this.toggleToast.bind(this)}>
            Vielen Dank für ihren Einkauf!
          </Alert>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Cart;
