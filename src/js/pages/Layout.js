import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { observer } from "mobx-react";

//Selfmade Components
import NavBar from "../components/NavBar";
import Home from "./Home";
import Shop from "./Shop";

// Require scss files
require("../../stylesheets/_all.scss");

@observer
export default class Layout extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <NavBar location={window.location} />
          <div className='container'>
            <div className='row'>
              <div className='col-sm-12'>
                <Route exact path='/home' component={Home} />
                <Route exact path='/shop' component={Shop} />
              </div>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}
