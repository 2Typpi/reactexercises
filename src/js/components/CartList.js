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
    switch (props.article.article.priceValue) {
      case PriceValues.PIECE:
        props.article.article.priceValue = "Stückpreis";
        break;
      case PriceValues.WEIGH:
        props.article.article.priceValue = "Kilopreis";
        break;
    }
  }

  deleteFromCart(e) {
    shopStore.removeFromCart(this.props.article);
  }

  updateInput(e) {
    let number = Number.parseFloat(e.target.value);
    shopStore.updateAmountInCart(this.props.article.article, number);
  }

  createCountComponent() {
    let component;

    if (this.props.article.article.priceValue === "Kilopreis") {
      if (this.props.isOrder) {
        component = (
          <div>
            <b>{this.props.article.count + "g"}</b>
          </div>
        );
      } else {
        component = (
          <InputGroup className='input-group-cart'>
            <FormControl
              type='number'
              value={this.props.article.count}
              onChange={this.updateInput.bind(this)}
            />
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
            <b>{this.props.article.count + "Stück"}</b>
          </div>
        );
      } else {
        component = (
          <InputGroup className='input-group-cart'>
            <FormControl
              type='number'
              value={this.props.article.count}
              onChange={this.updateInput.bind(this)}
            />
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
    const countComponent = this.createCountComponent();

    return (
      <div>
        <Media className='mediaItem'>
          <Figure.Image
            className='cartImage'
            alt=''
            src={config.BASE_URL + "images/" + this.props.article.article.imgSrc + ".jpg"}
          />
          <Media.Body className='mediaBody'>
            <h4>{this.props.article.article.name}</h4>
            <Row>
              <Col xs={5} xl={6}>
                <strong>
                  {this.props.article.article.price + "€ " + this.props.article.article.priceValue}
                </strong>
              </Col>
              <Col xs={7} xl={6}>
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
