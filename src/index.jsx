import React from 'react';
import ReactDOM from 'react-dom';
import {MainView} from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

import './index.scss';

class MyFlixApplication extends React.Component {

   // constructor() {
       //Executed once component is created//
        // super();
   // }

    render() {
        return (
            <Container>
                <MainView /> 
            </Container>
        );
    }

    //Executed after component is added to DOM//
    //componentDidMount () {
    //}

    //Executed after componenet state or props change//
    //componentDidUpdate() {
        //render();
        //The render() part represents a change in the state/prop
    //}

    //Executed before components removed from the DOM//
    //componenetWillUnmount() {
    //}
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);