import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./genre-view.scss";

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string,
  }),
  onBackClick: PropTypes.func.isRequired,
};
