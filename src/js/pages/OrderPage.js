import React from "react";
import { observer } from "mobx-react";
import * as Icon from "react-bootstrap-icons";
import { Row, Col, Card, Spinner, Button, Accordion } from "react-bootstrap";

//Stores
import orderStore from "../stores/OrderStore";
import shopStore from "../stores/ShopStore";

//Selfmade Components
import CartList from "../components/CartList";

//Styling imports
import "../../stylesheets/order.css";

@observer
class OrderPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (orderStore.orders.length <= 0 || orderStore.orders === undefined) {
      orderStore.fetchOrders();
    }
    if (shopStore.articleList.length <= 0 || shopStore.articleList === undefined) {
      shopStore.fetchArticleList();
    }
  }

  render() {
    //TODO: get all articles with the needed ids and build same as in Cart
    let orderlist = orderStore.orders;
    let articleList = shopStore.articleList;

    if (articleList.length <= 0) {
      return <Spinner></Spinner>;
    }

    let doneList = [];
    for (const orderArticleList of orderlist) {
      let orderList = [];
      for (const orderArticle of orderArticleList) {
        if (orderArticle.datetime !== undefined) {
          let orderItemList = orderList.map((article) => (
            <CartList article={article} isOrder={true} />
          ));

          let totalPrice = 0.0;

          // Detect how to Calculate Price
          orderList.forEach((item) => {
            item.article.priceValue === "Kilopreis"
              ? (totalPrice += (item.article.price / 1000) * item.count)
              : (totalPrice += item.article.price * item.count);
          });

          // Round Price to 2 Digits
          let roundedtotalPriceString = totalPrice.toFixed(2);

          // Split in Half for better displaying
          let leftSide;
          let rightSide;
          if (orderItemList.length > 0) {
            let halfLength = Math.ceil(orderItemList.length / 2);
            leftSide = orderItemList.slice(0, halfLength);
            rightSide = orderItemList.slice(halfLength, orderItemList.length);
          }
          let accordion = (
            <Accordion>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey='0'>
                  {"Bestellung vom: " + orderArticle.datetime}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>
                    <Row>
                      <Col xs={6}>{leftSide}</Col>
                      <Col xs={6}>{rightSide}</Col>
                    </Row>{" "}
                    <hr />
                    <b>Gesamtpreis: {roundedtotalPriceString} €</b>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          );
          doneList.push(accordion);
        } else {
          let article = articleList.find((x) => x.id === orderArticle.productId);
          let count = orderArticle.productQuantity;
          orderList.push({ count, article });
        }
      }
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
