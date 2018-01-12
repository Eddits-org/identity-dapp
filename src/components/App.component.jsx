import React from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { withRouter } from 'react-router';

import Header from 'components/Header.component';
import Welcome from 'components/Welcome.component';
import Register from 'containers/Register.container';
import Manage from 'containers/Manage.container';
import Login from 'containers/Login.container';
import Network from 'containers/Network.container';
import Footer from 'containers/Footer.container';

const HeaderWithRouter = withRouter(Header);

const AppComponent = () => (
  <Router>
    <div>
      <Network />
      <HeaderWithRouter />
      <Route exact path='/' component={Welcome} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/manage' component={Manage} />
      <Route exact path='/login' component={Login} />
      <Footer />
    </div>
  </Router>
);

AppComponent.propTypes = {
};

export default AppComponent;
