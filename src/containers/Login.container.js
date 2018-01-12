import { connect } from 'react-redux';

import { login } from 'actions/Login.action';
import { selectIdentity } from 'actions/Identity.action';
import LoginComponent from 'components/Login.component';

const mapStateToProps = store => ({
  providerReady: store.network.providerReady,
  network: store.network.network,
  account: store.network.account,
  keyPurposes: store.identity.keyPurposes,
  identities: store.identity.identities,
  selectedIdentity: store.identity.selectedIdentity,
  loginRequest: store.login.loginRequest,
  loginRedirectionURL: store.login.loginRedirectionURL
});

const mapDispatchToProps = dispatch => ({
  selectIdentity: address => dispatch(selectIdentity(address)),
  login: (nonce, account, identity, redirect) => dispatch(login(nonce, account, identity, redirect))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
