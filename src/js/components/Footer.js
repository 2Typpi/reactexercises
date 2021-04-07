import React from "react";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

//Styling
import "../../stylesheets/footer.css";
import "../../stylesheets/socialButtons.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className='footer-distributed'>
        <div class='footer-right'>
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
        </div>

        <div class='footer-left'>
          <p class='footer-links'>
            <a href='#/about'>Über uns</a> · <a href='#/contact'>Kontakt</a> ·{" "}
            <a href='#/FAQ'>FAQ</a> · <a href='#/privacy'>Datenschutz</a> ·{" "}
            <a href='#/imprint'>Impressum</a>
          </p>

          <p>BioKuma © 2021</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
