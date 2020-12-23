import React from "react";
import { Carousel } from "react-bootstrap";

//Image Imports
import SliderOne from "../../resources/SliderOne.jpg";
import SliderTwo from "../../resources/RealBio.png";
import SliderThree from "../../resources/BioMobil.jpg";

class Home extends React.Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img className='d-block w-100' src={SliderOne} alt='First Slide' />
          <Carousel.Caption>
            <h3>BioKuma</h3>
            <p>Ihr Lokaler Bio-Supermarkt.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={SliderTwo} alt='Second slide' />
          <Carousel.Caption>
            <h3>Echt Bio</h3>
            <p>Alle Produkte sind Bio Zertifiziert.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={SliderThree} alt='Third slide' />
          <Carousel.Caption>
            <h3>Unser BioMobil</h3>
            <p>Wir bringen ihre Bestellung zu ihnen nach Hause.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default Home;
