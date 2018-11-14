import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/messages/Loading.component';
import NoProvider from 'components/messages/NoProvider.component';
import InvalidNetwork from 'components/messages/InvalidNetwork.component';

import WaitDeploy from 'components/register/WaitDeploy.component';
import Form from 'components/register/Form.component';
import Success from 'components/register/Success.component';
import Notifier from 'components/messages/Notifier.component';

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
  addIdentity,
  reset,
  addIdentityOperationResult
}) => {
  if (!fetchingCost && !cost) fetchCost();
  if (!providerReady) return <NoProvider />;
  if (!network) {
    return <Loading message='Please wait during the connection to Ethereum network...' />;
  }
  if (!network.enabled) return <InvalidNetwork {...{ network }} />;
  let refAddIdentityAddress = null;
  let inputState = '';
  let textInput = '';
  let textSuccess = '';
  if(addIdentityOperationResult.state !== null) {
    if(!addIdentityOperationResult.state) {
      inputState = 'is-danger';
      textInput = addIdentityOperationResult.message;
    } else {
      textSuccess = addIdentityOperationResult.message;
    }
  }
  return (
    <section className='section'>
      <div className='container'>
        <h1 className='title'>Register your identity</h1>
        <div className='columns'>
          <div className='column is-6' style={{paddingRight: '5%'}}>
            <div className='card'>
              <header className='card-header'>
                <p className='card-header-title'>
                  <span className='icon card-title-icon'>
                    <i className='far fa-id-card' />
                  </span>
                  Create a new identity
            </p>
              </header>
              <div className='card-content' style={{height: '150px'}}>
                <div className='content'>
                  {deploying && (
                    <WaitDeploy {... { network, txHash }} />
                  )}
                  {!deploying && !address && (
                    <Form {... {
                      fetchingCost,
                      cost,
                      account,
                      gas
                    }}
                    />
                  )}
                  {!deploying && !!address && (
                    <Success {... { address, network }} />
                  )}
                </div>
              </div>
              <footer className='card-footer'>
                {!!address && (
                  <a className='card-footer-item' href={`/identity/manage/${address}`}>Manage</a>
                )}
                {!deploying && !address && (
                  <a
                    className='card-footer-item'
                    disabled={fetchingCost}
                    onClick={() => deploy(account, gas)}
                  >
                    Create<i className='fas fa-plus' style={{marginLeft: '10px'}}></i>
              </a>
                )}
              </footer>
            </div>
          </div>
          <div className='column is-6' style={{paddingLeft: '5%'}}>
            <div className='card'>
              <header className='card-header'>
                <p className='card-header-title'>
                  Add an existing identity
						</p>
              </header>
              <div className='card-content' style={{height: '150px'}}>
                <div className='content' >
                  <div className='field has-addons is-fullwidth' style={{marginBottom: '0px', paddingBottom: '0px'}}>
                      <input
                        className={'input ' + inputState}
                        type='text'
                        placeholder='Address of an ERC-725 identity contract'
                        ref={(input) => {
                          refAddIdentityAddress = input;
                        }}
                        
                      />
                  </div>
                  <p style={{fontSize: '12px',color:'red',marginTop: '0px',paddingTop: '0px',paddingLeft: '10px'}}>{textInput}</p>
                  {textSuccess !== '' ? (<p style={{textAlign: 'center'}}>{textSuccess}<i className='fas fa-check' style={{marginLeft: '10px',color:'#4CD465'}}></i></p>):''}
                </div>
              </div>
              <footer className='card-footer'>
              <a className='card-footer-item' onClick={() => addIdentity(refAddIdentityAddress.value)}>Add<i className='fas fa-plus' style={{marginLeft: '10px'}}></i></a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section >
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
  addIdentityOperationResult: PropTypes.object,

  fetchCost: PropTypes.func.isRequired,
  deploy: PropTypes.func.isRequired,
  addIdentity: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default RegisterComponent;
