import { Carousel, Container } from 'react-bootstrap';
import './ColorTypesView.css';

function ColorTypesView(props) {

    const items = props.types.map((colorType, index) => {
        return (
            <Carousel.Item key={index}>
                <img className="carouselImg"
                    src={colorType.img}
                    alt="First slide"

                />
                <Carousel.Caption className="caption">
                   {colorType.name}
                </Carousel.Caption>
            </Carousel.Item>
        )
    })
    return (
        <Container className="carouselContainer">
            {props.types.length > 1 ?
                <Carousel fade prevLabel={null} nextLabel={null}>
                    {items ? items : null}
                </Carousel>
                :
                <>
                    <img className="carouselImg"
                        src={props.types[0].img}
                        alt="First slide"
                    />
                    <h4>{props.types[0].name}</h4>
                </>}
        </Container>
    );
}

export default ColorTypesView;