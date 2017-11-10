import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../common/Header';
import SearchTypes from '../views/SearchTypes.js';

export default class Home extends Component {
  render() {
    return (
      <SearchTypes />
    );
  }
}
