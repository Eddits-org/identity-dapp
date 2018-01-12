import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/messages/Loading.component';
import NoProvider from 'components/messages/NoProvider.component';
import InvalidNetwork from 'components/messages/InvalidNetwork.component';

import KeySelector from 'components/KeySelector.component';
import IdentitySelector from 'components/IdentitySelector.component';
import LoginRequest from 'components/login/LoginRequest.component';
import LoginResponse from 'components/login/LoginResponse.component';

const LoginComponent = ({
  providerReady,
  network,
  account,
  keyPurposes,
  identities,
  selectedIdentity,
  loginRequest,
  loginRedirectionURL,

  selectIdentity,
  login
}) => {
  if (!providerReady) return <NoProvider />;
  if (!network) {
    return <Loading message='Please wait during the connection to Ethereum network...' />;
  }
  if (!network.enabled) return <InvalidNetwork {...{ network }} />;
  return (
    <section className='section'>
      <div className='container'>
        <h1 className='title'>Authenticate</h1>
        <div className='columns'>
          <div className='column'>
            <KeySelector {...{ account, keyPurposes, selectedIdentity }} />
          </div>
          <div className='column'>
            <IdentitySelector {...{ identities, selectedIdentity, selectIdentity }} />
          </div>
        </div>
        {loginRequest && !loginRedirectionURL && (
          <LoginRequest {...{
            loginRequest,
            account,
            selectedIdentity,
            login
            }}
          />
        )}
        {loginRedirectionURL && (
          <LoginResponse {...{ loginRedirectionURL }} />
        )}
      </div>
    </section>
  );
};

LoginComponent.defaultProps = {
  network: null,
  account: null,
  keyPurposes: [],
  selectedIdentity: null,
  loginRequest: null,
  loginRedirectionURL: null
};

LoginComponent.propTypes = {
  providerReady: PropTypes.bool.isRequired,
  network: PropTypes.object,
  account: PropTypes.string,
  loginRequest: PropTypes.object,
  loginRedirectionURL: PropTypes.string,
  keyPurposes: PropTypes.arrayOf(PropTypes.number),
  identities: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedIdentity: PropTypes.string,

  selectIdentity: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default LoginComponent;
