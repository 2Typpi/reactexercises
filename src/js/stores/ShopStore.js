import { observable, action } from "mobx";

// config
import config from "../../config/main.config";

//Helper imports
import { getTokenFromLocalStorage, setCartToLocalStorage } from "../helper/util";

class ShopStore {
  @observable amountInCart = 0;
  @observable itemsInCart = [];
  @observable articleList = [];

  /**
   * After Refresh update the amount in cart
   *
   * @param {number} amount
   */
  @action refreshAmountInCart(amount) {
    this.amountInCart = amount;
  }

  /**
   * Changes the Cart to param
   *
   * @param {Array} cart
   */
  @action refreshCart(cart) {
    this.itemsInCart = [];
    cart.forEach((item) => this.itemsInCart.push(item));
    setCartToLocalStorage(this.itemsInCart);
  }

  /**
   * Clears the cart
   */
  @action emptyCart() {
    this.amountInCart = 0;
    this.itemsInCart = [];
    setCartToLocalStorage(this.itemsInCart);
  }

  /**
   * Updates the amount of the articel in the cart
   *
   * @param {object} article
   * @param {number} count
   */
  @action updateAmountInCart(article, count) {
    let isItemInCart = this.itemsInCart.find((element) => element.article.id === article.id);
    if (isItemInCart !== undefined) {
      let indexInCart = this.itemsInCart.indexOf(isItemInCart);
      this.itemsInCart[indexInCart].count = count;
    }
    setCartToLocalStorage(this.itemsInCart);
  }

  /**
   * Adds Articles to the Cart
   *
   * @param {number} count
   * @param {object} article
   */
  @action addToShoppingCart(count, article) {
    let isItemInCart = this.itemsInCart.find((element) => element.article.id === article.id);

    if (isItemInCart === undefined) {
      // Article is not in Cart yet
      this.amountInCart++;
      this.itemsInCart.push({ count, article });
    } else {
      // Article is already in Cart
      let indexInCart = this.itemsInCart.indexOf(isItemInCart);
      this.itemsInCart[indexInCart].count += count;
    }
    setCartToLocalStorage(this.itemsInCart);
  }

  /**
   * Removes Articles from the Cart
   *
   * @param {object} article
   */
  @action removeFromCart(article) {
    let indexOfDelete = this.itemsInCart.indexOf(article);
    console.log(indexOfDelete);
    if (indexOfDelete >= 0) {
      this.itemsInCart.splice(indexOfDelete, 1);
      this.amountInCart--;
    }
    setCartToLocalStorage(this.itemsInCart);
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
   * @param {array} transferData
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

  // Toast States
  @observable boughtToast = false;

  @action toggleBoughtToast(bool) {
    this.boughtToast = bool;
  }
}

const store = new ShopStore();

export default store;
