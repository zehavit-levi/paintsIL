import { Button } from 'bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { Carousel, Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import BuyerNavBar from '../../components/BuyerNavBar/BuyerNavBar';
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

    const removePaint = () =>{
        if(activeUser.savedPaints.includes(paint.id)){
            paint.removeSaved();
            activeUser.removeSavedPaint(paint.id);
        }
    }
    return (
        <Container className="p-creation-details">
            <BuyerNavBar />
            {paint ?
                <>
                    <Row>
                        <Col className="paint-name" md="6">
                            שם היצירה : {paint.name}
                        </Col>
                        <Col md="2">
                           רוחב: {paint.width}
                        </Col>
                        <Col md="2">
                            אורך: {paint.height}
                        </Col>
                        <Col md="2">
                            {paint.density ?<> עובי: {paint.density}</>: null}
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            {creator ? <Row className="details">היוצר:  {creator.userName}</Row> : null}
                            {paint.creationDate ? <Row className="details">תאריך יצירה: {paint.creationDate}</Row> : null}
                            <Row className="details">תאריך העלאה לאתר: {paint.createdAt}</Row>

                            {colorsTypes ? 
                            <>
                               
                                <Row>
                                    <Col md="3" className="details">חומרים: </Col>
                                    <Col md="9" >
                                    <ColorTypesView  types={colorsTypes} />
                                    </Col>
                                </Row>
                            </> : null}
                            <Row className="details">מחיר: {paint.price}</Row>
                            {paint.story ? <Row className="details">תמה: {paint.story}</Row> : null}
                        </Col>
                        <Col md="8">
                            {paint.additionalImg1 || paint.additionalImg2 ? 
                            <Carousel>
                            <Carousel.Item >
                              <img
                                className="d-block w-100"
                                src={paint.img}
                                alt="First slide"
                              />
                            </Carousel.Item>
                            {paint.additionalImg1 ? 
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                src={paint.additionalImg1}
                                alt="Second slide"
                              />
                            </Carousel.Item> : null}
                            {paint.additionalImg2? 
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                src={paint.additionalImg2}
                                alt="Third slide"
                              />
                            </Carousel.Item> : null}
                          </Carousel>
                            :
                            <Image className="paint" src={paint.img}></Image>}
                        </Col>
                    </Row>
                    <Row>
                        {/* <Button className="en">SMS</Button> */}
                        { creator?<a className="en" href={"mailto:" + creator.email}>Send Email</a> : null}
                        {!activeUser.savedPaints.includes(paint.id) ? <button onClick={()=>savePaint()} >שמור</button> : <button onClick={()=>removePaint()} >הסר</button>}
                    </Row>

                </>
                : null}


        </Container>
    );
}

export default CreationDetailsPage;