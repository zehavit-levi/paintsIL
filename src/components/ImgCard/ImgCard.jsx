import React, { useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import { Redirect } from 'react-router';

function ImgCard({paint,index}) {
    const [redirectTo, setRedirectTo] = useState();
    if (redirectTo !== undefined) {
        return <Redirect to={'/creation/' + redirectTo}/>
    }
    return (
        <Card className="img-card" onDoubleClick={() => console.log(paint)}
            onClick={() => setRedirectTo(index)}>
            <Image src={paint.img} ></Image>
        </Card>
    );
}

export default ImgCard;