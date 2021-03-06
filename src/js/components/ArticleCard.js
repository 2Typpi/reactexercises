import React, { Component } from "react";
import { Card, Button, Toast, InputGroup, FormControl } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { observer } from "mobx-react";
import { NotificationContainer, NotificationManager } from "react-notifications";

//config
import config from "../../config/main.config";

//Stores
import shopStore from "../stores/ShopStore";

//Selfmade Components
import { PriceValues } from "../helper/PriceValues";
import { isAdmin, dissolvePriceValue } from "../helper/util";

//Style Import
import "react-notifications/lib/notifications.css";
import "../../stylesheets/card.css";

@observer
class ArticleCard extends Component {
  constructor(props) {
    super(props);
    if (Number.isInteger(props.article.priceValue)) {
      dissolvePriceValue(props.article);
    }
    this.state = { articleAmount: 0, showToast: false };
  }

  deleteItem(e) {
    shopStore.delete(this.props.article.id);
    NotificationManager.success("Artikel wurde gelöscht!");
  }

  updateInput(e) {
    let number = Number.parseFloat(e.target.value);
    this.setState({ articleAmount: number });
  }

  putIntoCart(e) {
    let amount = this.state.articleAmount;
    if (amount > 0) {
      shopStore.addToShoppingCart(amount, this.props.article);
      NotificationManager.success("Artikel wurde zum Warenkorb hinzugefügt!");
    } else {
      NotificationManager.error(
        "Bitte legen sie nicht weniger als 1 Artikel/Gramm in den Warenkorb!"
      );
    }
  }

  render() {
    if (Number.isInteger(this.props.article.priceValue)) {
      dissolvePriceValue(this.props.article);
    }

    // Prepare price
    let priceDisplay = this.props.article.price.toFixed(2);
    let item = this.props.article;
    return (
      <div>
        <NotificationContainer />
        <Card className='card-box'>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Img src={config.BASE_URL + "articleImages/" + item.imgSrc} />
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
              {isAdmin() ? (
                <Button className='delete-button' onClick={this.deleteItem.bind(this)}>
                  Löschen
                </Button>
              ) : (
                <Button className='cart-button' onClick={this.putIntoCart.bind(this)}>
                  <Icon.Cart />
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ArticleCard;
