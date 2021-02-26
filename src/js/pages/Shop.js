import React from "react";
import { observer } from "mobx-react";
import * as Icon from "react-bootstrap-icons";
import { Alert, Tabs, Tab, Spinner, CardColumns } from "react-bootstrap";

//Stores
import shopStore from "../stores/ShopStore";

//Selfmade Components
import ArticleCard from "../components/ArticleCard";
import { Categories } from "../helper/Categories";

//Styling imports
import "../../stylesheets/shop.css";

@observer
class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filteredList: [], filtered: false };
    this.vegetable = [];
    this.fruit = [];
    this.dairyproduct = [];
    this.meat = [];
    this.drink = [];
    this.sweets = [];
    this.bakery = [];
    this.misc = [];
  }

  //Map articles to their Categories
  categorizeArticles(list) {
    list.forEach((item) => {
      switch (item.category) {
        case Categories.VEGETABLE:
          this.vegetable.push(item);
          break;
        case Categories.FRUITS:
          this.fruit.push(item);
          break;
        case Categories.DAIRYPRODUCTS:
          this.dairyproduct.push(item);
          break;
        case Categories.MEAT:
          this.meat.push(item);
          break;
        case Categories.DRINKS:
          this.drink.push(item);
          break;
        case Categories.SWEETS:
          this.sweets.push(item);
          break;
        case Categories.BAKERY:
          this.bakery.push(item);
          break;
        default:
          this.misc.push(item);
      }
    });
  }

  componentDidMount() {
    if (shopStore.articleList.length <= 0 || shopStore.articleList === undefined) {
      shopStore.fetchArticleList();
    }
  }

  // Update filter list
  updateInput(e) {
    let filtered = shopStore.articleList.filter((article) => {
      return article.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    this.setState({ filteredList: filtered, filtered: true });
  }

  toggleCartErrorToast(e) {
    shopStore.toggleCartToast(false);
  }

  toggleAddToast(e) {
    shopStore.togglePutInCartToast(false);
  }

  render() {
    let list = shopStore.articleList;

    //empty lists => reload doesnt dublicate all items
    this.vegetable = [];
    this.fruit = [];
    this.dairyproduct = [];
    this.meat = [];
    this.drink = [];
    this.sweets = [];
    this.bakery = [];
    this.misc = [];

    // Check if filtered list is needed or normal list
    if (this.state.filtered) {
      this.categorizeArticles(this.state.filteredList);
    } else {
      this.categorizeArticles(list);
    }

    // Map the single categories
    const vegetableCards = this.vegetable.map((vegetable) => <ArticleCard article={vegetable} />);
    const fruitCards = this.fruit.map((fruit) => <ArticleCard article={fruit} />);
    const dairyproductCards = this.dairyproduct.map((dairyproduct) => (
      <ArticleCard article={dairyproduct} />
    ));
    const meatCards = this.meat.map((meat) => <ArticleCard article={meat} />);
    const drinkCards = this.drink.map((drink) => <ArticleCard article={drink} />);
    const sweetsCards = this.sweets.map((sweets) => <ArticleCard article={sweets} />);
    const bakeryCards = this.bakery.map((bakery) => <ArticleCard article={bakery} />);
    const miscCards = this.misc.map((misc) => <ArticleCard article={misc} />);

    return (
      <div>
        {shopStore.errorToast ? (
          <Alert variant='danger' dismissible={true} onClose={this.toggleCartErrorToast.bind(this)}>
            Bitte legen sie nicht weniger als 1 Artikel/Gramm in den Warenkorb!
          </Alert>
        ) : (
          <div></div>
        )}
        {shopStore.putInCartToast ? (
          <Alert variant='success' dismissible={true} onClose={this.toggleAddToast.bind(this)}>
            Artikel wurde zum Warenkorb hinzugefügt!
          </Alert>
        ) : (
          <div></div>
        )}
        <form className='searchForm' action=''>
          <input
            className='searchBar'
            type='search'
            type='text'
            placeholder={"Search"}
            onChange={this.updateInput.bind(this)}
          />
          <Icon.Search className='fa'></Icon.Search>
        </form>

        <Tabs
          className='tabBar'
          defaultActiveKey='vegetable'
          id='uncontrolled-tab-example'
          variant='tabs'
        >
          <Tab eventKey='vegetable' title='Gemüse'>
            <CardColumns>{vegetableCards}</CardColumns>
          </Tab>
          <Tab eventKey='fruits' title='Früchte'>
            <CardColumns>{fruitCards}</CardColumns>
          </Tab>
          <Tab eventKey='dairyproducts' title='Milchprodukte'>
            <CardColumns>{dairyproductCards}</CardColumns>
          </Tab>
          <Tab eventKey='meat' title='Fleisch'>
            <CardColumns>{meatCards}</CardColumns>
          </Tab>
          <Tab eventKey='drink' title='Getränke'>
            <CardColumns>{drinkCards}</CardColumns>
          </Tab>
          <Tab eventKey='sweets' title='Süßigkeiten'>
            <CardColumns>{sweetsCards}</CardColumns>
          </Tab>
          <Tab eventKey='bakery' title='Gebäck'>
            <CardColumns>{bakeryCards}</CardColumns>
          </Tab>
          <Tab eventKey='misc' title='Sonstiges'>
            <CardColumns>{miscCards}</CardColumns>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Shop;
