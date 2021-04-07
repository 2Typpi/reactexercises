import React from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import bsCustomFileInput from "bs-custom-file-input";

// Selfmade Components
import NoAdmin from "../components/NoAdmin";

// Helper
import { isAdmin } from "../helper/util";

// Enums
import { Categories } from "../helper/Categories";
import { PriceValues } from "../helper/PriceValues";

// Store Imports
import shopStore from "../stores/ShopStore";

//Style Imports
import "../../stylesheets/register.css";

@observer
class CreationPage extends React.Component {
  product = {
    name: "",
    priceValue: "",
    category: "",
    price: "",
    imgSrc: "",
  };

  loading = false;

  constructor() {
    super();
    makeObservable(this, {
      product: observable,
      loading: observable,
    });

    this.product = {
      name: "",
      priceValue: "",
      category: "",
      price: "",
      imgSrc: "",
    };
    this.img = new FormData();

    bsCustomFileInput.init();
  }

  createTransferStruct(product) {
    let transportProduct = {
      name: product.name,
      priceValue: 0,
      category: 0,
      // Convert to double
      price: 0.0,
      imgSrc: product.imgSrc,
    };
    switch (product.priceValue) {
      case "Kilopreis":
        transportProduct.priceValue = PriceValues.WEIGH;
        break;
      case "Stückpreis":
        transportProduct.priceValue = PriceValues.PIECE;
        break;
      default:
        transportProduct.priceValue = PriceValues.PIECE;
        break;
    }

    switch (product.category) {
      case "Gemüse":
        transportProduct.category = Categories.VEGETABLE;
        break;
      case "Früchte":
        transportProduct.category = Categories.FRUITS;
        break;
      case "Milchprodukte":
        transportProduct.category = Categories.DAIRYPRODUCTS;
        break;
      case "Fleisch":
        transportProduct.category = Categories.MEAT;
        break;
      case "Getränke":
        transportProduct.category = Categories.DRINKS;
        break;
      case "Süßigkeiten":
        transportProduct.category = Categories.SWEETS;
        break;
      case "Gebäck":
        transportProduct.category = Categories.BAKERY;
        break;
      case "Sonstiges":
        transportProduct.category = Categories.MISC;
        break;
    }

    if (parseFloat(product.price.replace(",", ".")) === NaN) {
      return -1;
    } else {
      transportProduct.price = parseFloat(product.price.replace(",", "."));
    }

    return transportProduct;
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
      let transferProductStructure = this.createTransferStruct(this.product);
      console.log(transferProductStructure);
      shopStore.creatArticle(transferProductStructure, this.img);
    }
  }

  uploadImage(e) {
    this.product.imgSrc = e.target.files[0].name;
    this.img.append("productImage", e.target.files[0], e.target.files[0].name);
  }

  handleChange(prop, e) {
    this.product[prop] = e.target.value;
  }

  render() {
    if (!isAdmin()) {
      return <NoAdmin></NoAdmin>;
    }

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
                name='productImage'
                custom
                onChange={this.uploadImage.bind(this)}
              />
            </Form.Group>

            {this.loading ? (
              <Button disabled>
                <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                <span className='sr-only'>Loading...</span>
              </Button>
            ) : (
              <Button className='registerPage-button' onClick={this.create.bind(this)}>
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
