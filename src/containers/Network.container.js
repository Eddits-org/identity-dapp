import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import web3Service from 'services/Web3.service';
import { web3Fetched, networkChanged, accountChanged } from 'actions/Network.action';
import {ClaimAvailableOnCurrentNetwork} from "../actions/Claims.action";

class NetworkComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      networkPolling: false,
      accountPolling: false
    };
  }

  componentDidMount() {
    web3Service.getProvider().then(provider => {
      this.props.fetch(true);
    });
  }

  componentDidUpdate() {
    if (this.props.providerReady) {
      this.pollNetwork();
      this.pollAccount();
    }
  }

  pollNetwork() {
    if (!this.state.networkPolling) {
      this.setState({
        networkPolling: true
      });

      web3Service.getNetwork().then((network) => {
        if (!this.props.network || this.props.network.id !== network.id) {
          this.props.changeNetwork(network);
        }
      });
    }
  }

  pollAccount() {
    if (!this.state.accountPolling) {
      this.setState({
        accountPolling: true
      });

      web3Service.getAccount().then((account) => {
        if ((!this.props.account && account) || this.props.account !== account) {
          this.props.changeAccount(account);
        }
      });
    }
  }

  render() {
    return false;
  }
}

NetworkComponent.propTypes = {
  providerReady: PropTypes.bool.isRequired,
  network: PropTypes.object,
  account: PropTypes.string,

  fetch: PropTypes.func.isRequired,
  changeNetwork: PropTypes.func.isRequired,
  changeAccount: PropTypes.func.isRequired
};

NetworkComponent.defaultProps = {
  network: null,
  account: null
};

const mapStateToProps = store => ({
  providerReady: store.network.providerReady,
  network: store.network.network,
  account: store.network.account
});

const mapDispatchToProps = dispatch => ({
  fetch: available => dispatch(web3Fetched(available)),
  changeNetwork: network => {
    dispatch(networkChanged(network));
    dispatch(ClaimAvailableOnCurrentNetwork())
  },
  changeAccount: account => dispatch(accountChanged(account))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkComponent);
