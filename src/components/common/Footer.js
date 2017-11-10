import React, { Component } from 'react';

import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div>
          <p>This web application uses the <a href="https://www.yelp.com/developers/documentation/v3" title="Yelp API">Yelp API</a>.</p>
          <img src="/Yelp_burst_negative_RGB.png" alt="Yelp Logo" width="100"/>
        </div>
        <p>Created at <b>GA</b> by<br/>
          <a href="https://github.com/CescoIV" target="_blank" title="Francisco Ordaz">Francisco Ordaz</a>,
          <a href="https://github.com/LallieDragon" target="_blank" title="Carrington Simecheck">Carrington Simecheck</a>,
          <a href="https://github.com/TheTeejers" target="_blank" title="TJ Loughry">TJ Loughry</a>,
          <a href="#" target="_blank" title="Jay">Jay</a>
        </p>
      </footer>
    );
  }
}
