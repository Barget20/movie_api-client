import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//import '../movie-card/movie-card.scss';



export class MovieCard extends React.Component {
    render() {
        const {movie, onMovieClick } = this.props;

        return (
        <Card>
            <Card.Img varient="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} varient="link">Open</Button>
            </Card.Body>
        </Card>
        );
        return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};