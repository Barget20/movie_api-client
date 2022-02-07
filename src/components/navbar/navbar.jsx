import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

export function Menubar({user}) {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }

    const isAuth = () =>{
        if(typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return ( 

<Nav className="navbar navbar-light by-light">
    <a className="navbar-brand" href='#'>Navbar</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse"
    data-target="#navbarNav" aria-controls="navbarNav" aria-exapnded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-link active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current) </span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Profile</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Signup</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Signout</a>
            </li>
        {isAuth() && (
            <Nav.Link href={'/user/$(user)'}>{user}</Nav.Link>
        )}
        {isAuth() && (
            <Button varient="link" onClick={() => 
            {this.onLoggedOut() }}>Logout</Button>
        )}
        {!isAuth() && (
            <Nav.Link href="/">Sign-in</Nav.Link>
        )}
        {!isAuth() && (
            <Nav.Link href="/register">Sign-up</Nav.Link>
        )}
        </ul>
    </div>
</Nav>
);
}