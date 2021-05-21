import React from 'react';
import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import './SignUpPage.css';
import Parse from 'parse';
import UserModel from '../../models/UserModel';
import { Redirect } from 'react-router';

function SignUpPage({activeUser, onLogin, isCreator}) {
    const [showSignupError, setShowSignupError] = useState(false);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    if (activeUser) {
        return <Redirect to="/home"/>
    }

    async function signup(e) {
        e.preventDefault();
        // validation code is missing here...

        const activeUser = await UserModel.signup(email, fname, lname, pwd, isCreator);
        onLogin(activeUser);
    }

    return (
        <div className="p-signup">
            {!isCreator ?
            <>
            <h1 className="eng">PaintIL</h1>
            {showSignupError ? <Alert variant="danger">Error in Sign Up!</Alert> : null}
            <Form onSubmit={signup}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="eng">Email</Form.Label>
                    <Form.Control className="eng" type="email" placeholder="Enter email" 
                        value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>סיסמה</Form.Label>
                    <Form.Control type="password" placeholder="סיסמה" 
                        value={pwd} onChange={e => setPwd(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicFname">
                    <Form.Label>שם פרטי</Form.Label>
                    <Form.Control type="text" placeholder="שם פרטי" 
                        value={fname} onChange={e => setFname(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicLname">
                    <Form.Label>שם משפחה</Form.Label>
                    <Form.Control type="text" placeholder="שם משפחה" 
                        value={lname} onChange={e => setLname(e.target.value)} />
                </Form.Group>

                <Button variant="success" type="submit" block>
                    הרשם
                </Button>
            </Form> </>: <p>is craetor</p>}
        </div>
    );
   
}

export default SignUpPage;