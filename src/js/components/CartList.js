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
class CartList extends Component {
  constructor(props) {
    super(props);
    switch (props.itemAndAmount.article.priceValue) {
      case PriceValues.PIECE:
        props.itemAndAmount.article.priceValue = "Stückpreis";
        break;
      case PriceValues.WEIGH:
        props.itemAndAmount.article.priceValue = "Kilopreis";
        break;
    }
  }

  deleteFromCart(e) {
    shopStore.removeFromCart(this.props.itemAndAmount);
  }

  updateInput(e) {
    let number = Number.parseFloat(e.target.value);
    shopStore.updateAmountInCart(this.props.itemAndAmount.article, number);
  }

  // Create a component to display the amount whether for order page or the cart
  createCountComponent() {
    let component;
    let item = this.props.itemAndAmount.article;
    let amount = this.props.itemAndAmount.count;

    if (item.priceValue === "Kilopreis") {
      if (this.props.isOrder) {
        component = (
          <div>
            <b>{amount + "g"}</b>
          </div>
        );
      } else {
        component = (
          <InputGroup className='input-group-cart'>
            <FormControl type='number' value={amount} onChange={this.updateInput.bind(this)} />
            <InputGroup.Append>
              <InputGroup.Text variant='success'> g </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        );
      }
    } else {
      if (this.props.isOrder) {
        component = (
          <div>
            <b>{amount + " Stück"}</b>
          </div>
        );
      } else {
        component = (
          <InputGroup className='input-group-cart'>
            <FormControl type='number' value={amount} onChange={this.updateInput.bind(this)} />
            <InputGroup.Append>
              <InputGroup.Text variant='success'> Stück </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        );
      }
    }
    return component;
  }

  render() {
    let item = this.props.itemAndAmount.article;

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
            {this.props.isOrder ? (
              <div></div>
            ) : (
              <Row className='mediaItemButtons'>
                <Col xs={3}>
                  <Button variant='danger' size='sm' onClick={this.deleteFromCart.bind(this)}>
                    Entfernen
                  </Button>
                </Col>
              </Row>
            )}
          </Media.Body>
        </Media>
      </div>
    );
  }
}

export default CartList;
