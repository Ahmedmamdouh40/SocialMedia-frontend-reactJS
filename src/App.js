import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'private-route-react';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Posts/Home';
import Profile from './components/Posts/Profile';
import isLoggedIn from './components/Utilities/IsLoggedIn';
import Create from './components/Posts/Create'


function App(props) {
  return (
    <React.Fragment>
      <Switch>

        <Route path="/login" component={(props) => (
          <Login {...props}></Login>
        )} />
        <Route path="/register" component={(props) => (
          <Register {...props}></Register>
        )} />
        <PrivateRoute path={'/'} exact
          component={Home}
          isAbleToAccessRoute={isLoggedIn}
          redirectPath={'/login'}
          {...props}
        />
        <PrivateRoute path={'/me'} exact
          component={Profile}
          isAbleToAccessRoute={isLoggedIn}
          redirectPath={'/login'}
          {...props}
        />

        <PrivateRoute path={'/create'} exact
          component={Create}
          isAbleToAccessRoute={isLoggedIn}
          redirectPath={'/login'}
          {...props}
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;
