import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import {MainView} from './components/main-view/main-view';
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

class MyFlixApplication extends React.Component {

   // constructor() {
       //Executed once component is created//
        // super();
   // }

    render() {
        return (
            <Provider store={store}>
            <Container>
                <MainView /> 
            </Container>
        </Provider> 
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