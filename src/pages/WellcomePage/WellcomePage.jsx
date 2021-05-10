
import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import MyButton from '../../components/MyButton/MyButton';
import './WellcomePage.css';

function WellcomePage(props) {
    const signup = (isCreator => props.setIsCreator(isCreator));
    return (

        <Container className="p-wellcome">
            <div className="p-text-content">
                <MyButton href="/login" text="כניסה" />
                <p><h2>ברוכים הבאים לאתר</h2></p>
                <p><h1 className="eng">PaintsIL</h1></p>
                <p><h2>האתר הישראלי לרכישת אומנות ישירות מהאומן, ללא דמי תיווך! </h2></p>
                <p><h1>בצורה נעימה וללא שטיקים</h1></p>
                <p><h4>*השירות באתר ניתן לרשומים בלבד</h4></p>
                <h2>להרשמה עליך לבחור</h2>
                <div className="signup-buttons">
                    <MyButton href="/signup" onClick={signup} isCreator={true} text="אומן" />
                    <MyButton href="/signup" onClick={signup} isCreator={false} text="קונה" />
                </div>
            </div>

        </Container>
    );
}

export default WellcomePage;