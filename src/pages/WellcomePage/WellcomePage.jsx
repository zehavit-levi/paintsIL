
import React from 'react';
import { Container } from 'react-bootstrap';
import MyButton from '../../components/MyButton/MyButton';
import './WellcomePage.css';

function WellcomePage(props) {
    const signup = (isCreator => props.setIsCreator(isCreator));
    return (

        <Container className="p-wellcome">
            <div className="p-text-content">
                <MyButton href="/login" text="כניסה" />
                <h2>ברוכים הבאים לאתר</h2>
                <h1 className="eng">PaintsIL</h1>
                <h2>האתר הישראלי לרכישת אומנות ישירות מהאומן, ללא דמי תיווך! </h2>
                <h1>בצורה נעימה וללא שטיקים</h1>
                <h4>*השירות באתר ניתן לרשומים בלבד</h4>
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