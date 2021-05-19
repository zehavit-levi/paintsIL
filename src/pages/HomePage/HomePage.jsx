import React, { useContext, useEffect, useState } from 'react';
import ActiveUserContext from '../../shared/ActiveUserContext';
import { Card, Container } from 'react-bootstrap';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import ImgCard from '../../components/ImgCard/ImgCard';
import BuyerNavBar from '../../components/BuyerNavBar/BuyerNavBar';
import './HomePage.css';

function HomePage() {
    const [filterText, setFilterText] = useState();
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
    }, [activeUser])

    useEffect(() => {
        async function fetchData() {
            const paintsToSet = await activeUser.getFilterdPaints(filterText, filterBy);
            setFilterdPaint(paintsToSet);
        }
        if (activeUser) {
            fetchData();
        }
    }, [filterText, filterBy, activeUser])


    const paintsShowCreator = paints ? paints.map(paint => {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={paint.img} />
            </Card>
        )
    }) : null;


    const paintsShowBuyer = paints && !filterText ? paints.map((paint, index) => <ImgCard key={index} paint={paint} index={paint.id} />) :
        paints && filterdPaints ? filterdPaints.map((paint, index) => <ImgCard className="img-card" key={index} paint={paint} index={paint.id} />) : null;


    return (

        <div>
            {activeUser && activeUser.isCreator && paints ?

                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                    <Masonry>
                        {paintsShowCreator}
                    </Masonry>
                </ResponsiveMasonry>

                : paints ?
                    <Container>
                        <BuyerNavBar filterText={filterText} setFilterText={setFilterText} filterBy={filterBy} setFilterBy={setFilterBy} />
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                            <Masonry>
                                {paintsShowBuyer}
                            </Masonry>
                        </ResponsiveMasonry>
                    </Container> : null

            }
        </div>
    );
}

export default HomePage;