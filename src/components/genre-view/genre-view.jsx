import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { movie, genre } = this.props;

    return (
      <Card>
        <Card.Img varient="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>Genre</Card.Title>
          <Card.Text>
            <span className="label">Name:</span>
            <span className="value">{genre.Name}</span>
          </Card.Text>
          <Card.Text>
            <span className="label">Description:</span>
            <span classname="value">{genre.Description}</span>  
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}


GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string,
  }),
  onBackClick: PropTypes.func.isRequired,
};
