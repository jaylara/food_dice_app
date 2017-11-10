import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './Login.css';
//account/user component/dependency
import OAuthButton from '../account/OAuthButton';
import UserInfo from '../common/UserInfo';
import { auth } from '../../utils/firebase';

export default class Login extends Component {
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
    return (
      <div className="Login">
        <div id='header'>
          <h1>Welcome to<br></br>Food Dice</h1>
        </div>
        <OAuthButton currentUser={ this.state.currentUser } />
      </div>
    );
  }
}
