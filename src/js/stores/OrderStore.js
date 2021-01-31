import { observable, action } from "mobx";

// Store imports
import userStore from "../stores/userStore";

// config
import config from "../../config/main.config";

//Helper imports
import { getTokenFromLocalStorage } from "../helper/util";

class OrderStore {
  @observable orders = [];

  /**
   * Fetch all Articles form the Backend
   */
  @action fetchOrders() {
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
          res.json().then((response) => (this.orders = response));
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
