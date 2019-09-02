import React from 'react';
import './PageStyle.css';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initialise the state here
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Link className="col-sm" to="/shop/tshirts">
            Tshirts
          </Link>

          <Link className="col-sm" to="/shop/formal">
            Formals Wear
          </Link>

          <Link className="col-sm" to="/shop/footwear">
            <div>Footwear</div>
          </Link>
        </div>

        <div className="row">
          <Link className="col-sm" to="/shop/mens">
            <div>Mens</div>
          </Link>

          <Link className="col-sm" to="/shop/women">
            <div>Womens</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
