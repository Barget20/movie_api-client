import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

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

<nav class="navbar navbar-light by-light">
    <a class="navbar-brand" href='#'>Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse"
    data-target="#navbarNav" aria-controls="navbarNav" aria-exapnded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-link active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current) </span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Profile</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Signup</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Signout</a>
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
</nav>
);
}