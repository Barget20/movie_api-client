import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";

//import '../movie-card/movie-card.scss';

export class MovieCard extends React.Component {
  constructor() {
    super();
  }
 
/* // Add movie to FavoriteMovies list */
onAddFavorite = (movie) => {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  axios
    .post(
      `https://movie-api-2022.herokuapp.com/users/${username}/favoritesList/${movie._id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}`},
      }
    )
    .then((response) => {
      console.log(response);
      alert("Movie added");
    })
    .catch(function (error) {
      console.log(error);
    });
};

render() {
  const { movie } = this.props;
  // const {favorites, setFavorites } = this.props;
  // const addFavoriteMovie = (movie) => {
  //   const newFavoriteList = {...favorites, movie};
  //   setFavorites(newFavoriteList);
  // };

  return (
    <Card>
      <Card.Img varient="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${movie._id}`}>
          <Button varient="link">Open</Button>
        </Link>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button varient="link">Director</Button>
        </Link>
        <Button onClick={() => this.onAddFavorite(movie)}>
          Add Favorite
        </Button>
      </Card.Body>
    </Card>
    );
  }
}


  

          

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
  // onMovieClick: PropTypes.func.isRequired
};
