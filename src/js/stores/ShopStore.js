import { makeObservable, observable, action } from "mobx";

// config
import config from "../../config/main.config";

// Store imports
import userStore from "../stores/userStore";

//Helper imports
import { getTokenFromLocalStorage, setCartToLocalStorage } from "../helper/util";

class ShopStore {
  amountInCart = 0;
  itemsInCart = [];
  articleList = [];

  constructor(props) {
    makeObservable(this, {
      refreshAmountInCart: action,
      refreshCart: action,
      emptyCart: action,
      updateAmountInCart: action,
      addToShoppingCart: action,
      removeFromCart: action,
      fetchArticleList: action,
      buyArticles: action,
      creatArticle: action,
      uploadImage: action,
      getArticleList: action,
      amountInCart: observable,
      itemsInCart: observable,
      articleList: observable,
    });
  }

  getArticleList() {
    return this.articleList;
  }

  /**
   * After Refresh update the amount in cart
   *
   * @param {number} amount
   */
  refreshAmountInCart(amount) {
    this.amountInCart = amount;
  }

  /**
   * Changes the Cart to param
   *
   * @param {Array} cart
   */
  refreshCart(cart) {
    this.itemsInCart = [];
    cart.forEach((item) => this.itemsInCart.push(item));
    setCartToLocalStorage(this.itemsInCart);
  }

  /**
   * Clears the cart
   */
  emptyCart() {
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
  updateAmountInCart(article, count) {
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
  addToShoppingCart(count, article) {
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
  removeFromCart(article) {
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
  fetchArticleList() {
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
  buyArticles(transferData) {
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
        } else {
          res.json().then((response) => alert(response));
        }
      })
      .catch((error) => {
        console.log("Error on fetching3");
        throw error;
      });
  }

  creatArticle(transferData, img) {
    let dataWithUser = userStore.userFromServer;
    dataWithUser.data = transferData;
    const postRequestOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + getTokenFromLocalStorage(),
      },
      body: JSON.stringify(dataWithUser),
    };
    fetch(config.BASE_URL + "articles/create", postRequestOptions)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          this.uploadImage(img);
        } else {
          res.json().then((response) => alert(response));
        }
      })
      .catch((error) => {
        console.log("Error on fetching3");
        throw error;
      });
  }

  uploadImage(img) {
    let dataWithUser = userStore.userFromServer;
    dataWithUser.img = img;
    const postRequestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + getTokenFromLocalStorage(),
      },
      body: img,
    };
    fetch(config.BASE_URL + "articles/create/image", postRequestOptions)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          res.json().then((response) => console.log(response));
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
