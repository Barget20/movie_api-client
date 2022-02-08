import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Menubar({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  return (
    <div style={{ marginBottom: 80 }}>
      <Navbar
        expand="lg"
        fixed="top"
        className="nav-bar"
        // bg="primary"
        varient="dark"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={`/`}>
              Home
            </Nav.Link>
            {user && (
              <Nav.Link as={Link} to={`/users/${user}`}>
                My Account
              </Nav.Link>
            )}
          </Nav>

          {user && (
            <Link to={`/`}>
              <Button
                varient="dark"
                className="logout-button"
                onClick={() => onLoggedOut()}
              >
                Logout
              </Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
