import React from "react";

//Style Imports
import "../../stylesheets/noAdmin.css";

class NoAmdin extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='center'>
        <h2 className='leave-header'>
          Bitte gehen sie weiter. Sie sind kein Admin auf dieser Webseite.
        </h2>
      </div>
    );
  }
}

export default NoAmdin;
