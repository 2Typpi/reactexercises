import { observer } from "mobx-react";
import React from "react";
import { Button, Alert, Row, Col, Container } from "react-bootstrap";

//Stores
import shopStore from "../stores/ShopStore";
import userStore from "../stores/userStore";

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

  render() {
    this.cartList = shopStore.itemsInCart;

    let totalPrice = 0.0;

    // Detect how to Calculate Price
    this.cartList.forEach((item) => {
      item.article.priceValue === "Kilopreis"
        ? (totalPrice += (item.article.price / 1000) * item.count)
        : (totalPrice += item.article.price * item.count);
    });

    // Round Price to 2 Digits
    let roundedtotalPriceString = totalPrice.toFixed(2);

    // Split in Half for better displaying
    let cart = this.cartList.map((article) => <CartList article={article} isOrder={false} />);
    let leftSide;
    let rightSide;
    if (cart.length > 0) {
      let halfLength = Math.ceil(cart.length / 2);
      leftSide = cart.slice(0, halfLength);
      rightSide = cart.slice(halfLength, cart.length);
    }

    return (
      <div>
        <h4>Ihr Warenkorb</h4>
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
          <b>Gesamtpreis: {roundedtotalPriceString} €</b>
          {userStore.userFromServer !== null ? (
            <Button className='buyNow' variant='dark' onClick={this.buyNow.bind(this)}>
              Jetzt Kaufen
            </Button>
          ) : (
            <Button className='buyNow' href='#/login' variant='dark'>
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
