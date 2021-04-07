import { makeObservable, observable, action } from "mobx";

class NavBarStore {
  status = "";

  constructor(props) {
    makeObservable(this, {
      setStatus: action,
      status: observable,
    });
    this.status = status;
  }

  setStatus(status_) {
    this.status = status_;
  }
}

const store = new NavBarStore();

export default store;
