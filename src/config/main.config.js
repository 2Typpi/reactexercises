/**
 * Created by Matijas on 11.04.2017.
 */

import { isDevelop } from "../js/helper/util";

export default {
  BASE_URL: isDevelop() ? "http://127.0.0.1:3000/" : "http://127.0.0.1:3000/",
};
