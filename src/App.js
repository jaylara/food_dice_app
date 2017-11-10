import React, { Component } from 'react';
import { auth } from './utils/firebase';

import Home from './components/views/Home';
import Login from './components/views/Login';
import './App.css';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };

  } // end of constructor

  componentWillMount() {
    auth.onAuthStateChanged(newUser => {
      this.setState({currentUser: newUser ? newUser : null});
    });
  } // end of componentWillMount()

  render() {
    if(this.state.currentUser) {
      return (<Home currentUser={this.state.currentUser} />);
    }
    else {
      return (<Login />);
    }
  }
}
