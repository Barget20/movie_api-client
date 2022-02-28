import React, { useState} from 'react';

import '../registration-view/registration-view.scss';

export function RegistrationView(props) {
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