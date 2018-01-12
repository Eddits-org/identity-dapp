import { connect } from 'react-redux';

import { selectIdentity } from 'actions/Identity.action';
import { changeIdentityDetailTab, hidePendingTx, deposit } from 'actions/Manage.action';
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
  processingDeposit: store.manage.processingDeposit
});

const mapDispatchToProps = dispatch => ({
  selectIdentity: address => dispatch(selectIdentity(address)),
  setTab: tab => dispatch(changeIdentityDetailTab(tab)),
  hidePendingTx: hash => dispatch(hidePendingTx(hash)),
  deposit: amount => dispatch(deposit(amount))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageComponent);
