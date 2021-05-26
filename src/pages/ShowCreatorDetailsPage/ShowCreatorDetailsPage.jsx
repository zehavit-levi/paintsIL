import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import BuyerNavBar from '../../components/BuyerNavBar/BuyerNavBar';
import ColorTypesView from '../../components/ColorTypesView/ColorTypesView';
import UserModel from '../../models/UserModel';
import './ShowCreatorDetailsPage.css'

function ShowCreatorDetailsPage({ onLogout }) {
    const { index } = useParams();
    const [creator, setCreator] = useState(null);
    const [colorsTypes, setColorsTypes] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const creator = await UserModel.getCreator(index);
            console.log(creator);
            setCreator(creator);
        }
        if (index) {
            fetchData();
        }
    }, [index]);

    useEffect(() => {
        async function getColorsTypes() {
            const colors = await UserModel.getColorsTypes(creator.colorsTypes);
            console.log(colors);
            setColorsTypes(colors);
        }
        if (creator) {
            getColorsTypes();
        }
    }, [creator]);

    return (
        <Container className="p-show-creator-details">
            <BuyerNavBar onLogout={onLogout} />
            {creator ?
                <>
                    <h1 className="title">{creator.userName}</h1>
                    {creator.story ? <Row className="story-container"><div className="story">{creator.story}</div></Row> : null}
            {colorsTypes?
                    <Row className="colors-types">
                        <Col md="3" className="colors-types-title">חומרים: </Col>
                        <Col md="9" className="colors-types-carusale">
                            <ColorTypesView types={colorsTypes} />
                        </Col>
                    </Row> : null}
                    <Row>
                        <Col lg="2" md="3" className="trends-title">זרמים באומנות: </Col>   
                        <Col lg="4" md="6" className="trends-names">
                            {creator.trends ? creator.trends.map(trend => <div>{trend}</div>) : null}
                            </Col>        
                    </Row>
                


                </>
                :
                null
            }
        </Container>
    );
}

export default ShowCreatorDetailsPage;