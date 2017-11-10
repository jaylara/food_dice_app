import React, { Component } from 'react';
import {firebase, auth } from '../../utils/firebase'
import './OAuthButton.css';
//initially github will be used for basic authentication/OAuth_Handler.
//plans include addition of Google.
//Output: A single Login Button if the user is not logged in or
//        a Logout Button if the user is logged in
export default class OAuthButton extends Component {

  //handles the login anchor's onClick event (if displayed)
  //logs user into the application
  handleLogin() {
    auth.signInWithPopup (new firebase.auth.GithubAuthProvider());
  } // end of handleLogin()

  //handles the logout anchor's onClick event (if displayed)
  //logs user out of application
  handleLogout(e) {
    auth.signOut()
      .then(() => { console.log('Log out successful!') },
       (error) => { console.log('Log out failed') }
    );
  } // end of handleLogout()

  //diplays Login Button. gives user the opportunity to login
  displayLoginButton() {
    return (
      <button className="btn-login btn btn-primary" onClick={this.handleLogin}>
        { this.props.children || 'Login with Github' }
      </button>
    );
  } // end of displayLoginButton()

  //diplays Logout Button. gives user the opportunity to logout
  displayLogoutButton() {
    return (
      <button className="btn-logout btn btn-primary" onClick={this.handleLogout}>
        { this.props.children || 'Log Out' }
      </button>
    );
  } // end of displayLogoutButton()

  render() {
    //displays Logout Button if user is logged in
    //displays Login Button if user is logged out
    if(this.props.currentUser)
      return this.displayLogoutButton();
    else
      return this.displayLoginButton();
  } // end of render
} // end of OAuthButton class
