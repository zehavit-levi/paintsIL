import React, { useContext, useEffect, useState } from 'react';
import { Button, Carousel, Col, Container, Image, Modal, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
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
    const [show, setShow] = useState(false);
    const [buttonState, setButtonState] = useState();
    const activeUser = useContext(ActiveUserContext);

    useEffect(() => {
        async function fetchData() {
            const p = await CreationModel.getPaint(index);
            p.setWatched();
            if (!activeUser.watchedPaints.includes(p.id)) activeUser.setWatchedPaints(p.id);
            activeUser.savedPaints.includes(p.id) ? setButtonState("הסר") : setButtonState("שמור");
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
        if (!activeUser.savedPaints.includes(paint.id)) {
            paint.setSaved();
            activeUser.setSavedPaints(paint.id);
        }
    }

    const removePaint = () => {
        if (activeUser.savedPaints.includes(paint.id)) {
            paint.savedPaints = paint.removeSaved();
            activeUser.removeSavedPaint(paint.id);
        }
    }
//For the modal image view and encapsulation of remove and save buttons
    const saveOrRemove = () => {
        if (buttonState === "שמור") {
            savePaint();
            setButtonState("הסר")
        } else if (buttonState === "הסר") {
            removePaint();
            setButtonState("שמור");
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
                            {paint.density ? <> עובי: {paint.density}</> : null}
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
                                        <Col md="9" className="color-types-carusale">
                                            <ColorTypesView types={colorsTypes} />
                                        </Col>
                                    </Row>
                                </> : null}
                            <Row className="details price">מחיר: {paint.price}</Row>
                            {paint.story ? <Row className="details">תמה: {paint.story}</Row> : null}
                            <Row className="buttons-row">
                                <Col md="6"> {creator ? <Button size="md" className="eng" href={"mailto:" + creator.email}>Send Email</Button> : null}</Col>
                                <Col md="6"> {<Button size="md" variant={buttonState === "שמור" ? "success" : "danger"} onClick={() => saveOrRemove()} >{buttonState}</Button>}</Col>
                            </Row>
                        </Col>
                        <Col md="8">
                            {paint.additionalImg1 !== undefined || paint.additionalImg2 !== undefined ?
                                <Carousel prevLabel={null} nextLabel={null}>
                                    <Carousel.Item >
                                        <img onClick={() => setShow(true)}
                                            className="d-block w-100"
                                            src={paint.img}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                    {paint.additionalImg1 !== undefined ?
                                        <Carousel.Item>
                                            <img onClick={() => setShow(true)}
                                                className="d-block w-100"
                                                src={paint.additionalImg1}
                                                alt="Second slide"
                                            />
                                        </Carousel.Item> : null}
                                    {paint.additionalImg2 !== undefined ?
                                        <Carousel.Item>
                                            <img onClick={() => setShow(true)}
                                                className="d-block w-100"
                                                src={paint.additionalImg2}
                                                alt="Third slide"
                                            />
                                        </Carousel.Item> : null}
                                </Carousel>
                                :
                                <Image className="paint" src={paint.img} onClick={() => setShow(true)}></Image>}
                        </Col>
                    </Row>


                    <Modal
                        scrollable="true"
                        size="xl"
                        show={show}
                        onHide={() => setShow(false)}
                        aria-labelledby="example-custom-modal-styling-title">
                        <Modal.Header closeButton closeLabel="סגור">
                        </Modal.Header>
                        <Modal.Body>
                            <Image className="paint" src={paint.img} />
                        </Modal.Body>
                    </Modal>

                </>
                : null}



        </Container>
    );
}

export default CreationDetailsPage;