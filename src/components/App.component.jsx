import React from 'react';
import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { withRouter } from 'react-router';

import OnRouteEnter from 'utils/OnRouteEnter.component';
import Header from 'components/Header.component';
import Welcome from 'components/Welcome.component';
import Register from 'containers/Register.container';
import Manage from 'containers/Manage.container';
import Login from 'containers/Login.container';
import Network from 'containers/Network.container';
import Footer from 'containers/Footer.container';

import { selectIdentity } from 'actions/Identity.action';
import { validateLoginRequestSigner } from 'actions/Login.action';

const HeaderWithRouter = withRouter(Header);

const config = require('config');

const AppComponent = ({ store }) => (
  <Router basename={config.baseUrl}>
    <div>
      <Network />
      <HeaderWithRouter />
      <Route exact path='/' component={Welcome} />
      <Route exact path='/register' component={Register} />
      <Route
        exact
        path='/manage/:address?'
        render={props => (
          <OnRouteEnter
            {...props}
            onEnter={match => store.dispatch(selectIdentity(match.params.address))}
          >
            <Manage {...props} />
          </OnRouteEnter>)
        }
      />
      <Route
        exact
        path='/login'
        render={props => (
          <OnRouteEnter
            {...props}
            onEnter={() => store.dispatch(validateLoginRequestSigner())}
          >
            <Login />
          </OnRouteEnter>)
        }
      />
      <Footer />
    </div>
  </Router>
);

AppComponent.propTypes = {
  store: PropTypes.object.isRequired
};

export default AppComponent;
