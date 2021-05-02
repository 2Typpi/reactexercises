import { makeObservable, observable, action } from "mobx";

// Store imports
import userStore from "../stores/userStore";

// config
import config from "../../config/main.config";

//Helper imports
import { getTokenFromLocalStorage } from "../helper/util";

class OrderStore {
  allOrders = [];
  orders = [];
  status = "";

  constructor(props) {
    makeObservable(this, {
      fetchOrders: action,
      fetchAllOrders: action,
      getAllOrders: action,
      allOrders: observable,
      orders: observable,
    });
  }

  getAllOrders() {
    return this.allOrders;
  }

  /**
   * Fetch all Orders for one User from the Backend
   */
  fetchOrders() {
    return fetch(config.BASE_URL + "order", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + getTokenFromLocalStorage(),
      },
      body: JSON.stringify(userStore.userFromServer),
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          res.json().then((response) => {
            console.log(response);
            this.orders = response;
          });
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
   * Fetch all Orders from the Backend
   */
  fetchAllOrders() {
    return fetch(config.BASE_URL + "order/all", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + getTokenFromLocalStorage(),
      },
      body: JSON.stringify(userStore.userFromServer),
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          res.json().then((response) => {
            this.allOrders = response;
          });
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

const store = new OrderStore();

export default store;
