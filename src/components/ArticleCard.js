import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import * as Icon from "react-bootstrap-icons";

//Image Imports
import boots from "../images/Boots.png";

export default class ArticleCard extends Component {
  constructor() {
    super();
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

  render() {
    return (
      <Card
        bg={"dark"}
        key={"secondary"}
        text={"light"}
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Header>Bootstrap</Card.Header>
        <Card.Body>
          <Card.Title>The B</Card.Title>
          <Card.Img variant="top" src={boots} />
          <b>{"Menge: " + this.state.articleAmount + "  "}</b>
          <ButtonGroup size="sm">
            <Button variant="light" onClick={this.Add.bind(this)}>
              <Icon.Plus />
            </Button>
            <Button variant="light" onClick={this.Subtract.bind(this)}>
              <Icon.Dash />
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    );
  }
}
