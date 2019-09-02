import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import './App.css';
import Home from './pages/HomePage';
import Shop from './pages/Shop';
import ShopItemDescription from './pages/ShopItemDescription';
import Authentication from './pages/Authentication';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import { auth, createUserProfileDocument } from './utils/firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  unSubscribefromAuth = null;

  componentDidMount() {
    this.unSubscribefromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        userRef.onSnapshot(snapshot => {
          this.setState(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data(),
              },
            },
            () => console.log(this.state)
          );
        });
      }
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unSubscribefromAuth();
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar currentUser={this.state.currentUser} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/shop/:item" component={ShopItemDescription} />

            <Route
              exact
              path="/login"
              render={() => <Authentication path="login" />}
            />
            <Route
              exact
              path="/signup"
              render={() => <Authentication path="signup" />}
            />
            <Route exact path="/dashboard" render={() => <Dashboard />} />

            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
