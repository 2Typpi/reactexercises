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
  '{"id": 1, "name":"Gurke", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"id": 2, "name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"id": 3, "name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"id": 4, "name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"id": 5, "name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"id": 6, "name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"id": 7, "name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"id": 8, "name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"id": 9, "name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"id": 10, "name":"Salatkopf", "priceValue":"Stueckpreis", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"},' +
  '{"id": 11, "name":"Radieschen", "priceValue":"pro100g", "category":"Gemuese", "description":"Beschreibung", "price":"0.50", "imgSrc":"url"}]}';

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
