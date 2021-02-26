import React, { Component } from "react";
import { Card, Button, Toast, InputGroup, FormControl } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { observer } from "mobx-react";

//config
import config from "../../config/main.config";

//Stores
import shopStore from "../stores/ShopStore";

//Selfmade Components
import { PriceValues } from "../helper/PriceValues";

//Style Import
import "../../stylesheets/card.css";

@observer
class ArticleCard extends Component {
  constructor(props) {
    super(props);
    switch (props.article.priceValue) {
      case PriceValues.PIECE:
        props.article.priceValue = "Stückpreis";
        break;
      case PriceValues.WEIGH:
        props.article.priceValue = "Kilopreis";
        break;
    }
    this.state = { articleAmount: 0, showToast: false };
  }

  updateInput(e) {
    let number = Number.parseFloat(e.target.value);
    this.setState({ articleAmount: number });
  }

  putIntoCart(e) {
    let amount = this.state.articleAmount;
    if (amount > 0) {
      shopStore.addToShoppingCart(amount, this.props.article);
    } else {
      shopStore.toggleCartToast(true);
    }
  }

  render() {
    // Prepare price
    let priceDisplay = this.props.article.price.toFixed(2);
    let item = this.props.article;
    return (
      <div>
        <Card className='card-box'>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Img src={config.BASE_URL + "images/" + item.imgSrc + ".jpg"} />
            {item.priceValue === "Kilopreis" ? (
              <InputGroup>
                <FormControl
                  className='amountInputWeigh'
                  type='number'
                  placeholder='100'
                  onChange={this.updateInput.bind(this)}
                />
                <InputGroup.Append>
                  <InputGroup.Text variant='success'> g </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            ) : (
              <InputGroup>
                <FormControl
                  className='amountInputPiece'
                  type='number'
                  placeholder='1'
                  onChange={this.updateInput.bind(this)}
                />
                <InputGroup.Append>
                  <InputGroup.Text variant='success'> Stück </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            )}
            <div className='price-box'>
              <b>{priceDisplay + "€ " + item.priceValue}</b>

              <Button className='cart-button' onClick={this.putIntoCart.bind(this)}>
                <Icon.Cart />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ArticleCard;
