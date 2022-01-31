import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

import "./movie-view.scss";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    // Not sure where to put this. problems pop up
    // <Link to={`/directors/${movie.Director.Name}`}>
    //   <Button varient="link">Director</Button>
    // </Link>

    // <Link to={`/genres/${movie.Genre.Name}`}>
    //   <Button varient="link">Genre</Button>
    // </Link>

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-table">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description curtain">
          <div className="curtain__wrapper">
            <input type="checkbox" checked />

            <div className="curtain__panel curtain__panel--left">
              <h1></h1>
            </div>
            {/* //curtain__panel */}

            <div className="curtain__content">
              <span className="label"> Description: </span>
              <span className="value"> {movie.Description}</span>
            </div>

            <div className="curtain__panel curtain__panel--right">
              <h1></h1>
            </div>
            {/* <!-- curtain__panel --> */}
          </div>
          {/* <!-- curtain__wrapper --> */}
          <span className="label"> Description: </span>
          <span className="value"> {movie.Description}</span>
        </div>

        <Button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
