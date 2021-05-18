import { Carousel } from 'react-bootstrap';

function ColorTypesView(props) {
    
    const items = props.types.map(colorType => {
        return(
        <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={colorType.img}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h4>{colorType.name}</h4>
                    </Carousel.Caption>
                </Carousel.Item>
        )
    })
    return (
        <div>
            <Carousel fade>
                {items ?  items : null}
            </Carousel>
        </div>
    );
}

export default ColorTypesView;