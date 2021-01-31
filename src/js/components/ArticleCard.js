import React, { Component } from "react";
import { Card, Button, Toast } from "react-bootstrap";
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
    switch (props.articleCardList.priceValue) {
      case PriceValues.PIECE:
        props.articleCardList.priceValue = "Stückpreis";
        break;
      case PriceValues.WEIGH:
        props.articleCardList.priceValue = "Kilopreis";
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
      shopStore.addToShoppingCart(amount, this.props.articleCardList);
    } else {
      shopStore.toggleCartToast(true);
    }
  }

  render() {
    // Prepare price
    let priceDisplay = this.props.articleCardList.price.toFixed(2);
    return (
      <div>
        <Card text={"dark"} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{this.props.articleCardList.name}</Card.Title>
            <Card.Img
              src={config.BASE_URL + "images/" + this.props.articleCardList.imgSrc + ".jpg"}
            />
            {this.props.articleCardList.priceValue === "Kilopreis" ? (
              <div class='input-group'>
                <input
                  className='amountInputWeigh'
                  type='number'
                  placeholder='100'
                  onChange={this.updateInput.bind(this)}
                />

                <div class='input-group-append'>
                  <span class='input-group-text'> g </span>
                </div>
              </div>
            ) : (
              <div class='input-group'>
                <input
                  className='amountInputPiece'
                  type='number'
                  placeholder='1'
                  onChange={this.updateInput.bind(this)}
                />
                <div class='input-group-append'>
                  <span class='input-group-text'> Stück </span>
                </div>
              </div>
            )}
            <div className='price-box'>
              <b>{priceDisplay + "€ " + this.props.articleCardList.priceValue}</b>

              <Button className='cart-button' variant='dark' onClick={this.putIntoCart.bind(this)}>
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
