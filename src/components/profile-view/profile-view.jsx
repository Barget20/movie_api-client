import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Card, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import ".profile-view.scss";

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

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
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
    FavoriteMovieList: response.data.FavoriteMovieList,
});
  })
  .catch(function (error) {
    console.log(error);
  });
};

//edit username
editUser =(e) => {
  e.preventDefault();
  const Username = localStorage.getItem('user');
  const token= localStorage.getItem('token');

axios
  .put(`https://movie-api-2022.herokuapp.com/users/${Username}`,
  {
  Username: this.state.Username,
    Password: this.sate.Password,
    Email: this.state.Email,
    Birthday: this.state.Birthday,
  },
  {
    headers: {Authroization: `Bearer ${token}`},
  })

  .then((response) => {
    this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
    });
  
    localStorage.setItem('user', this.state.Username);
    alert("Profile updated");
    window.open('/profile', '_self');
  });
};

//delete a movie from FavoriteMovies list
onRemoveFavorite = (movie) => {
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
    })
};

render () {
  const {movies, onBackClick, Button} = this.props;
  const {Username, Birthday, Email, FavoriteMovieList} = this.state;

  if (!Username) {
    return null;
  }

  return (
    <Container className="profile-view" align="center">
      <Row>
        <Col>
        <Card className="update-profile">
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            <Form
            className="update-form"
            onSubmit={(e) =>
              this.editUser(
                e,
                this.Username,
                this.Password,
                this.Email,
                this.Birthday
              ) 
            }
            >
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                type="text"
                name="Username"
                placeholder="New Username"
                value={user.Username}
                onChange={(e) => this.setUsername(e.target.value)}
                required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                name="Password"
                placeholder="New Password"
                value={user.Password}
                onChange={(e) => this.setPassword(e.target.value)}
                required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                name="Email"
                placeholder="Enter Email"
                value={user.Email}
                onChange={(e) => this.setEmail(e.target.value)}
                required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                type="date"
                name="Birthday"
                value={user.Birthday}
                onChange={(e) => this.setBirthday(e.target.value)}
                />
              </Form.Group>
              <div className="mt-3">
                <Button variant="success" type="submit" onClick={this.editUser}>Update User</Button>
                <Button className="m1-3" variant="secondary" onClick={() => this.onDeleteuser()}>Delete User</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col>
            <h4>{Username} Favorite Movies </h4>
        </Col>
      </Row>
      <Row>
            <Col>
            <Card.Body>
              {FavoriteMoviesList.length === 0 && (
                <div className="text-center">No Favorite Movies</div>
              )}
              <Row className="favorite-container">
                {FavoriteMoviesList.legnth > 0 &&
                {movies.map(movie) => {
                  if (
                    movie._id ===
                    FavoriteMovies.find((fav) => fav === movie._id)
                  ) {
                    return (
                      <Card className="favorite-movie card-content" key={movie._id} >
                        <Card.Img
                        className="fav-poster"
                        variant="top"
                        src={movie.ImagePath}
                      />
                      <Card.Body style={{ backgroundColor: ""}}>
                        <Card.Title className="movie_title">
                          {movie.Title}
                        </Card.Title>
                        <Button size="sm" variant="" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove</Button>
                      </Card.Body>
                    </Card>
                    ); 
                )
              </Row>
            </Card.Body>
            </Col>
      </Row>
    <div className="backButton">
      <Button varient="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
    </div>
    <br />
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

