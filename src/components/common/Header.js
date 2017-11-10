import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

import LogoutButton from '../account/LogoutButton';
import './Header.css';

export default class Header extends Component {
  /*
  getUserInfo(){
    if (this.props.currentUser){
      //if user is logged in.....
      let displayName;
      if (this.props.currentUser.displayName && this.props.displayName.length > 0){
        displayName = this.props.currentUser.displayName;
      } else {
        displayName = this.props.currentUser.email;
      }
      return (
        <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>
          <img className='profile-picture'
            src={this.props.currentUser.photoURL} alt={this.props.currentUser.displayName} />
            {displayName} <span className='caret'></span>
        </a>
      );
    }else{
      //when no user logged in
      return <LogoutButton>Log out</LogoutButton>;
    }
  }
*/
  render() {
    return (
      <div className="navbar">
        <h1 className='navbar-brand'>Food<div class="roll-dice"></div>Dice</h1>
        <div className='links'>
          <a href="/Search">Search</a>
          <a href="/Random">Dont Even Care!</a>
        </div>
        <LogoutButton>Log out</LogoutButton>



      {/*
      <Router>
        <nav className='navbar navbar-fixed-top'>
          <div className='container'>
            <div className='navbar-container'>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded="false" aria-controls="navbar">
                <span className='sr-only'>Toggle Navigation</span>
              </button>
              <h1 className='navbar-brand'>Food<div class="roll-dice"></div>Dice</h1>
            </div>
            <div id='navbar' className='navbar-collapse collapse'>
              <ul className='nav navbar-nav navbar-right'>
                <li className='dropdown'>
                  {this.getUserInfo()}
                  <ul className='dropdown-menu'>
                    <li><Link to='/profile'>View Profile</Link></li>
                    <li role='separator' className='divider'></li>
                    <li><LogoutButton>Log Out</LogoutButton></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Router>
      */}
      </div>
    );
  }
}
