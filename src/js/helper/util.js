import config from "../../config/main.config";

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
