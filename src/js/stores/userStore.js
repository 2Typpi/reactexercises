import { makeObservable, action, computed, observable } from "mobx";
import config from "../../config/main.config";
import history from "../helper/browserHistory";

import navBarStore from "./NavBarStore";

import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
  removeTokenFromStorage,
  setTokenLocalStorage,
  setUserToLocalStorage,
} from "../helper/util";

class UserStore {
  user = null;
  loading = false;
  error = false;
  loginRequestError = false;
  registerRequestError = false;

  constructor(props) {
    makeObservable(this, {
      userFromServer: computed,
      getUsers: action,
      authenticateUser: action,
      registerUser: action,
      setLoginRequestError: action,
      user: observable,
      loading: observable,
      error: observable,
      loginRequestError: observable,
      registerRequestError: observable,
    });
  }

  get userFromServer() {
    if (this.user === null) {
      if (getUserFromLocalStorage() !== null && typeof getUserFromLocalStorage() !== "undefined") {
        this.user = getUserFromLocalStorage();
      }
    }
    return this.user;
  }

  getUsers() {
    fetch(config.BASE_URL + "users/getAll", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + getTokenFromLocalStorage(),
      },
    })
      .then((response) => {
        this.loading = false;
        if (response.status >= 200 && response.status < 300) {
          response.json().then((json) => {
            this.users = json;
          });
        } else {
          this.loginRequestError = true;
        }
      })
      .catch((error) => {
        this.fetching = false;
        console.log(error);
        if (error.status === 401) {
          history.replace("/login");
        }
      });
  }

  authenticateUser(userToAuthenticate) {
    const token = getTokenFromLocalStorage();
    if (userToAuthenticate === null) {
      alert("Bitte melden Sie sich erneut an.");
    } else {
      this.loading = true;
      return fetch(config.BASE_URL + "users/authenticate", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(userToAuthenticate),
      })
        .then((response) => {
          this.loading = false;
          if (response.status >= 200 && response.status < 300) {
            response.json().then((json) => {
              setTokenLocalStorage(json.token);
              setUserToLocalStorage(json);
              this.user = json;
            });
          } else {
            removeTokenFromStorage();
            this.loginRequestError = true;
            this.user = null;
          }
        })
        .catch((error) => {
          alert("Die Server sind derzeit nicht erreichbar. Versuchen sie es später noch einmal.");
          removeTokenFromStorage();
          this.loading = false;
          this.error = true;
          this.user = null;
          throw error;
        });
    }
  }

  registerUser(userToRegister) {
    const token = getTokenFromLocalStorage();
    delete userToRegister.passwordRepeat;
    if (userToRegister === null) {
      alert("Bitte melden Sie sich erneut an.");
    } else {
      this.loading = true;
      return fetch(config.BASE_URL + "users/register", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(userToRegister),
      })
        .then((response) => {
          this.loading = false;
          if (response.status >= 200 && response.status < 300) {
            response.json().then((json) => {
              history.replace("#/login");
              history.go();
            });
          } else {
            this.registerRequestError = true;
            removeTokenFromStorage();
            this.error = true;
            this.user = null;
          }
        })
        .catch((error) => {
          removeTokenFromStorage();
          this.loading = false;
          this.error = true;
          this.user = null;
          alert("Die Server sind derzeit nicht erreichbar. Versuchen sie es später noch einmal.");
          throw error;
        });
    }
  }

  setLoginRequestError(boolean) {
    this.loginRequestError = boolean;
  }
}

const store = new UserStore();

export default store;
