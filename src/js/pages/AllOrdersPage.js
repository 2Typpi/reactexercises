import React from "react";
import { observer } from "mobx-react";
import { Row, Col, Card, Spinner, Button, Accordion } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import * as Icon from "react-bootstrap-icons";
import de from "date-fns/locale/de";
registerLocale("de", de);

//Stores
import orderStore from "../stores/OrderStore";
import shopStore from "../stores/ShopStore";
import userStore from "../stores/userStore";

// Helpers
import {
  calcTotalPrice,
  isAdmin,
  dissolveProductIds,
  getTokenFromLocalStorage,
} from "../helper/util";

// config
import config from "../../config/main.config";

//Selfmade Components
import AdminOrders from "../components/AdminOrders";
import NoAdmin from "../components/NoAdmin";

//Styling imports
import "../../stylesheets/order.css";
import "react-datepicker/dist/react-datepicker.css";

@observer
class OrderPage extends React.Component {
  orderList = [];
  articleList = [];

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      loadingOrders: true,
      loadingArticles: true,
      filteredList: [],
      filteredDate: false,
      filteredUser: false,
    };
  }

  componentDidMount() {
    if (this.articleList.length > 0 && this.orderList.length > 0) {
      this.setState({ loadingOrders: false, loadingArticles: false });
      return;
    }

    if (
      userStore.userFromServer !== null &&
      (userStore.userFromServer.role === "supervisor" || userStore.userFromServer.role === "admin")
    ) {
      orderStore.fetchAllOrders().then(() => {
        this.setState({ date: this.state.date, loadingOrders: false });
      });
    }

    if (shopStore.articleList.length <= 0 || shopStore.articleList === undefined) {
      shopStore.fetchArticleList().then(() => {
        this.setState({ date: this.state.date, loadingArticles: false });
      });
    }
  }

  handleDateChange(newDate) {
    if (newDate == null) {
      this.setState({
        date: newDate,
        loadingArticles: false,
        loadingOrders: false,
        filteredList: this.state.filteredList,
        filteredUser: this.state.filteredUser,
        filteredDate: false,
      });
      return;
    }

    let listToFilter = this.orderList;

    if (this.state.filteredUser) {
      listToFilter = this.state.filteredList;
    }

    let dateStringFormat =
      newDate.getUTCFullYear() +
      "-" +
      (newDate.getMonth() + 1 >= 9 ? newDate.getMonth() + 1 : "0" + (newDate.getMonth() + 1)) +
      "-" +
      (newDate.getDate() >= 9 ? newDate.getDate() : "0" + newDate.getDate());
    let filtered = listToFilter.filter((order) => {
      return order.datetime.includes(dateStringFormat);
    });
    this.setState({
      date: newDate,
      loadingArticles: false,
      loadingOrders: false,
      filteredList: filtered,
      filteredUser: this.state.filteredUser,
      filteredDate: true,
    });
  }

  updateInput(e) {
    let listToFilter = this.orderList;

    if (this.state.filteredDate) {
      listToFilter = this.state.filteredList;
    }

    let filtered = listToFilter.filter((order) => {
      return order.username.toLowerCase().includes(e.target.value.toLowerCase());
    });
    this.setState({
      filteredList: filtered,
      filteredUser: true,
    });
  }

  render() {
    if (!isAdmin()) {
      return <NoAdmin></NoAdmin>;
    }

    this.orderList = orderStore.allOrders;
    this.articleList = shopStore.articleList;
    if (
      this.state.loadingArticles ||
      this.state.loadingOrders ||
      this.articleList == undefined ||
      this.articleList.length <= 0 ||
      this.orderList == undefined ||
      this.orderList.length <= 0
    ) {
      return <Spinner></Spinner>;
    }

    let completeOrders = [];
    if (this.state.filteredDate || this.state.filteredUser) {
      for (const order of this.state.filteredList) {
        let productList = dissolveProductIds(order.order);
        let list = <AdminOrders order={productList} />;
        const accordion = (
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                {order.datetime} {order.username}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>{list}</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        );
        completeOrders.push(accordion);
      }
    } else {
      for (const order of this.orderList) {
        let productList = dissolveProductIds(order.order);
        let list = order.order.map(() => <AdminOrders order={productList} />);
        const accordion = (
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                {order.datetime} {order.username}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>{list}</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        );
        completeOrders.push(accordion);
      }
    }

    return (
      <div>
        <h4>Alle Bestellungen</h4>
        <DatePicker
          selected={this.state.date}
          onChange={this.handleDateChange.bind(this)}
          locale='de'
          dateFormat='dd.MM.yyyy'
          isClearable
          placeholderText='Wähle ein Datum'
        />
        <form>
          <input type='text' placeholder={"Search"} onChange={this.updateInput.bind(this)} />
        </form>
        {completeOrders}
      </div>
    );
  }
}

export default OrderPage;
