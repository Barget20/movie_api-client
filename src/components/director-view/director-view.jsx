import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { movie, director } = this.props;

    return (
      <Card>
        <Card.Img varient="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>Director</Card.Title>
          <Card.Text>
            <span className="label">Name:</span>
            <span className="value">{director.Name}</span>
          </Card.Text>
          <Card.Text>
            <span className="label">Birth:</span>
            <span className="value">{director.Birth}</span>
          </Card.Text>
          <Card.Text>
            <span className="label">Death:</span>
            <span className="value">{director.Death}</span>
          </Card.Text>
          <Card.Text>
            <span className="label">Popular Titles:</span>
            <span className="value">{director.PopTitles}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}


DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string,
    Deathyear: PropTypes.string,
  }),
  onBackClick: Proptypes.fun.isRequired,
};
