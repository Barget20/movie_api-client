import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./movie-view.scss";

export class MovieView extends React.Component {
  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <>
        {movie && (
          <div className="movie-view">
            <div className="movie-poster">
              <img src={movie.ImagePath} />
            </div>
            <div className="movie-table">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <span className="label">Description: </span>
            <span className="value"> {movie.Description}</span>
            <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
            <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
            <Button
              onClick={() => {
                onBackClick(null);
              }}>
              Back
            </Button>
          </div>
        )}
      </>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
