import React, { Component } from 'react';


//the purpose of this class is to test the output of basic user info.
//to confirm that the user's info is available
export default class UserInfo extends Component {

  //diplays User Information
  displayUserInfo() {
    let info = JSON.stringify(this.props.currentUser);
    return (
      <div>
        <h2>{this.props.currentUser.displayName}</h2>
        <img width="100px" src={this.props.currentUser.photoURL} alt={this.props.currentUser.displayName} />
        <p>{info}</p>
      </div>
    );
  } // end of displayUserInfo()

  render() {
    if(this.props.currentUser)
      return this.displayUserInfo();
    else
      return <div><h2>User Is Not Logged In!</h2></div>

  } // end of render
} // end of UserInfo class
