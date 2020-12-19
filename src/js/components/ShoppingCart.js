import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
  }

  //JSON mit Name, Price, imgSrc geteilt mit dem Shop
  render() {
    return (
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>Huso Luca</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}

export default ShoppingCart;
