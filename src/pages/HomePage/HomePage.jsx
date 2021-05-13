import React, { useContext, useEffect, useState } from 'react';
import ActiveUserContext from '../../shared/ActiveUserContext';
import { Card, Container } from 'react-bootstrap';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import ImgCard from '../../components/ImgCard/ImgCard';
import BuyerNavBar from '../../components/BuyerNavBar/BuyerNavBar';
import './HomePage.css';
import UserModel from '../../models/UserModel';

function HomePage(props) {
    const [filterText, setFilterText] = useState();
    const [filterBy, setFilterBy] = useState("fName");
    const [filterdPaints, setFilterdPaint] = useState()
    const activeUser = useContext(ActiveUserContext);
    
    useEffect(() => {
        async function fetchData() {
            const paintsToSet = await activeUser.getPaints();
            props.setPaints(paintsToSet);
        }
        if (activeUser) {
            fetchData();
        }
    }, [activeUser,props])

    useEffect(() => {
        async function fetchData() {
            const paintsToSet = await activeUser.getFilterdPaints(filterText, filterBy);
            setFilterdPaint(paintsToSet);
        }
        if (activeUser) {
            fetchData();
        }
    }, [filterText, filterBy,activeUser])


    const paintsShowCreator = props.paints ? props.paints.map(paint => {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={paint.img} />
            </Card>
        )
    }) : null;


    const paintsShowBuyer = props.paints && !filterText ? props.paints.map((paint, index) => <ImgCard key={index} paint={paint} index={index} />):
    props.paints && filterdPaints ? filterdPaints.map((paint, index) => <ImgCard className="img-card" key={index} paint={paint} index={index} />) : null;
    

    return (

        <div>
            {activeUser && activeUser.isCreator && props.paints ?

                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                    <Masonry>
                        {paintsShowCreator}
                    </Masonry>
                </ResponsiveMasonry>

                : props.paints ?
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