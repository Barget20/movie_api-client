import React, { useState} from 'react';
import PropTypes from 'prop-types';

import '../login-view/login-view.scss';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // sends a request to the server for authentication, 
        // then call props.onLoggedIn(ushername)
        props.onLoggedIn(username)
    };


        return (
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>    
                    <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
        );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        Title: PropTypes.string
    }).isRequired,
    onLoggedIn: PropTypes.func.isRequired
};