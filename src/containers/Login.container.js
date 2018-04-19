import { connect } from 'react-redux';

import { login } from 'actions/Login.action';
import { selectIdentity, addIdentity, removeIdentity, switchAddIdentityVisibility } from 'actions/Identity.action';
import LoginComponent from 'components/Login.component';

const mapStateToProps = store => ({
  providerReady: store.network.providerReady,
  network: store.network.network,
  account: store.network.account,
  keyPurposes: store.identity.keyPurposes,
  identities: store.identity.identities,
  selectedIdentity: store.identity.selectedIdentity,
  loginRequest: store.login.loginRequest,
  isValidatingSigner: store.login.isValidatingSigner,
  loginRedirectionURL: store.login.loginRedirectionURL,
  addIdentityVisible: store.identity.addIdentityVisible
});

const mapDispatchToProps = dispatch => ({
  selectIdentity: address => dispatch(selectIdentity(address)),
  login: (sp, account, identity, redirect, state) =>
    dispatch(login(sp, account, identity, redirect, state)),
  switchAddIdentityVisibility: visibility => dispatch(switchAddIdentityVisibility(visibility)),
  addIdentity: address => dispatch(addIdentity(address)),
  removeIdentity: address => dispatch(removeIdentity(address))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
