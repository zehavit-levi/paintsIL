import React, { useContext, useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import ActiveUserContext from '../../shared/ActiveUserContext';
import UserModel from '../../models/UserModel';
import './LoginPage.css';


function LoginPage({ onLogin}) {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [showInvalidLogin, setShowInvalidLogin] = useState(false);
    const activeUser = useContext(ActiveUserContext);
    if (activeUser) {
        return <Redirect to="/home" />
    }
    async function login(e) {
        e.preventDefault();
        // Pass the username and password to logIn function
        // UserModel.login(email,pwd);
        try {
            const activeUser = await UserModel.login(email, pwd);
            onLogin(activeUser);
        } catch (error) {
            console.error('Error while logging in user', error);
            setShowInvalidLogin(true);
        }
    }
    return (
        <Container  className="bg-p-login">
            <div className="p-login col-md-10 col-lg-6">
                <h1 className="p-login-title">כניסה לאתר</h1>
                <p className="p-login-title">או <Link to="/">הרשמה לאתר</Link></p>
                {showInvalidLogin ? <Alert variant="danger">שם משתמש או סיסמה שגוי/ה!</Alert> : null}
                <Form className="form-login" onSubmit={login}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="eng">Email</Form.Label>
                        <Form.Control className="eng placeholder" type="email" placeholder="Email"
                            value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>סיסמה</Form.Label>
                        <Form.Control type="password" placeholder="סיסמה"
                            value={pwd} onChange={e => setPwd(e.target.value)} />
                    </Form.Group>
                    <Button className="submit-btn-login" type="submit" block>
                    כניסה
                    </Button>
                </Form>
                
            </div>
        </Container>
    );
}

export default LoginPage;