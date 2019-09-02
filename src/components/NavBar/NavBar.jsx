import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'semantic-ui-react';
import './styles.css';

import { auth } from '../../utils/firebase';

const NavBar = ({ currentUser }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        {' '}
        FlipKart{' '}
      </a>

      <Input className="input-search" placeholder="Search Items" />

      {currentUser ? (
        <Button inverted color="black" onClick={() => auth.signOut()}>
          {' '}
          SignOut{' '}
        </Button>
      ) : (
        <div className="form-inline">
          <Button inverted color="red">
            {' '}
            <Link to="/login"> Login </Link>{' '}
          </Button>
        </div>
      )}
    </nav>
  );
};
export default NavBar;
