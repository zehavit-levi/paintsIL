import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import BuyerNavBar from '../../components/BuyerNavBar/BuyerNavBar';
import UserModel from '../../models/UserModel';
import './ShowCreatorDetailsPage.css'

function ShowCreatorDetailsPage({ onLogout }) {
    const { index } = useParams();
    const [creator, setCreator] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const creator = await UserModel.getCreator(index);
            console.log(creator);
            setCreator(creator);
        }
        if (index) {
            fetchData();
        }
    }, [index])

    return (
        <Container className="p-show-creator-details">
            <BuyerNavBar onLogout={onLogout} />
            {creator ?
                <>
                    <h1 className="title">{creator.userName}</h1>
                    {creator.story? <Row className="story-container"><div className="story">{creator.story}</div></Row>:null}

                </>
                :
                null
            }
        </Container>
    );
}

export default ShowCreatorDetailsPage;