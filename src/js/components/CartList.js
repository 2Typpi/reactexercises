import { observer } from "mobx-react";
import React, { Component } from "react";
import { ListGroup, Figure, Button, Media, Row, Col } from "react-bootstrap";
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
    console.log(this.props);
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

  render() {
    console.log(this.props.article);
    return (
      <div>
        <Media className='mediaItem'>
          <Figure.Image
            width={171}
            height={180}
            alt=''
            src={config.BASE_URL + "images/" + this.props.article.article.imgSrc + ".jpg"}
          />
          <Media.Body className='mediaBody'>
            <h4>{this.props.article.article.name}</h4>
            <Row>
              <Col xs={5}>
                <strong>
                  {this.props.article.article.price + "€ " + this.props.article.article.priceValue}
                </strong>
              </Col>
              <Col xs={6}>
                {this.props.article.article.priceValue === "Kilopreis"
                  ? "Menge: " + this.props.article.count + " Gramm"
                  : "Menge: " + this.props.article.count + " Stück"}
              </Col>
            </Row>
            {this.props.isOrder ? (
              <div></div>
            ) : (
              <Row className='mediaItemButtons'>
                <Col xs={3}>
                  <Button variant='danger' size='sm' onClick={this.deleteFromCart.bind(this)}>
                    Delete
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
