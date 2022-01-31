import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./main-view.scss";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Row, Col, Button, Card, Navbar, Nav } from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://movie-api-2022.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accesstoken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
    }
    // axios
    //   .get("https://movie-api-2022.herokuapp.com/movies")
    //   .then((response) => {
    //     this.setState({
    //       movies: response.data,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(user) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }



  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <Row>
      <col>
        <LoginView OnLoggedIn={user => this.onLoggedIn(user)} />
      </col>
    </Row>

    if (movies.length === 0) return <div className="main-view"/>;
    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieID" render={({ match }) =>
        {return <Col md={8}>
          <MovieView movie ={movies.find(m._id === match.params.movieId)} />
        </Col>}  
        } /> 
        </Row>
      </Router>
    );
  }
}

<Router>
  <div className="main-view">
    <Route exact path="/" render={}/>
    <Route exact path="/movies/:movieId" render={({ match, history }) => {
      return <Col md={8}>
        <MovieView movie={movies.find(m => m._Id === match.params.MovieId)} 
        onBackClick={() => history.goBack()} />
      </Col>
    }} />
    <Route exact path="/genres:name" render={({ match}) => {
      if (movies.length ===0) return <div className="main-view" />;
      return <Col md={8}>
        <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
      </Col>
    }} />
    <Route exact path="/directors/:name" render={({ match, history}) => {
      if (movies.length === 0) return <div className="main-view" />;
      return <Col md={8}>
        <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
      </Col>
    }} />
  </div>
</Router>

//       <Row className="main-view">
//         <Nav
//           activeKey="/home"
//           onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
//         >
//           <Nav.Item>
//             <Nav.Link href="/home">Active</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="link-1">Link</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="link-2">Link</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="disabled" disabled>
//               Disabled
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//         {selectedMovie ? (
//           <Row className="justify-content-md-center">
//             <Col md={3}>
//               <MovieView
//                 movie={selectedMovie}
//                 onBackClick={(newSelectedMovie) => {
//                   this.setSelectedMovie(newSelectedMovie);
//                 }}
//               />
//             </Col>
//           </Row>
//         ) : (
//           movies.map((movie) => (
//             <MovieCard
//               key={movie._id}
//               movie={movie}
//               onMovieClick={(newSelectedMovie) => {
//                 this.setSelectedMovie(newSelectedMovie);
//               }}
//             />
//           ))
//         )}
//       </Row>
//     );
//   }
// }

export default MainView;
