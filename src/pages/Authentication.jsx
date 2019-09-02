import React, { Component } from 'react';
import Login from '../components/Login/Login';
import SignUp from '../components/Signup/Signup';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid">
        {this.props.path === 'login' && <Login />}

        {this.props.path === 'signup' && <SignUp />}
      </div>
    );
  }
}

export default Authentication;
