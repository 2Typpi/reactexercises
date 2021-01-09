import { observable, action } from "mobx";

// config
import config from "../../config/main.config";

class ShopStore {
  @observable amountInCart = 0;
  @observable itemsInCart = [];
  @observable articleList = [];

  @action addToShoppingCart(count, article) {
    let isItemInCart = this.itemsInCart.find((element) => element.article.id === article.id);
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

  @action fetchArticleList() {
    return fetch(config.BASE_URL + "articles", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          res.json().then((response) => (this.articleList = response));
        } else {
          console.log("error on fetching1");
        }
      })
      .catch((error) => {
        console.log("Error on fetching2");
        throw error;
      });
  }
}

const store = new ShopStore();

export default store;
