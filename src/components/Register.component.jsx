import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/messages/Loading.component';
import NoProvider from 'components/messages/NoProvider.component';
import InvalidNetwork from 'components/messages/InvalidNetwork.component';

import WaitDeploy from 'components/register/WaitDeploy.component';
import Form from 'components/register/Form.component';
import Success from 'components/register/Success.component';

const RegisterComponent = ({
  providerReady,
  network,
  account,
  fetchingCost,
  cost,
  gas,
  fetchCost,
  deploying,
  txHash,
  address,
  deploy,
  reset
}) => {
  if (!fetchingCost && !cost) fetchCost();
  if (!providerReady) return <NoProvider />;
  if (!network) {
    return <Loading message='Please wait during the connection to Ethereum network...' />;
  }
  if (!network.enabled) return <InvalidNetwork {...{ network }} />;
  return (
    <section className='section'>
      <div className='container'>
        <h1 className='title'>Register your identity</h1>
        <div className='card'>
          <header className='card-header'>
            <p className='card-header-title'>
              <span className='icon card-title-icon'>
                <i className='far fa-id-card' />
              </span>
              Identity
            </p>
          </header>
          <div className='card-content'>
            <div className='content'>
              {deploying && (
                <WaitDeploy {... { network, txHash }} />
              )}
              {!deploying && !address && (
                <Form {... { fetchingCost, cost, account }} />
              )}
              {!deploying && !!address && (
                <Success {... { address, network }} />
              )}
            </div>
          </div>
          <footer className='card-footer'>
            {!!address && (
              <a className='card-footer-item'>Manage</a>
            )}
            {(deploying || !address) && (
              <a className='card-footer-item' onClick={reset}>Cancel</a>
            )}
            {!deploying && !address && (
              <a
                className='card-footer-item'
                disabled={fetchingCost}
                onClick={() => deploy(account, gas)}
              >
                Create
              </a>
            )}
          </footer>
        </div>
      </div>
    </section>
  );
};

RegisterComponent.defaultProps = {
  network: null,
  account: null,
  txHash: null,
  address: null,
  gas: null
};

RegisterComponent.propTypes = {
  providerReady: PropTypes.bool.isRequired,
  network: PropTypes.object,
  account: PropTypes.string,
  fetchingCost: PropTypes.bool.isRequired,
  cost: PropTypes.string.isRequired,
  gas: PropTypes.number,
  deploying: PropTypes.bool.isRequired,
  txHash: PropTypes.string,
  address: PropTypes.string,

  fetchCost: PropTypes.func.isRequired,
  deploy: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default RegisterComponent;
