import { observable, action } from "mobx";

// config
import config from "../../config/main.config";

//Helper imports
import { getTokenFromLocalStorage } from "../helper/util";

class ShopStore {
  @observable amountInCart = 0;
  @observable itemsInCart = [];
  @observable articleList = [];

  // Toast States
  @observable errorToast = false;
  @observable putInCartToast = false;
  @observable boughtToast = false;

  @action toggleBoughtToast(bool) {
    this.boughtToast = bool;
  }

  @action toggleCartToast(bool) {
    this.errorToast = bool;
  }

  @action togglePutInCartToast(bool) {
    this.putInCartToast = bool;
  }

  @action emptyCart() {
    this.amountInCart = 0;
    this.itemsInCart = [];
  }

  /**
   * Adds Articles to the Cart
   *
   * @param {*} count
   * @param {*} article
   */
  @action addToShoppingCart(count, article) {
    let isItemInCart = this.itemsInCart.find((element) => element.article.id === article.id);
    this.togglePutInCartToast(true);

    if (isItemInCart === undefined) {
      // Article is not in Cart yet
      this.amountInCart++;
      this.itemsInCart.push({ count, article });
    } else {
      // Article is already in Cart
      let indexInCart = this.itemsInCart.indexOf(isItemInCart);
      this.itemsInCart[indexInCart].count += count;
    }
  }

  /**
   * Removes Articles from the Cart
   *
   * @param {*} article
   */
  @action removeFromCart(article) {
    let indexOfDelete = this.itemsInCart.indexOf(article);
    if (indexOfDelete >= 0) {
      this.itemsInCart.splice(indexOfDelete, 1);
      this.amountInCart--;
    }
  }

  /**
   * Fetch all Articles form the Backend
   */
  @action fetchArticleList() {
    return fetch(config.BASE_URL + "articles", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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

  /**
   * Send the Cart to the Backend (Buy)
   *
   * @param {*} transferData
   */
  @action buyArticles(transferData) {
    // Set header and body for POST request
    const postRequestOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + getTokenFromLocalStorage(),
      },
      body: JSON.stringify(transferData),
    };
    // POST request and response
    fetch(config.BASE_URL + "cart", postRequestOptions)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          res.json().then((response) => console.log(response));
          this.emptyCart();
          this.toggleBoughtToast(true);
        } else {
          res.json().then((response) => alert(response));
        }
      })
      .catch((error) => {
        console.log("Error on fetching3");
        throw error;
      });
  }
}

const store = new ShopStore();

export default store;
