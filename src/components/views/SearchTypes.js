import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Random from '../results/Random';
import Search from '../results/Search';
import Header from '../common/Header';

import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className='Home'>
            <Header />
            <Route exact path='/' component={ () => <Search /> } />
            <Route path='/Search' component={ () => <Search /> } />
            <Route path='/Random' component={ () => <Random /> } />
          </div>
        </Router>
      </div>
    );
  } // end of render()
} // end of Home component
