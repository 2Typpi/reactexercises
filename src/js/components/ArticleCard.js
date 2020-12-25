import React, { Component } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { observer } from "mobx-react";

//Stores
import shopStore from "../stores/ShopStore";

//Image Imports
import gemuese from "../../resources/Gemuese.jpg";

//Style Import
import "../../stylesheets/shop.css";

@observer
class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.state = { articleAmount: 1 };
  }

  add(e) {
    let amount = this.state.articleAmount + 1;
    this.setState({ articleAmount: amount });
  }

  subtract(e) {
    let amount = this.state.articleAmount - 1;
    if (amount > 1) {
      this.setState({ articleAmount: amount });
    } else {
      this.setState({ articleAmount: 1 });
    }
  }

  putIntoCart(e) {
    let amount = this.state.articleAmount;
    if (amount > 0) {
      shopStore.addToShoppingCart(amount, this.props.articleCardList);
    }
  }

  render() {
    const cartEdit = {
      marginLeft: "5px",
    };

    const cardButtons = {
      marginTop: "5px",
    };

    return (
      <Card
        bg={"dark"}
        key={"secondary"}
        text={"light"}
        style={{ width: "18rem" }}
      >
        <Card.Body>
          <Card.Title>{this.props.articleCardList.name}</Card.Title>
          <Card.Img src={gemuese}></Card.Img>
          <b>
            {"Menge: " +
              this.state.articleAmount +
              " " +
              this.props.articleCardList.price +
              "€ " +
              this.props.articleCardList.priceValue}
          </b>
          <ButtonGroup size='sm' style={cardButtons}>
            <Button variant='light' onClick={this.subtract.bind(this)}>
              <Icon.Dash />
            </Button>
            <Button variant='light' onClick={this.add.bind(this)}>
              <Icon.Plus />
            </Button>
            <Button
              className='cartEdit'
              style={cartEdit}
              variant='outline-primary'
              onClick={this.putIntoCart.bind(this)}
            >
              <Icon.Cart />
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default ArticleCard;
