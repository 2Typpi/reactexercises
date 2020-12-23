import React, { Component } from "react";
import { ListGroup, Figure } from "react-bootstrap";

//Image imports
import Gemuese from "../../resources/Gemuese.jpg";

class CartList extends Component {
  constructor(props) {
    super(props);
    console.log(props.article);
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
        </ListGroup.Item>
      </ListGroup>
    );
  }
}

export default CartList;
