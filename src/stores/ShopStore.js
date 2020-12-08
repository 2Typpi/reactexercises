import { observable, action } from "mobx";

class ShopStore {
  @observable amountInCart = 0;

  @action addToShoppingCart(count) {
    this.amountInCart += count;
  }
}

const store = new ShopStore();

export default store;
