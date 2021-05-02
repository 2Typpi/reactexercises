import { observer } from "mobx-react";
import React, { Component } from "react";
import { InputGroup, Figure, Button, Media, Row, Col, FormControl } from "react-bootstrap";
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
class UserOrder extends Component {
  constructor(props) {
    super(props);
    switch (props.product.priceValue) {
      case PriceValues.PIECE:
        props.product.priceValue = " Stück";
        break;
      case "Stückpreis":
        props.product.priceValue = " Stück";
        break;
      case PriceValues.WEIGH:
        props.product.priceValue = "g";
        break;
      case "Kilopreis":
        props.product.priceValue = "g";
        break;
    }
  }

  updateInput(e) {
    let number = Number.parseFloat(e.target.value);
    shopStore.updateAmountInCart(this.props.product, number);
  }

  // Create a component to display the amount whether for order page or the cart
  createCountComponent() {
    let component;
    let item = this.props.product;
    component = (
      <div>
        <b>{item.productQuantity + item.priceValue}</b>
      </div>
    );
    return component;
  }

  render() {
    let item = this.props.product;

    const countComponent = this.createCountComponent();

    return (
      <div>
        <Media className='mediaItem'>
          <Figure.Image
            className='cartImage'
            alt=''
            src={config.BASE_URL + "articleImages/" + item.imgSrc}
          />
          <Media.Body className='mediaBody'>
            <h4>{item.name}</h4>
            <Row>
              <Col xs={6} xl={6}>
                <strong>{item.price + "€ " + item.priceValue}</strong>
              </Col>
              <Col xs={6} xl={6}>
                {countComponent}
              </Col>
            </Row>
          </Media.Body>
        </Media>
      </div>
    );
  }
}

export default UserOrder;
