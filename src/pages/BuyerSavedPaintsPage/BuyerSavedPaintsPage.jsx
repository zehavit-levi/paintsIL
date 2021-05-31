import React, { useContext, useEffect, useState } from 'react';
import ActiveUserContext from '../../shared/ActiveUserContext';
import { Container } from 'react-bootstrap';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import ImgCard from '../../components/ImgCard/ImgCard';
import BuyerNavBar from '../../components/BuyerNavBar/BuyerNavBar';
import './BuyerSavedPaintsPage.css';
import { Redirect } from 'react-router';
function BuyerSavedPaintsPage(props) {
    const activeUser = useContext(ActiveUserContext);
    const [paintsToShow, setPaintsToShow] = useState();    
    useEffect(() => {
        async function fetchData() {
            const PaintsToShow = await activeUser.getSavedPaints();
            setPaintsToShow(PaintsToShow);
        }
        if (activeUser) {
            fetchData();
        }
    }, [activeUser]);
   
    if (!activeUser) {
        return <Redirect to="/" />
    }
    return (
        <Container className="p-buyer-saved-paints">
            <BuyerNavBar onLogout={props.onLogout}/>
            {paintsToShow?
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 2, 900: 3 }}>
                <Masonry>
                   {paintsToShow.map((paint, index) => <ImgCard className="img-card" key={index} paint={paint} index={paint.id} />) }
                </Masonry>
            </ResponsiveMasonry>
            : null}
        </Container>


    );
}

export default BuyerSavedPaintsPage;