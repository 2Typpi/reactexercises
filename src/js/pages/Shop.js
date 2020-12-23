import React from "react";

//Selfmade Components
import ArticleCard from "../components/ArticleCard";

//Styling imports
import "../../stylesheets/shop.css";
import { CardColumns } from "react-bootstrap";

/*
JSON für Data:*/
var text =
  '{ "articles" : [' +
  '{"name":"Gurke", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"name":"Radieschen", "priceValue":"pro100g", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"}]}';

const list = JSON.parse(text);

export default class Shop extends React.Component {
  render() {
    const listCards = list.articles.map((article) => (
      <ArticleCard articleCardList={article} />
    ));
    return (
      <div>
        <CardColumns>{listCards}</CardColumns>
      </div>
    );
  }
}
