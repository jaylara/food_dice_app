import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

//account/user component/dependency
import OAuthButton from './components/account/OAuthButton';
import UserInfo from './components/common/UserInfo';
import { auth } from './utils/firebase';

import Home from './components/views/Home'
import Login from './components/views/Login'

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
return (
  <Router>
        <div>
          <nav>
            <Link to='/' exact= { true } >Login</Link>
            <Link to='/home' >Home</Link>

          </nav>
          <Switch>
            <Route exact path='/' component={ Login } />
            <Route path='/home' component={ Home } />
          </Switch>
        </div>
      </Router>
      )
  }
}
