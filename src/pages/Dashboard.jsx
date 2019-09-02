import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    const isLoggedIn = this.props.auth;

    console.log(isLoggedIn);

    if (!isLoggedIn) return <Redirect to="/login" />;

    return <div>This is Dashboard.</div>;
  }
}

export default Dashboard;
