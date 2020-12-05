import React from "react";
import { HashRouter, Route } from "react-router-dom";

//Selfmade Components
import NavBar from "../components/NavBar";
import Home from "./Home";
import Shop from "./Shop";

//import Styling
import '../css/Layout.css'

export default class Layout extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <NavBar location={window.location} />
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <Route exact path="/home" component={Home} />
                <Route exact path="/shop" component={Shop} />
              </div>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}
