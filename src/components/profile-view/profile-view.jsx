import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Card, Figure, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ".profile-view.scss";
import PropTypes from "prop-types";

export class ProfileView extends React.Component {
  constructor() {
    super ();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovieList: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

getUser = (token) => {
  const Username = localStorage.getItem('user');

  axios
  .get(`https://movie-api-2022.herokuapp.com/users/${Username}`, {
    headers: { Authorization: `Bearer ${token}`},
  })
  .then((response) => {
    this.setState({ 
    Username: response.data.Username,
    Password: response.data.Password,
    Email: response.data.Email,
    Birthday: response.data.Birthday,
    FavoriteMovieList: response.data.FavoriteMovies,
});
  })
  .catch(function (error) {
    console.log(error);
  });
};

//edit username
editUser =(e, newUsername, newPassword, newEmail, newBirthday) => {
  e.preventDefault();
  const Username = localStorage.getItem('user');
  const token= localStorage.getItem('token');

axios
  .put(`https://movie-api-2022.herokuapp.com/users/${Username}`,
  {
  Username: newUserName ? newUsername : this.state.Username,
    Password: newPassword ? newPassword : this.sate.Password,
    Email: newEmail? newEmail : this.state.Email,
    Birthday: newBirthday ? newBirthday : this.state.Birthday,
  },
  {
    headers: {Authroization: `Bearer ${token}`},
  })

  .then((response) => {
    console.log(response);
    alert("Profile updated!");
    this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
    });
  
    localStorage.setItem('user', response.data.Username);
    window.open('/profile', '_self');
  })
  .catch(function (error) {
    console.log(error);
  });
};

//delete a movie from FavoriteMovies list
onRemoveFavorite = (e, movie) => {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  axios
    .delete(
      `https://movie-api-2022.herokuapp.com/users/${username}/favoritesList/${movie._id}`,
      {
        headers: { Authroization: `Bearer ${token}`},
      }
    )
    .then((response) => {
      console.log(response);
      alert("Movie removed");
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
};

render () {
  const {movies} = this.props;
  const {Username, Birthday, Email, FavoriteMovieList} = this.state;

  if (!Username) {
    return null;
  }

return (
    <Container className="profile-view" align="center">
        <Card className="profile-card">
          <h2>Username: {`${this.state.Username}`}</h2>
          <p>Email: {`${this.sate.Email}`}</p>
          <p>Birthday: {`${this.state.Birthday}`}</p>
          </Card>
        
            <Card className="update-profile">
              <Card.Body>
                <Card.Title>Profile</Card.Title>
                <Form onSubmit={(e) => 
                this.editUser(e,
                  this.Username,
                  this.Password,
                  this.Email,
                  this.Birthday
                  )}
                  >

                  </Form>
              </Card.Body>
            </Card>
          
              <Form.Group controlId="formBasicusername">
                <Form.Label className="form-label">
                  Username
                  </Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Change Username"
                  value={user.Username}
                  onChange={(e) => this.setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">      
                </Form.Label>
                <Form.Control
                type="password"
                placeholder="New Password"
                onChange={(e) => this.setPassword (e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                type="email"
                placeholder="Change Email"
                onChange={(e) => this.setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Control
                type="date"
                placeholder="Change Birthday"
                onChange={(e) => this.setBirthday(e.target.value)}
                />
              </Form.Group>
                <Button variant="danger" type="submit">Update</Button>

      </Container>

      <Container>
        <Card.Body>
          <div className="favorite-movies">
            <h2>{`${Username}'s favorites`}</h2>
            {FavoriteMovieList.length > 0 &&
            movies.map((movie) => {
              if (
                movie._id ===
                FavoriteMovieList.find((favorite) => 
                favorite === movie._id)
              ) {
                return (
                  <Card className="fav-card" key={movie._id}>
                      <Card.Img className="movieCard"
                      variant="top"
                      src={movie.ImagePath} 
                      />
                      <Card.Body>
                        <Link to={`/movies/${movie.id}`}>
                          <Card.Title className="movie=card=title">
                            {movie.Title}
                          </Card.Title>
                        </Link>
                        <Button className="profile-button remove favorite"
                        size="sm"
                        variant="danger"
                        onClick={(e) => this.onRemoveFavorite(e, movie._id)}>
                          Remove
                        </Button>
                      </Card.Body>
                  </Card>
                );
              }
            })}
          </div>
        </Card.Body>
      </Container>
  );
}}



ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
          Bio: PropTypes.string.isRequired,
          Birth: PropTypes.string.isRequired,
          Death: PropTypes.string.isRequired,
          Name: PropTypes.string.isRequired,
      }).isRequired,
  })).isRequired,
  onBackClick: PropTypes.func.isRequired
};

