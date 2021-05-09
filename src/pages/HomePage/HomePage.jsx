import React, { useContext, useEffect, useState } from 'react';
import ActiveUserContext from '../../shared/ActiveUserContext';
import Parse from 'parse';
import UserModel from '../../models/UserModel';

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
    
    return (

        <div>
            <h1>In HomePage</h1>
            {activeUser && activeUser.isCreator ?
                <>
                <h2>creator</h2>
                {paints.map(paint => <img src={paint.img} alt=""></img>)}
                </> :
                <>
                <h2> buyer</h2>
                {paints.map(paint => <img src={paint.img} alt=""></img>)}
                </>
            }
        </div>
    );
}

export default HomePage;