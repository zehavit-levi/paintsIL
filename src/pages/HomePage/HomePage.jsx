import React, { useContext, useEffect, useState } from 'react';
import ActiveUserContext from '../../shared/ActiveUserContext';
import { Card, Container } from 'react-bootstrap';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import ImgCard from '../../components/ImgCard/ImgCard';
import BuyerNavBar from '../../components/BuyerNavBar/BuyerNavBar';
import './HomePage.css';
import { Redirect } from 'react-router';
import CreatorNavBar from '../../components/CreatorNavBar/CreatorNavBar';

function HomePage({ onLogout }) {
    const [filterText, setFilterText] = useState("");
    const [filterBy, setFilterBy] = useState("userName");
    const [filterdPaints, setFilterdPaint] = useState();
    const [paints, setPaints] = useState([]);
    const activeUser = useContext(ActiveUserContext);

    useEffect(() => {
        async function fetchData() {
            const paintsToSet = await activeUser.getPaints();
            setPaints(paintsToSet);
        }
        if (activeUser) {
            fetchData();
        }
    }, [activeUser]);

    useEffect(() => {
        async function fetchData() {
            const paintsToSet = await activeUser.getFilterdPaints(filterText, filterBy);
            setFilterdPaint(paintsToSet);
        }
        if (activeUser) {
            fetchData();
        }
    }, [filterText, filterBy, activeUser]);

    if (!activeUser) {
        return <Redirect to="/" />
    }

    const paintsShowCreator = paints ? paints.map(paint => {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={paint.img} />
            </Card>
        )
    }) : null;


    const paintsShowBuyer = paints && !filterText ? paints.map((paint, index) => <ImgCard className="img-card" key={index} paint={paint} index={paint.id} />) :
        paints && filterdPaints ? filterdPaints.map((paint, index) => <ImgCard className="img-card" key={index} paint={paint} index={paint.id} />) : null;


    return (

        <Container className="p-homepage">
            {activeUser && activeUser.isCreator && paints ?
                <>
                    <CreatorNavBar onLogout={onLogout} />
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 2, 900: 3 }}>
                        <Masonry>
                            {paintsShowCreator}
                        </Masonry>
                    </ResponsiveMasonry>
                </>
                : paints ?
                    <>
                        <BuyerNavBar filterText={filterText} setFilterText={setFilterText} filterBy={filterBy} setFilterBy={setFilterBy} page="home" onLogout={onLogout} />
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 2, 900: 3 }}>
                            <Masonry>
                                {paintsShowBuyer}
                            </Masonry>
                        </ResponsiveMasonry>
                    </> : null

            }
        </Container>
    );
}

export default HomePage;