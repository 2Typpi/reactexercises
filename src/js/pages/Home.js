import React from "react";
import { Button, Figure, Container, Row, Col } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

//config
import config from "../../config/main.config";

//Style
import "../../stylesheets/home.css";

class Home extends React.Component {
  render() {
    return (
      <div className='homeLogo'>
        <Figure.Image src={config.BASE_URL + "images/BioKuma.png"} className='logoImage' />
        <h1 className='header'>Herzlich Willkommen</h1>
        <Container>
          <Row>
            <Col sm={12} md={12} lg={8} xl={8}>
              <h2 className='openingHeader'>Neue Öffnungszeiten</h2> <hr />{" "}
              <h2 className='openingHeader'>
                von Montag bis Samstag <br /> 09:00 bis 13:00 und 15:00 bis 19:00 Uhr
              </h2>
              <p>
                Wir bitten um Ihr Verständnis für unsere neuen Öffnungszeiten, um uns und unsere
                Mitarbeiter zu schützen. Ausnahmslos nur noch Menschen mit Maske im Bioladen zu
                sehen und selbst dauerhaft mit dieser zu arbeiten, hat unserer Meinung nach negative
                Auswirkungen auf Psyche und Gesundheit.
              </p>
              <p>
                Für jeden der nicht mit Maske einkaufen will, bieten wir weiterhin unseren
                Lieferservice an. Diesen erweitern wir durch einen Abholservice, den Einkauf können
                sie in unserem neuen Online Shop tätigen. Ihren Einkauf können Sie dann von 19:30
                bis 20:00 Uhr bei uns abholen.
              </p>
              <p>
                Mit gegenseitiger Unterstützung, schaffen wir es aus der aktuellen Lage das Beste zu
                machen.
              </p>
              <p>Liebe Grüße, Ihr BioKuma-Team</p>
            </Col>
            <Col sm={12} md={12} lg={4} xl={4}>
              <Figure.Image
                src={config.BASE_URL + "images/businessCard.jpg"}
                className='logoImage'
              />
              <Button
                id='facebookButton'
                className='socialMediaButton'
                href='http://www.facebook.com/sharer.php?u=https://www.biokuma.de/&t=Start'
              >
                <Icon.Facebook className='socialMediaIcon' />
              </Button>
              <Button
                id='twitterButton'
                className='socialMediaButton'
                variant='dark'
                href='http://twitter.com/share?text=Start&url=https%3A%2F%2Fwww.biokuma.de%2F'
              >
                <Icon.Twitter className='socialMediaIcon' />
              </Button>
              <Button
                id='mailButton'
                className='socialMediaButton'
                variant='dark'
                href='mailto:?subject=Start&body=https://www.biokuma.de/'
              >
                <Icon.Envelope className='socialMediaIcon' />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;

/*       <Carousel>
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
        </Carousel> */
