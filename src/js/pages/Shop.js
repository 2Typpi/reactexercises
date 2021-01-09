import React from "react";
import { observer } from "mobx-react";

//Stores
import shopStore from "../stores/ShopStore";

//Selfmade Components
import ArticleCard from "../components/ArticleCard";
import { Categories } from "../helper/Categories";

//Styling imports
import "../../stylesheets/shop.css";
import { CardColumns, Spinner } from "react-bootstrap";
import { when } from "mobx";

@observer
class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFetching: true, atricleList: [] };
    this.vegetable = [];
    this.fruit = [];
    this.dairyproduct = [];
    this.meat = [];
    this.drink = [];
    this.sweets = [];
    this.bakery = [];
    this.misc = [];
  }

  componentDidMount() {
    const list = this.state;
    this.setState({ isFetching: true, atricleList: this.state.atricleList });
    const result = shopStore.fetchArticleList();
    when(
      () => result.done,
      () => {
        this.setState({ isFetching: false, atricleList: this.state.atricleList });
        console.log(result);
        result.case({
          rejected: (error) => console.log(error),
        });
      }
    );
  }

  render() {
    var list = null;
    if (this.state.isFetching) {
      list = <Spinner animation='border' />;
    } else {
      console.log(this.state.atricleList);
      list = <p>Text</p>;
    }

    return <div>{list}</div>;
  }
}

export default Shop;

/* this.atricleList.forEach((item) => {
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
}); */

/*       const vegetableCards = this.vegetable.map((vegetable) => (
        <ArticleCard articleCardList={vegetable} />
      ));
      const fruitCards = this.fruit.map((fruit) => <ArticleCard articleCardList={fruit} />);
      const dairyproductCards = this.dairyproduct.map((dairyproduct) => (
        <ArticleCard articleCardList={dairyproduct} />
      ));
      const meatCards = this.meat.map((meat) => <ArticleCard articleCardList={meat} />);
      const drinkCards = this.drink.map((drink) => <ArticleCard articleCardList={drink} />);
      const sweetsCards = this.sweets.map((sweets) => <ArticleCard articleCardList={sweets} />);
      const bakeryCards = this.bakery.map((bakery) => <ArticleCard articleCardList={bakery} />);
      const miscCards = this.misc.map((misc) => <ArticleCard articleCardList={misc} />); */

/*     return (
      <div>
        <h2>Gemüse</h2>
        <hr />
        <CardColumns>{vegetableCards}</CardColumns>
        <h2>Früchte</h2>
        <hr />
        <CardColumns>{fruitCards}</CardColumns>
        <h2>Milchprodukte</h2>
        <hr />
        <CardColumns>{dairyproductCards}</CardColumns>
        <h2>Fleisch</h2>
        <hr />
        <CardColumns>{meatCards}</CardColumns>
        <h2>Getränke</h2>
        <hr />
        <CardColumns>{drinkCards}</CardColumns>
        <h2>Süßigkeiten</h2>
        <hr />
        <CardColumns>{sweetsCards}</CardColumns>
        <h2>Gebäck</h2>
        <hr />
        <CardColumns>{bakeryCards}</CardColumns>
        <h2>Sonstiges</h2>
        <hr />
        <CardColumns>{miscCards}</CardColumns>
      </div>
    ); */
