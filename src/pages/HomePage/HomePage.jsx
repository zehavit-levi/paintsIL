import React, { useContext } from 'react';
import ActiveUserContext from '../../shared/ActiveUserContext';

function HomePage(props) {
    const activeUser = useContext(ActiveUserContext);
    return (

        <div>
            <h1>In HomePage</h1>
            {activeUser.type === "creator" ?
            <h2>creator</h2> :
            <h2> buyer</h2>
            }
        </div>
    );
}

export default HomePage;