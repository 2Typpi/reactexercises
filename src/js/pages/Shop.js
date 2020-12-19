import React from "react";

//Selfmade Components
import ArticleCard from "../components/ArticleCard";

//Styling imports
import "../../stylesheets/shop.css";

/*
JSON für Data:
{
  "length": x,
  "articles":[
    {"name":"Gurke", "category":"Gemuese", "description":"Beschreibung", "Preis":"0.50", "imgSrc":"url"}
    {"name":"Salatkopf", "category":"Gemuese", "description":"Beschreibung", "Preis":"0.50", "imgSrc":"url"}
    {"name":"Radieschen", "category":"Gemuese", "description":"Beschreibung", "Preis":"0.50", "imgSrc":"url"}
  ]
}
*/

export default class Shop extends React.Component {
  render() {
    return (
      <div>
        <ArticleCard />
      </div>
    );
  }
}
