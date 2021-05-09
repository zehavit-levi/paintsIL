import React, { useContext, useState } from 'react';
import Parse from 'parse';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import ActiveUserContext from '../../shared/ActiveUserContext';
import CreatorModel from '../../models/CreatorModel';
import BuyerModel from '../../models/BuyerModel';

function LoginPage({onLogin}) {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [showInvalidLogin, setShowInvalidLogin] = useState(false);
    const activeUser = useContext(ActiveUserContext);
    if (activeUser) {
        return <Redirect to="/home"/>
    }
    function login(e) {
        e.preventDefault();
        let activeUser = null;
        // Pass the username and password to logIn function
        Parse.User.logIn(email, pwd).then((parseUser) => {
          if(parseUser.get("isCreator")) {
                activeUser = new CreatorModel(parseUser);
                console.log((activeUser.type));
          }
          else{
            activeUser = new BuyerModel(parseUser);
          }
           onLogin(activeUser);
        }).catch(error => {
            console.error('Error while logging in user', error);
            setShowInvalidLogin(true);
        })
    }
    return (
        <div className="p-login">
            <h1>In LoginPage</h1>
            <p>or <Link to="/signup">create an account</Link></p>
            {showInvalidLogin ? <Alert variant="danger">Invalid Credentials!</Alert> : null}
            <Form onSubmit={login}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                        value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                        value={pwd} onChange={e => setPwd(e.target.value)} />
                </Form.Group>
                <Button variant="success" type="submit" block>
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default LoginPage;