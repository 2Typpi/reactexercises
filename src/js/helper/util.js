import config from "../../config/main.config";

// Store imports
import userStore from "../stores/userStore";
import shopStore from "../stores/ShopStore";

export function isDevelop() {
  return process.env.NODE_ENV === "develop" || typeof process.env.NODE_ENV === "undefined";
}

export function getTokenFromLocalStorage() {
  if (typeof window !== "undefined") {
    let object = JSON.parse(localStorage.getItem(config.STORAGE_KEY));

    if (object === null) {
      return null;
    }

    let oneDayAfterTokenDate = new Date(object.timestamp);
    oneDayAfterTokenDate.setDate(oneDayAfterTokenDate.getDate() + 1);

    if (oneDayAfterTokenDate.getTime() > new Date().getTime()) {
      return object.token;
    } else {
      removeTokenFromStorage();
      return null;
    }
  }
}

export function removeTokenFromStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(config.STORAGE_KEY);
    localStorage.removeItem(config.USER_STORAGE_KEY);
  }
}

export function setTokenLocalStorage(token) {
  if (typeof window !== "undefined") {
    let object = {
      "token": token,
      timestamp: new Date().getTime(),
    };

    localStorage.setItem(config.STORAGE_KEY, JSON.stringify(object));
  }
}

export function setUserToLocalStorage(user) {
  if (typeof window !== "undefined") {
    let object = {
      "user": user,
      timestamp: new Date().getTime(),
    };

    localStorage.setItem(config.USER_STORAGE_KEY, JSON.stringify(object));
  }
}

export function getUserFromLocalStorage() {
  if (typeof window !== "undefined") {
    let object = JSON.parse(localStorage.getItem(config.USER_STORAGE_KEY));

    if (object === null) {
      return null;
    }

    let oneDayAfterTokenDate = new Date(object.timestamp);
    oneDayAfterTokenDate.setDate(oneDayAfterTokenDate.getDate() + 1);

    if (oneDayAfterTokenDate.getTime() > new Date().getTime()) {
      return object.user;
    } else {
      removeTokenFromStorage();
      return null;
    }
  }

  return null;
}

export function setCartToLocalStorage(cart) {
  if (typeof window !== "undefined") {
    let object = {
      "cart": cart,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(config.CART_STORAGE_KEY, JSON.stringify(object));
  }
}

export function getCartFromLocalStorage() {
  if (typeof window !== "undefined") {
    let object = JSON.parse(localStorage.getItem(config.CART_STORAGE_KEY));
    if (object !== undefined) {
      return object;
    } else {
      return null;
    }
  }
}

export function calcTotalPrice(list) {
  let totalPrice = 0.0;
  // Detect how to Calculate Price
  list.forEach((item) => {
    if (item.priceValue === "Stückpreis") {
      totalPrice += item.price * item.productQuantity;
    } else if (item.priceValue === "Kilopreis") {
      totalPrice += (item.price / 1000) * item.productQuantity;
    } else {
      item.priceValue === 0
        ? (totalPrice += (item.price / 1000) * item.productQuantity)
        : (totalPrice += item.price * item.productQuantity);
    }
  });

  // Round Price to 2 Digits
  return totalPrice.toFixed(2);
}

export function isAdmin() {
  if (
    userStore.userFromServer !== null &&
    (userStore.userFromServer.role == "admin" || userStore.userFromServer.role == "supervisor")
  ) {
    return true;
  }
  return false;
}

export function dissolveProductIds(list) {
  let completeProductList = [];
  list.forEach((element) => {
    let found = shopStore.articleList.find((e) => e.id === element.productId);
    found["productQuantity"] = element.productQuantity;
    // Clone Object to Create leave the mobx relation out
    const clone = JSON.parse(JSON.stringify(found));
    completeProductList.push(clone);
  });
  return completeProductList;
}
