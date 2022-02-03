import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Card, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import ".profile-view.scss";


return (
  <Card>
    <Card.Body>
      <Row>
        <Col xs={12}>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>
    {/* <div>
    <p>User: {user.Username}</p>
    <p>Email: {user.Email}</p>
    <div> */}
      {favoriteMovieList.map((ImagePath, Title, _id) => {
        return (
          <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
          <Figure>
          <Link to={`/movies/${_id}`}>
            <Figure.Image
            src={movies.ImagePath}
            alt={movies.Title}
            />
            <Figure.Caption>
              {Title}
            </Figure.Caption>
          </Link>
          </Figure>
            
            <Button varient="secondary" onClick={() => removeFav(_id)}>
              Remove from list
            </Button>
            </Col>
        )})}
      </Card.Body>
  </Card>
);


    <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Want to change some info?</h2>
      <label>Username:</label>
      <input
        type="text"
        name="Username"
        defaultValue={user.Username}
        onChange={(e) => handleUpdate(e)}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        defaultValue={user.Password}
        onChange={(e) => handleUpdate(e)}
      />

      <label>Email address</label>
      <input
        type="email"
        name="email"
        defaultValue={user.Email}
        onChange={(e) => handleUpdate(e.target.value)}
      />
      <button varient="primary" type="submit">
        Update
      </button>
    </form>
