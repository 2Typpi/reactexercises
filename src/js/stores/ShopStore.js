import { observable, action } from "mobx";

class ShopStore {
  @observable amountInCart = 0;
  @observable itemsInCart = [];

  @action addToShoppingCart(count, article) {
    this.amountInCart += count;
    this.itemsInCart.push({ count, article });
  }
}

const store = new ShopStore();

export default store;
