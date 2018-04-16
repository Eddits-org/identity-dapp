import { connect } from 'react-redux';

import { selectIdentity, addIdentity, removeIdentity } from 'actions/Identity.action';
import { changeIdentityDetailTab, hidePendingTx, deposit, switchAddIdentityVisibility } from 'actions/Manage.action';
import ManageComponent from 'components/Manage.component';

const mapStateToProps = store => ({
  providerReady: store.network.providerReady,
  network: store.network.network,
  account: store.network.account,
  keyPurposes: store.identity.keyPurposes,
  identities: store.identity.identities,
  selectedIdentity: store.identity.selectedIdentity,
  identityDetailTab: store.manage.identityDetailTab,
  pendingTransactions: store.manage.pendingTransactions,
  balance: store.manage.balance,
  processingDeposit: store.manage.processingDeposit,
  addIdentityVisible: store.manage.addIdentityVisible
});

const mapDispatchToProps = dispatch => ({
  selectIdentity: address => dispatch(selectIdentity(address)),
  setTab: tab => dispatch(changeIdentityDetailTab(tab)),
  hidePendingTx: hash => dispatch(hidePendingTx(hash)),
  deposit: amount => dispatch(deposit(amount)),
  switchAddIdentityVisibility: visibility => dispatch(switchAddIdentityVisibility(visibility)),
  addIdentity: address => dispatch(addIdentity(address)),
  removeIdentity: address => dispatch(removeIdentity(address))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageComponent);
