import React from "react";

//Selfmade Components
import ArticleCards from '../components/ArticleCard'

//Styling imports
import "../css/Shop.css";

export default class Shop extends React.Component {
  render() {
    return (
      <div className="Shop">
        <ArticleCards />
      </div>
    );
  }
}
