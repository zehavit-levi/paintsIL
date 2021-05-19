import { Carousel, Container } from 'react-bootstrap';

function ColorTypesView(props) {
    
    const items = props.types.map((colorType,index) => {
        return(
        <Carousel.Item key= {index}>
                    <img 
                        style={{width:"100%", opacity:"0.7", border: "2px inset"}}
                        src={colorType.img}
                        alt="First slide"

                    />
                    <Carousel.Caption >
                        <h4 style={{color:"black"}}>{colorType.name}</h4>
                    </Carousel.Caption>
                </Carousel.Item>
        )
    })
    return (
        <Container className="carouselContainer">
            <Carousel fade>
                {items ?  items : null}
            </Carousel>
        </Container>
    );
}

export default ColorTypesView;