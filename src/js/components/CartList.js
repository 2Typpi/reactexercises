import { observer } from "mobx-react";
import React, { Component } from "react";
import { ListGroup, Figure, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

//Stores
import shopStore from "../stores/ShopStore";

//Image imports
import Gemuese from "../../resources/Gemuese.jpg";

@observer
class CartList extends Component {
  constructor(props) {
    super(props);
  }

  deleteFromCart(e) {
    console.log(this.props.article);
    shopStore.removeFromCart(this.props.article);
  }

  render() {
    return (
      <ListGroup>
        <ListGroup.Item>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt='Gemuese'
              src={Gemuese}
            />
          </Figure>
          {this.props.article.article.name + " " + this.props.article.count}
          <Button variant='danger' onClick={this.deleteFromCart.bind(this)}>
            <Icon.Dash />
          </Button>
        </ListGroup.Item>
      </ListGroup>
    );
  }
}

export default CartList;
