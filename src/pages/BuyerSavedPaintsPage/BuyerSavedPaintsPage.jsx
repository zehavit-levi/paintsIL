import React, { useContext, useEffect, useState } from 'react';
import ActiveUserContext from '../../shared/ActiveUserContext';
import { Container } from 'react-bootstrap';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import ImgCard from '../../components/ImgCard/ImgCard';
import BuyerNavBar from '../../components/BuyerNavBar/BuyerNavBar';
import './BuyerSavedPaintsPage.css';
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
    }, [])
   
    return (
        <Container className="p-buyer-saved-paints">
            <BuyerNavBar />
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                <Masonry>
                    {paintsToShow? paintsToShow.map((paint, index) => <ImgCard key={index} paint={paint} index={paint.id} />) : null}
                </Masonry>
            </ResponsiveMasonry>
        </Container>


    );
}

export default BuyerSavedPaintsPage;