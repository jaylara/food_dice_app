import React, { Component } from 'react';
import {auth} from '../../utils/firebase.js';
import './LogoutButton.css';

class LogoutButton extends Component {
  handleClick(){
    auth.signOut();
  }

  render() {
    return (
      <a id="logout-button" onClick={this.handleClick} href="localhost:3000/">{ this.props.children }</a>
    )
  }
}

export default LogoutButton;
