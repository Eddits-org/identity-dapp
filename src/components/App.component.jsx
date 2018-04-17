import React from 'react';
import PropTypes from 'prop-types';

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

import { selectIdentity } from 'actions/Identity.action';

const HeaderWithRouter = withRouter(Header);

const config = require('config');

class IdentityLoader extends React.Component {
  componentWillMount() {
    this.props.store.dispatch(selectIdentity(this.props.match.params.address));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key !== this.props.location.key) {
      this.props.store.dispatch(selectIdentity(nextProps.match.params.address));
    }
  }

  render() {
    return <Manage history={this.props.history} />;
  }
}

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
        render={props => (<IdentityLoader {...props} store={store} />)}
      />
      <Route exact path='/login' component={Login} />
      <Footer />
    </div>
  </Router>
);

AppComponent.propTypes = {
  store: PropTypes.object.isRequired
};

export default AppComponent;
