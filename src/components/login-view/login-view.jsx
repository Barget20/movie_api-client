<<<<<<< Updated upstream
=======
import React, { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//import '../login-view/login-view.scss';

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
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button varient="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>
        );
    }

             //   <label>
               //     Username:
               //     <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
              //  </label>
            //    <label>
              //      Password:
                 //   <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
             //   </label>    
             //       <button type="button" onClick={handleSubmit}>Submit</button>
       // );
//}
>>>>>>> Stashed changes
