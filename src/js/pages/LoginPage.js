import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";

//Store Imports
import userStore from "../stores/userStore";
import navBarStore from "../stores/NavBarStore";

//Style Imports
import "../../stylesheets/login.css";

@observer
class LoginPage extends React.Component {
  user = {
    username: "",
    password: "",
  };

  loginError = false;

  loading = false;

  constructor() {
    super();
    makeObservable(this, {
      user: observable,
      loginError: observable,
      loading: observable,
    });
    this.user = {
      username: "",
      password: "",
    };

    this.login = this.login.bind(this);
  }

  resetInputFields() {
    this.user = {
      username: "",
      password: "",
    };
  }

  login() {
    this.loading = true;

    if (this.user.username === "") {
      this.loading = false;
      this.loginError = true;
    } else if (this.user.password === "") {
      this.loading = false;
      this.loginError = true;
    } else {
      userStore.authenticateUser(this.user);
      this.loading = false;
    }
  }

  handleChange(prop, e) {
    this.loginError = false;
    userStore.setLoginRequestError(false);
    this.user[prop] = e.target.value;
  }

  goToRegister() {
    navBarStore.setStatus("register");
    this.props.history.push("/register");
  }

  render() {
    const { loginRequestError } = userStore;
    return (
      <div className='outer'>
        <div className='innerLogin'>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={this.user.username}
                type='text'
                required
                placeholder='Username'
                isInvalid={loginRequestError}
                onChange={this.handleChange.bind(this, "username")}
              />
              <Form.Control.Feedback type='invalid'>
                Benutzername oder Passwort is falsch.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Passwort</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Passwort'
                value={this.user.password}
                isInvalid={loginRequestError}
                onChange={this.handleChange.bind(this, "password")}
              />
              <Form.Control.Feedback type='invalid'>
                Benutzername oder Passwort is falsch.
              </Form.Control.Feedback>
            </Form.Group>
            <div className='buttonBox'>
              {this.loading ? (
                <Button disabled>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                  <span className='sr-only'>Loading...</span>
                </Button>
              ) : (
                <Button className='login-button' onClick={this.login.bind(this)}>
                  Login
                </Button>
              )}
              <Button className='register-button' onClick={this.goToRegister.bind(this)}>
                Registieren
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
