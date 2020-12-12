import React from "react";

//Selfmade Components
import ArticleCard from "../components/ArticleCard";

//Styling imports
require("../../stylesheets/_shop.scss");

export default class Shop extends React.Component {
  render() {
    return (
      <div>
        <ArticleCard />
      </div>
    );
  }
}
