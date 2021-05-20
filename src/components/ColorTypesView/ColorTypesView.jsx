import { Carousel, Container } from 'react-bootstrap';

function ColorTypesView(props) {
    
    const items = props.types.map((colorType,index) => {
        return(
        <Carousel.Item key= {index}>
                    <img 
                        style={{width:"50%", opacity:"0.7", border: "2px inset"}}
                        src={colorType.img}
                        alt="First slide"

                    />
                    <Carousel.Caption style={{position:"relative"}}>
                        <h4 style={{color:"black",position:"absolute", bottom:"20"}}>{colorType.name}</h4>
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