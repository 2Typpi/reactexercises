import { observer } from "mobx-react";
import React from "react";

//Stores
import shopStore from "../stores/ShopStore";

//Selfmade Components
import CartList from "../components/CartList";

@observer
class Cart extends React.Component {
  render() {
    let totalPrice = 0.0;
    shopStore.itemsInCart.forEach(
      (item) => (totalPrice += item.article.price * item.count)
    );
    const cart = shopStore.itemsInCart.map((article) => (
      <CartList article={article} />
    ));
    return (
      <div>
        <h4>Your Personal Cart</h4>
        {cart}
        <hr />
        <b>Total Price: {totalPrice} €</b>
      </div>
    );
  }
}

export default Cart;
