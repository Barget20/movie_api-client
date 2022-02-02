import React, { useState } from "react";
import axios from "axios";
import { Form, Row, Col, Button, Container } from "react-bootstrap";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [values, setValues] = useState({
    nameErr: "",
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
  });

  const validate = () => {
    let isReq = true;
    if (!name) {
      setNameErr("Name is Required");
      isReq = false;
    }
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPassword("Password must be 6 characters long");
    }
    return isReq;
    if (!email) {
      setEmailErr("Email is Required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmail("Email is invalid");
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://movie-api-2022.herokuapp.com/users", {
          Name: name,
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, please login.");
          window.open("/", "_self");
        })
        .catch((e) => {
          console.error("error registering the user");
        });
    }
  };

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {vales.nameErr && <p>{values.nameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {vales.usernameErr && <p>{values.usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {values.passwordErr && <p>{values.passwordErr}</p>}
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {vales.emailErr && <p>{values.emailErr}</p>}
      </Form.Group>

      <Form.Group controlId="updateBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter birthday"
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Button varient="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
