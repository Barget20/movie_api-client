import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
            ],
            selectedMmovie: null
        }
    }

    componentDidMount() {
        axios.get('https://movie-api-2022.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies: response.date
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render () {
        const { movies, selectedMovie} = this.state;
          
        if (movies.length === 0) return <div className="main-view"></div>;
            return(
              
                 <div className="main-view">
                    {selectedMovie ? (
                        <Row className="justify-content-md-center"> 
                            <Col md={6}>
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} /> 
                            </Col>
                        </Row>
                    )
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
                    ))}     
                 </div>
            );
    };
}