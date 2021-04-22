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
import AllOrder from "./AllOrdersPage";
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
              <Route exact path='/order/all' component={AllOrder} />
              <Route exact path='/creation' component={Creation} />

              <Route exact path='/about' component={Home} />
              <Route exact path='/FAQ' component={Home} />
              <Route exact path='/privacy' component={Home} />
              <Route exact path='/imprint' component={Home} />
              <Route exact path='/contact' component={Home} />
            </div>
          </div>
        </HashRouter>
        <Footer history={history}></Footer>
      </div>
    );
  }
}
