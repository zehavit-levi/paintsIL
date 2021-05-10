import React, { useContext, useEffect, useState } from 'react';
import ActiveUserContext from '../../shared/ActiveUserContext';
import { Card} from 'react-bootstrap';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import ImgCard from '../../components/ImgCard/ImgCard';

function HomePage(props) {
    const [paints, setPaints] = useState([]);
    const activeUser = useContext(ActiveUserContext);

    useEffect(() => {
        async function fetchData() {
            const PaintsToShow = await activeUser.getPaints();
            setPaints(PaintsToShow);
        }
        if (activeUser) {
            fetchData();
        }
    }, [activeUser])

    const paintsShowCreator = paints.map(paint => {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={paint.img}/>
            </Card>
        )
    });
  

    const paintsShowBuyer = paints.map((paint, index) => <ImgCard key={index} paint={paint} index={paint.name}/>);

    return (

        <div>
            {activeUser && activeUser.isCreator ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                    <Masonry>
                        {paintsShowCreator}
                    </Masonry>
                </ResponsiveMasonry>
                :
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                    <Masonry>
                        {paintsShowBuyer}
                    </Masonry>
                </ResponsiveMasonry>
               
            }
        </div>
    );
}

export default HomePage;