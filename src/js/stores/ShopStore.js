import { observable, action } from "mobx";

class ShopStore {
  @observable amountInCart = 0;
  @observable itemsInCart = [];

  @action addToShoppingCart(count, article) {
    let isItemInCart = this.itemsInCart.find(
      (element) => element.article.id === article.id
    );
    this.amountInCart += count;
    if (isItemInCart === undefined) {
      // Article is not in Cart yet
      this.itemsInCart.push({ count, article });
    } else {
      // Article is already in Cart
      let indexInCart = this.itemsInCart.indexOf(isItemInCart);
      this.itemsInCart[indexInCart].count += count;
    }
  }

  @action removeFromCart(article) {
    let indexOfDelete = this.itemsInCart.indexOf(article);
    if (indexOfDelete >= 0) {
      this.itemsInCart.splice(indexOfDelete, 1);
      this.amountInCart -= article.count;
    }
  }
}

const store = new ShopStore();

export default store;
