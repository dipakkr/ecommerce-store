import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Input, Form, Checkbox } from 'semantic-ui-react';
import './styles.css';
import { auth, createUserProfileDocument } from '../../utils/firebase';

class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      displayName: '',
      password: '',
      confirmPass: '',
      checkbox: '',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { displayName, email, password, confirmPass } = this.state;

    if (password !== confirmPass) return alert('Password Match Failed');

    try {
      const { user } = auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName });

      this.setState({
        email: '',
        displayName: '',
        password: '',
        confirmPass: '',
      });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <div className="container-login">
        <Header as="h2"> Welcome, Please Register to Continue !</Header>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Input
              name="displayName"
              placeholder="Name"
              onChange={this.handleChange}
              value={this.state.displayName}
            />
          </Form.Field>

          <Form.Field>
            <Input
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </Form.Field>

          <Form.Field>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Field>

          <Form.Field>
            <Input
              name="confirmPass"
              placeholder="Confirm Password"
              onChange={this.handleChange}
            />
          </Form.Field>

          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>

          <Button inverted color="green" name="register" type="submit">
            Register{' '}
          </Button>
        </Form>
        <br />
        <p>
          {' '}
          Already registered ? <Link to="/login"> Login.</Link>
        </p>
      </div>
    );
  }
}
export default SignUp;
