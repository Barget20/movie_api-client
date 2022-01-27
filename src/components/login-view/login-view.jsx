import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

import axios from "axios";
import "../login-view/login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //need to add in API login//
    axios
      .post("https://movie-api-2022.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button varient="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
  OnLoggedIn: PropTypes.func.isrequired,
};

//   <label>
//     Username:
//     <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
//  </label>
//    <label>
//      Password:
//   <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
//   </label>
//       <button type="button" onClick={handleSubmit}>Submit</button>
// );
//}
