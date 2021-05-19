import { Button } from 'bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ColorTypesView from '../../components/ColorTypesView/ColorTypesView';
import CreationModel from '../../models/CreationModel';
import ActiveUserContext from '../../shared/ActiveUserContext';
import './CreationDetailsPage.css';

function CreationDetailsPage(props) {
    const { index } = useParams();
    const [paint, setPaint] = useState();
    const [creator, setCreator] = useState();
    const [colorsTypes, setColorTypes] = useState();
    const activeUser = useContext(ActiveUserContext);

    useEffect(() => {
        async function fetchData() {
            const p = await CreationModel.getPaint(index);
            p.setWatched();
            if(!activeUser.watchedPaints.includes(p.id)) activeUser.setWatchedPaints(p.id);
            setPaint(p);
        }
        if (activeUser) {
            fetchData();
        }
    }, []);

    useEffect(() => {
        async function getCreator() {
            const creator = await paint.getCreator();
            setCreator(creator);
        }
        async function getColorsTypes() {
            const colors = await paint.getColorsTypes();
            console.log(colors);
            setColorTypes(colors);
        }
        if (paint) {
            getColorsTypes();
            getCreator();
        }
    }, [paint]);

    const savePaint = () => {
        if(!activeUser.savedPaints.includes(paint.id)){
        paint.setSaved();
        activeUser.setSavedPaints(paint.id);
        }
    }
    return (
        <Container className="p-creation-details">
            <Navbar className="buyer-navbar" bg="light" expand="lg">
                <Navbar.Brand href="/">PaintsIL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto col-lg-6">
                        <Nav.Link href="#home">עמוד הבית</Nav.Link>
                        <Nav.Link href="#saved">התמונות ששמרתי</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
            {paint ?
                <>
                    <Row>
                        <Col md="6">
                            <h1>שם היצירה : {paint.name}</h1>
                        </Col>
                        <Col md="2">
                            <h3>רוחב: {paint.width}</h3>
                        </Col>
                        <Col md="2">
                            <h3>אורך: {paint.height}</h3>
                        </Col>
                        <Col md="2">
                            {paint.density ? <h3>עובי: {paint.density}</h3> : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            {creator ? <Row>היוצר:  {creator.userName}</Row> : null}
                            {paint.creationDate ? <Row>תאריך יצירה: {paint.creationDate}</Row> : null}
                            <Row>תאריך העלאה לאתר: {paint.createdAt}</Row>

                            {colorsTypes ? 
                            <>
                                <Row>חומרים: </Row>
                                <Row>
                                    <ColorTypesView types={colorsTypes} />
                                </Row>
                            </> : null}
                            <Row>מחיר: {paint.price}</Row>
                            {paint.story ? <Row>תמה: {paint.story}</Row> : null}
                        </Col>
                        <Col md="6">
                            <Image src={paint.img}></Image>
                        </Col>
                    </Row>
                    <Row>
                        {/* <Button className="en">SMS</Button> */}
                        { creator?<a className="en" href={"mailto:" + creator.email}>Send Email</a> : null}
                        {!activeUser.savedPaints.includes(paint.id) ? <button onClick={()=>savePaint()} >שמור</button> : null}
                    </Row>

                </>
                : null}


        </Container>
    );
}

export default CreationDetailsPage;