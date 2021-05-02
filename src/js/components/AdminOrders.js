import { observer } from "mobx-react";
import React, { Component } from "react";
import { InputGroup, Figure, Button, Media, Row, Col, Accordion, Card } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

// config
import config from "../../config/main.config";

// Stores
import shopStore from "../stores/ShopStore";

//Selfmade Components
import { PriceValues } from "../helper/PriceValues";

// Style
import "../../stylesheets/cartList.css";

@observer
class AdminOrders extends Component {
  PIECE = "Stückpreis";
  WEIGH = "Kilopreis";

  constructor(props) {
    super(props);
  }

  createCountComponent() {
    let component = [];
    this.props.order.forEach((element) => {
      switch (element.priceValue) {
        case this.PIECE:
          element.priceValue = "Stk";
          break;
        case this.WEIGH:
          element.priceValue = "g";
          break;
        case PriceValues.PIECE:
          element.priceValue = "Stk";
          break;
        case PriceValues.WEIGH:
          element.priceValue = "g";
          break;
      }
      component.push(
        <Media>
          <Media.Body>
            {element.name} x{element.productQuantity}
            {element.priceValue}
          </Media.Body>
        </Media>
      );
    });
    return component;
  }

  render() {
    let boughtArticles = this.createCountComponent();

    return <div>{boughtArticles}</div>;
  }
}

export default AdminOrders;
