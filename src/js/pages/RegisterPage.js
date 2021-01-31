import React from "react";
import { Form, Button, Col, Spinner } from "react-bootstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";

import history from "../helper/browserHistory";

//Store Imports
import userStore from "../stores/userStore";

//Style Imports
import "../../stylesheets/register.css";

@observer
class RegisterPage extends React.Component {
  @observable user = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    street: "",
    houseNumber: "",
    PLZ: "",
    city: "",
    passwordRepeat: "",
  };

  @observable registerError = false;

  @observable loading = false;

  constructor() {
    super();
    this.user = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      street: "",
      houseNumber: "",
      PLZ: "",
      city: "",
      passwordRepeat: "",
    };

    this.register = this.register.bind(this);
  }

  resetInputFields() {
    this.user = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      street: "",
      houseNumber: "",
      PLZ: "",
      city: "",
      passwordRepeat: "",
    };
  }

  // Checks if the Username or E-Mail is already taken
  isUnique() {
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.users[i].username === this.user.username ||
        this.users[i].email === this.user.email
      ) {
        this.errorMessage = dublicateErrorMessage;
        return false;
      }
    }
    return true;
  }

  register() {
    this.loading = true;
    this.registerError = false;

    if (
      this.user.username === "" ||
      this.user.password === "" ||
      this.user.email === "" ||
      this.user.street === "" ||
      this.user.houseNumber === "" ||
      this.user.PLZ === "" ||
      this.user.city === "" ||
      this.user.firstName === "" ||
      this.user.lastName === "" ||
      this.user.password !== this.user.passwordRepeat
    ) {
      this.loading = false;
      this.registerError = true;
    } else if (!this.isUnique) {
      alert("Benutzername oder E-Mail sind bereits vergeben!");
    } else {
      userStore.registerUser(this.user);
      this.loading = false;
    }
  }

  handleChange(prop, e) {
    this.loginError = false;
    this.user[prop] = e.target.value;
  }

  //TODO Validation
  render() {
    return (
      <div className='outer'>
        <div className='innerRegister'>
          <Form noValidate validated={this.loginError} onSubmit={this.register.bind(this)}>
            <Form.Row>
              <Col>
                <Form.Group controlId='formGridFirstName'>
                  <Form.Label>Vorname</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Vorname'
                    value={this.user.firstName}
                    onChange={this.handleChange.bind(this, "firstName")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='formGridLastName'>
                  <Form.Label>Nachname</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Nachname'
                    value={this.user.lastName}
                    onChange={this.handleChange.bind(this, "lastName")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='formGridUsername'>
                  <Form.Label>Benutzername</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Benutzername'
                    value={this.user.username}
                    onChange={this.handleChange.bind(this, "username")}
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <Form.Group controlId='formGridEmail'>
                  <Form.Label>E-Mail-Adresse</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='E-Mail-Adresse'
                    value={this.user.email}
                    onChange={this.handleChange.bind(this, "email")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='formGridPassword'>
                  <Form.Label>Passwort</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Passwort'
                    value={this.user.password}
                    onChange={this.handleChange.bind(this, "password")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='formGridPasswordRepeat'>
                  <Form.Label>Passwort Wiederholen</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Passwort'
                    value={this.user.passwordRepeat}
                    onChange={this.handleChange.bind(this, "passwordRepeat")}
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <Form.Group controlId='formGridAddress'>
                  <Form.Label>Straße</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Straße'
                    value={this.user.street}
                    onChange={this.handleChange.bind(this, "street")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='formGridHousenumber'>
                  <Form.Label>Hausnummer</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Hausnummer'
                    value={this.user.houseNumber}
                    onChange={this.handleChange.bind(this, "houseNumber")}
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <Form.Group controlId='formGridCity'>
                  <Form.Label>Stadt</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Stadt'
                    value={this.user.city}
                    onChange={this.handleChange.bind(this, "city")}
                  />
                </Form.Group>
              </Col>

              <Form.Group controlId='formGridZip'>
                <Col>
                  <Form.Label>PLZ</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Postleitzahl'
                    value={this.user.PLZ}
                    onChange={this.handleChange.bind(this, "PLZ")}
                  />
                </Col>
              </Form.Group>
            </Form.Row>

            {this.loading ? (
              <Button variant='dark' disabled>
                <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                <span className='sr-only'>Loading...</span>
              </Button>
            ) : (
              <Button variant='dark' type='submit'>
                Registrieren
              </Button>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
