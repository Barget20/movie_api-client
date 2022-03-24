import React from "react";
import axios from "axios";
import "./main-view.scss";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
//Not reading menubar//
import { Menubar } from "../navbar/navbar";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { setMovies } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";
//Not reading container, navbar, or nav//
import { Row, Col, Container, Navbar, Nav } from "react-bootstrap";

//export 
class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  getMovies(token) {
    axios
      .get("https://movie-api-2022.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    
    let {movies} = this.props;
    let {user} =  this.state;

    return (
      <Router>

        <Menubar user={user}/>
{/* //The following breaks it */}
        {/* <Menubar onLoggedOut={() => this.onLoggedOut ()}/>
        <Row>
          {user && <Link to={`/users/${user}`} >logged in as {user} </Link>}
        </Row> */}

        <Row className="main-view justify-content-md-center">
        <Route exact path="/"
          render={() => {
            if (!user)
              return (
                <div>
                  {console.log("hi")}
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                 </div>
              );
                    return <MoviesList movies={movies}/>;
            }}
          />
        </Row>
  
        <Route
          path="/register"
          render={() => {
            if (user) return <Redirect to="/" />;
            return (
              <Col>
                <RegistrationView />
              </Col>
            );
          }}
        />

        <Route
          exact
          path="/movies/:movieId"
          render={({ match, history }) => {
            if (!user)
              return <LoginView OnLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />
        <Route
          exact
          path="/genres/:name"
          render={({ match, history }) => {
            if (!user)
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.name).Genre
                  }
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />
        <Route
          exact
          path="/directors/:name"
          render={({ match, history }) => {
            if (!user)
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <DirectorView
                  director={
                    movies.find((m) => m.Director.Name === match.params.name)
                      .Director
                  }
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />
        <Route
          path="/users/:username"
          render={({ history, match }) => {
            if (!user)
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={4}>
                <ProfileView
                  history={history}
                  movies={movies}
                  user={user === match.params.username}
                />
              </Col>
            );
          }}
        />
      </Router>
    );
  }
}


let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, {setMovies} )(MainView);
