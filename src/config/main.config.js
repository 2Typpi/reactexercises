import { isDevelop } from "../js/helper/util";

export default {
  BASE_URL: isDevelop() ? "http://127.0.0.1:3000/" : "http://127.0.0.1:3000/",
  STORAGE_KEY: "H737398",
  USER_STORAGE_KEY: "aaa62873",
};
