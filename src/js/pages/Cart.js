import { observer } from "mobx-react";
import React from "react";

//Stores
import shopStore from "../stores/ShopStore";

//Selfmade Components
import CartList from "../components/CartList";

@observer
class Cart extends React.Component {
  render() {
    const cart = shopStore.itemsInCart.map((article) => (
      <CartList article={article} />
    ));
    return <div>{cart}</div>;
  }
}

export default Cart;
