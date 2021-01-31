import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";

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

  toggleToast() {
    this.loginError = false;
  }

  handleChange(prop, e) {
    this.loginError = false;
    this.user[prop] = e.target.value;
  }

  render() {
    console.log(this.loginError);
    return (
      <div className='outer'>
        <div className='innerLogin'>
          <Form noValidate onSubmit={this.login.bind(this)}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={this.user.username}
                type='text'
                required
                placeholder='Username'
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
                onChange={this.handleChange.bind(this, "password")}
              />
              <Form.Control.Feedback type='invalid'>
                Benutzername oder Passwort is falsch.
              </Form.Control.Feedback>
            </Form.Group>
            <div className='buttonBox'>
              {this.loading ? (
                <Button variant='dark' disabled>
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
                <Button variant='dark' type='submit'>
                  Login
                </Button>
              )}
              <Button variant='dark' className='registerButton' href='#/register'>
                Registieren
              </Button>
            </div>
          </Form>
        </div>
        {this.loginError ? (
          <Alert variant='danger' dismissible={true} onClose={this.toggleToast.bind(this)}>
            Passwort oder Benutzername ist falsch
          </Alert>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default LoginPage;
