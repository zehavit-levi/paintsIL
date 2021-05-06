import React from 'react';

function SignUpPage(props) {
    return (
        <div>
           <h1>In SignUpPage</h1> 
           {
               props.isCreator === true ? <h2>is creator</h2> : <h2>is buyer</h2>
           }
        </div>
    );
}

export default SignUpPage;