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
    this.state = { articleAmount: 0 };
  }

  Add(e) {
    let amount = this.state.articleAmount + 1;
    this.setState({ articleAmount: amount });
  }

  Subtract(e) {
    let amount = this.state.articleAmount - 1;
    if (amount > 0) {
      this.setState({ articleAmount: amount });
    } else {
      this.setState({ articleAmount: 0 });
    }
  }

  PutIntoCart(e) {
    let amount = this.state.articleAmount;
    shopStore.addToShoppingCart(amount, this.props.articleCardList);
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
        {/*         <Card.Header>Gemüse</Card.Header> */}
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
            <Button variant='light' onClick={this.Subtract.bind(this)}>
              <Icon.Dash />
            </Button>
            <Button variant='light' onClick={this.Add.bind(this)}>
              <Icon.Plus />
            </Button>
            <Button
              className='cartEdit'
              style={cartEdit}
              variant='outline-primary'
              onClick={this.PutIntoCart.bind(this)}
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
