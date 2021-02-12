import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { observer } from "mobx-react";
import { action, observable } from "mobx";

import history from "../helper/browserHistory";

//Store Imports
import userStore from "../stores/userStore";

//Style Imports
import "../../stylesheets/login.css";

@observer
class LoginPage extends React.Component {
  @observable user = {
    username: "",
    password: "",
  };

  @observable loginError = false;

  @observable loading = false;

  constructor() {
    super();
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
    userStore.loginRequestError = false;
    this.user[prop] = e.target.value;
  }

  render() {
    let error = userStore.loginRequestError;
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
                isInvalid={error}
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
                isInvalid={error}
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
                <Button variant='dark' className='login-button' onClick={this.login.bind(this)}>
                  Login
                </Button>
              )}
              <Button variant='dark' className='register-button' href='#/register'>
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
