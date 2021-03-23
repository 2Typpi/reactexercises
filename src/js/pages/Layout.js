import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { observer } from "mobx-react";

//Selfmade Components
import NavBar from "../components/NavBar";
import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";
import Login from "./LoginPage";
import Register from "./RegisterPage";
import Order from "./OrderPage";
import Creation from "./CreationPage";
import Footer from "../components/Footer";

//css files
import "../../stylesheets/all.css";

@observer
export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <HashRouter>
          <div className='flex-container'>
            <NavBar location={window.location} />
            <div className='container'>
              <Route exact path='/' component={Home} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/shop' component={Shop} />
              <Route exact path='/cart' component={Cart} />
              <Route exact path='/order' component={Order} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/order/all' component={Order} />
              <Route exact path='/creation' component={Creation} />
            </div>
          </div>
        </HashRouter>
        <Footer></Footer>
      </div>
    );
  }
}
