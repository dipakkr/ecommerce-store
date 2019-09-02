import React, { Component } from 'react';
import { Header, Button, Input, Form } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { auth, createUserProfileDocument } from '../../utils/firebase';

import './styles.css';

import { signInWithGoogle } from '../../utils/firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginUser = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const { user } = auth.signInWithEmailAndPassword(email, password);
      await createUserProfileDocument(user);
      this.setState({
        email: '',
        password: '',
      });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const isLoggedIn = this.state.auth;

    if (isLoggedIn) return <Redirect to="/dashboard" auth="true" />;

    return (
      <div className="container-login">
        <Header as="h2">Welcome, Back !! </Header>

        <Form onSubmit={this.loginUser}>
          <Form.Field>
            <Input
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Field>

          <Form.Field>
            <Input
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Field>

          <Button type="submit"> Login </Button>
        </Form>

        <br />

        <p>
          {' '}
          Don't have an account ? <Link to="/signup"> Register here. </Link>
        </p>
        <p> Or </p>
        <Button className="blue" onClick={signInWithGoogle}>
          {' '}
          Continue With Google{' '}
        </Button>
      </div>
    );
  }
}

Login.propTypes = {};

export default Login;
