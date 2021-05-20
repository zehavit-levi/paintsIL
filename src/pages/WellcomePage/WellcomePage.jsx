
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
                <p>ברוכים הבאים לאתר</p>
                <p className="eng">PaintsIL</p>
                <p>האתר הישראלי לרכישת אומנות ישירות מהאומן, ללא דמי תיווך! </p>
                <p>בצורה נעימה וללא שטיקים</p>
                <p>*השירות באתר ניתן לרשומים בלבד</p>
                <p className="to-signup">להרשמה עליך לבחור</p>
                <div className="signup-buttons">
                    <MyButton href="/signup" onClick={signup} isCreator={true} text="אומן" />
                    <MyButton href="/signup" onClick={signup} isCreator={false} text="קונה" />
                </div>
            </div>

        </Container>
    );
}

export default WellcomePage;