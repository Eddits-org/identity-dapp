import { connect } from 'react-redux';

import { estimateCost, deployIdentity, resetDeployment } from 'actions/Register.action';
import RegisterComponent from 'components/Register.component';

const mapStateToProps = store => ({
  providerReady: store.network.providerReady,
  network: store.network.network,
  account: store.network.account,
  fetchingCost: store.register.fetchingCost,
  cost: store.register.cost,
  gas: store.register.gas,
  deploying: store.register.deploying,
  txHash: store.register.txHash,
  address: store.register.address
});

const mapDispatchToProps = dispatch => ({
  fetchCost: () => dispatch(estimateCost()),
  deploy: (account, gas) => dispatch(deployIdentity(account, gas)),
  reset: () => dispatch(resetDeployment())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterComponent);
