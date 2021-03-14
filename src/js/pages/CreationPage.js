import React from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";
import bsCustomFileInput from "bs-custom-file-input";

// Enums
import { Categories } from "../helper/Categories";
import { PriceValues } from "../helper/PriceValues";

//Style Imports
import "../../stylesheets/register.css";

@observer
class CreationPage extends React.Component {
  constructor() {
    super();
    this.product = {
      name: "",
      priceValue: "",
      category: "",
      price: "",
      imgSrc: "",
    };

    bsCustomFileInput.init();
  }

  @observable product = {
    name: "",
    priceValue: "",
    category: "",
    price: "",
    imgSrc: "",
  };

  @observable loading = false;

  createTransferStruct(product) {
    let transportProduct = {
      name: product.name,
      priceValue: 0,
      category: 0,
      // Convert to double
      price: product.price,
      imgSrc: product.imgSrc,
    };
    switch (product.priceValue) {
      case "Kilopreis":
        transportProduct.priceValue = PriceValues.WEIGH;
      case "Stückpreis":
        transportProduct.priceValue = PriceValues.PIECE;
      default:
        transportProduct.priceValue = PriceValues.PIECE;
    }
    switch (product.category) {
      case "Gemüse":
        transportProduct.category = Categories.VEGETABLE;
      case "Früchte":
        transportProduct.category = Categories.FRUITS;
      case "Milchprodukte":
        transportProduct.category = Categories.DAIRYPRODUCTS;
      case "Fleisch":
        transportProduct.category = Categories.MEAT;
      case "Getränke":
        transportProduct.category = Categories.DRINKS;
      case "Süßigkeiten":
        transportProduct.category = Categories.SWEETS;
      case "Gebäck":
        transportProduct.category = Categories.BAKERY;
      case "Sonstiges":
        transportProduct.category = Categories.MISC;
      default:
        transportProduct.category = Categories.VEGETABLE;
    }

    //TODO: Transform Price to double
  }

  create() {
    this.loading = false;

    if (
      this.product.name !== "" ||
      this.product.priceValue !== "" ||
      this.product.category !== "" ||
      this.product.price !== "" ||
      this.product.imgSrc !== ""
    ) {
      let transferProductStructure = createTransferStruct(this.product);
    }
  }

  handleChange(prop, e) {
    this.product[prop] = e.target.value;
  }

  render() {
    return (
      <div className='outer'>
        <div className='innerRegister'>
          <Form>
            <Form.Group controlId='formGridFirstName'>
              <Form.Label>Artikelname</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Artikelname'
                value={this.product.name}
                onChange={this.handleChange.bind(this, "name")}
              />
            </Form.Group>
            <Form.Group controlId='formGridLastName'>
              <Form.Label>Preis Art</Form.Label>
              <Form.Control
                required
                as='select'
                onChange={this.handleChange.bind(this, "priceValue")}
              >
                <option>Stückpreis</option>
                <option>Kilopreis</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='formGridUsername'>
              <Form.Label>Kategorie</Form.Label>
              <Form.Control
                required
                as='select'
                onChange={this.handleChange.bind(this, "category")}
              >
                <option>Gemüse</option>
                <option>Früchte</option>
                <option>Milchprodukte</option>
                <option>Fleisch</option>
                <option>Getränke</option>
                <option>Süßigkeiten</option>
                <option>Gebäck</option>
                <option>Sonstiges</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='formGridFirstName'>
              <Form.Label>Preis</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Preis'
                value={this.product.price}
                onChange={this.handleChange.bind(this, "price")}
              />
            </Form.Group>

            <Form.Group controlId='imageSrc'>
              <Form.Label>Bild</Form.Label>
              <Form.File
                id='custom-file'
                label={this.product.imgSrc}
                custom
                onChange={this.handleChange.bind(this, "imgSrc")}
              />
            </Form.Group>

            {this.loading ? (
              <Button variant='dark' disabled>
                <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                <span className='sr-only'>Loading...</span>
              </Button>
            ) : (
              <Button
                variant='dark'
                className='registerPage-button'
                onClick={this.create.bind(this)}
              >
                Erstellen
              </Button>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

export default CreationPage;
