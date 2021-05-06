
import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import LoginOut from '../../components/LogInOut/LoginOut';

function WellcomePage(props) {
    
    return (
        <Container>

            <LoginOut></LoginOut>
            <Row><h3>ברוכים הבאים ל paintIL!!!</h3></Row>
            <Row><h2>האתר הישראלי לרכישת אומנות ישירות מהאומן, ללא דמי תיווך, בצורה נעימה וללא שטיקים </h2></Row>
            <Row>השירות באתר ניתן לרשומים בלבד</Row>
            <Row>
                <h3>להרשמה עליך לבחור</h3>
                <Col className="col-6">
                    <Button href="#/signup" onClick={()=>props.setIsCreator(true)}>אומן</Button>
                </Col>
                <Col className="col-6">
                    <Button href="#/signup" onClick={()=>props.setIsCreator(false)}>קונה</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default WellcomePage;