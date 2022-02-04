import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

//import '../movie-card/movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, setMovies } = this.props;
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
          {/* <Button className="favorites">
            <MovieList movies={movie} handleFavoritesClick={addFavoriteMovie} favoriteComponent={AddFavorites}
          </Button> */}
          <Link to={`/movies/${movie._id}`}>
            <Button varient="link">Open</Button>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button varient="link">Director</Button>
          </Link>

          {/* // Add movie to FavoriteMovies list */}
          onAddFavorite = (e, movie) = {
            e.preventDefault(),
            const Username = localStorage.getItem('user'),
            const token = localStorage.getItem('token'),

            axios
              .post(
                "https://movie-api-2022.herokuapp.com/users/${Username}/movies/$movie.id}",
                {
                  headers: { Authroization: `Bearer ${token}`},
                }
              )
              .then((reponse) => {
                console.log(response);
                alert("Movie added");
                this.componentDidMount();
              })
              .catch(function (error) {
                console.log(error);
              });
          };


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
