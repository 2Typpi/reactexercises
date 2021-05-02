import React from "react";
import { observer } from "mobx-react";
import * as Icon from "react-bootstrap-icons";
import { Row, Col, Card, Spinner, Button, Accordion } from "react-bootstrap";

//Stores
import orderStore from "../stores/OrderStore";
import shopStore from "../stores/ShopStore";
import userStore from "../stores/userStore";

// Helpers
import { calcTotalPrice, dissolveProductIds } from "../helper/util";

//Selfmade Components
import UserOrder from "../components/UserOrder";

//Styling imports
import "../../stylesheets/order.css";

@observer
class OrderPage extends React.Component {
  orderList = [];

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (userStore.userFromServer !== null) {
      orderStore.fetchOrders();
    }
    if (shopStore.articleList.length <= 0 || shopStore.articleList === undefined) {
      shopStore.fetchArticleList();
    }
  }

  findOrderWithTimestamp(timestamp) {
    let orderWithTimestamp;
    for (orderWithTimestamp of this.orderList) {
      if (orderWithTimestamp.datetime === timestamp) {
        return orderWithTimestamp;
      }
    }
  }

  prepareDataForCart(orderWithTimestamp) {
    let cart = [];
    let articleList = dissolveProductIds(orderWithTimestamp.order);
    articleList.forEach((article) => {
      let count = article.productQuantity;
      console.log(article, count);
      cart.push({ count, article });
    });
    return cart;
  }

  reBuy(datetime) {
    let orderWithTimestamp = this.findOrderWithTimestamp(datetime);
    console.log(orderWithTimestamp.order);
    let newCart = this.prepareDataForCart(orderWithTimestamp);
    shopStore.refreshCart(newCart);
    shopStore.refreshAmountInCart(newCart.length);
  }

  render() {
    this.orderList = orderStore.orders;
    let articleList = shopStore.articleList;

    if (articleList.length <= 0 || this.orderList.length <= 0) {
      return <Spinner></Spinner>;
    }

    if (this.orderList.length <= 0) {
      return <p className='emptyCart'>Es existieren noch keine Bestellungen!</p>;
    }

    let doneList = [];
    for (const order of this.orderList) {
      let productList = dissolveProductIds(order.order);
      let list = [];
      for (const product of productList) {
        let listComponent = <UserOrder product={product} />;
        list.push(listComponent);
      }
      let totalPrice = calcTotalPrice(productList);

      let leftSide;
      let rightSide;
      if (list.length > 0) {
        let halfLength = Math.ceil(list.length / 2);
        leftSide = list.slice(0, halfLength);
        rightSide = list.slice(halfLength, list.length);
      }
      let accordion = (
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='0'>
              {"Bestellung vom: " + order.datetime}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                <Row>
                  <Col sm={12} md={12} lg={6} xl={6}>
                    {leftSide}
                  </Col>
                  <Col sm={12} md={12} lg={6} xl={6}>
                    {rightSide}
                  </Col>
                </Row>{" "}
                <hr />
                <b>Gesamtpreis: {totalPrice} €</b>
                <Button onClick={this.reBuy.bind(this, order.datetime)}>Nochmal Kaufen</Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      );
      doneList.push(accordion);
    }

    return (
      <div>
        <h4>Ihre Bestellungen</h4>
        {doneList}
      </div>
    );
  }
}

export default OrderPage;
