import React, { useContext, useEffect, useState } from 'react';
import ActiveUserContext from '../../shared/ActiveUserContext';
import { Card, Container } from 'react-bootstrap';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import ImgCard from '../../components/ImgCard/ImgCard';
import BuyerNavBar from '../../components/BuyerNavBar/BuyerNavBar';
import './BuyerSavedPaintsPage.css';
import PaintsContext from '../../shared/PaintsContext';
function BuyerSavedPaintsPage(props) {
    const activeUser = useContext(ActiveUserContext);
    const paints = useContext(PaintsContext);
    useEffect(() => {
        async function fetchData() {
            const PaintsToShow = await activeUser.getSavedPaints();
            props.setPaints(PaintsToShow);
        }
        if (activeUser) {
            fetchData();
        }
    }, [activeUser])
   
    const paintsShowBuyer = paints.map((paint, index) => <ImgCard key={index} paint={paint} index={paint.name} />);

    return (
        <Container>
            <BuyerNavBar />
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                <Masonry>
                    {paintsShowBuyer}
                </Masonry>
            </ResponsiveMasonry>
        </Container>


    );
}

export default BuyerSavedPaintsPage;