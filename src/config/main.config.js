import { isDevelop } from "../js/helper/util";

export default {
  BASE_URL: isDevelop() ? "http://127.0.0.1:3000/" : "http://192.168.2.122:3000/",
  STORAGE_KEY: "H737398",
  USER_STORAGE_KEY: "aaa62873",
  CART_STORAGE_KEY: "P98774812",
};
