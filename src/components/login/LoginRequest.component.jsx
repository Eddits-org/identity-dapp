import React from 'react';
import PropTypes from 'prop-types';

const LoginRequestComponent = ({
  loginRequest,
  account,
  selectedIdentity,
  isValidatingSigner,
  login
}) => (
  <div className='card'>
    <header className='card-header'>
      <p className='card-header-title'>
        <span className='icon card-title-icon'>
          <i className='far fa-id-card' />
        </span>
        Log in
      </p>
    </header>
    <div className='card-content'>
      {!loginRequest.formatValid && (
        <div className='content'>
          <div className='notification is-warning'>
            The format of the login request is incorrect : {loginRequest.error}
          </div>
        </div>
      )}
      {loginRequest.formatValid && (
        <div className='content'>
          Do you want to log in the following service?
          <table className='table is-narrow is-bordered'>
            <tbody>
              <tr>
                <th>Service Provider Identity</th>
                <td>
                  <span className='tag is-medium'>{loginRequest.identity}</span>
                  <a className='button is-small' href={`/identity/manage/${loginRequest.identity}`} target='_blank' rel='noopener noreferrer'>
                    <span className='icon is-small'>
                      <i className='fas fa-external-link-alt' />
                    </span>
                  </a>
                </td>
              </tr>
              <tr>
                <th>Signing key</th>
                <td>
                  <span className='tag is-medium'>{loginRequest.signer}</span>
                </td>
              </tr>
              <tr>
                <th>Redirect URL</th>
                <td>{loginRequest.redirect}</td>
              </tr>
              <tr>
                <th>Signature</th>
                <td>
                  {isValidatingSigner && (
                    <div>
                      <span className='icon is-medium'>
                        <i className='fas fa-sync-alt fa-spin' />
                      </span>
                      <span>Validation of the signature...</span>
                    </div>
                  )}
                  {!isValidatingSigner && (
                    <div>
                      {!loginRequest.signatureValid && (
                        <div className='has-text-danger'>
                          <span className='icon'>
                            <i className='fa fa-exclamation' />
                          </span>
                          <strong className='has-text-danger'>Invalid signature</strong>
                        </div>
                      )}
                      {loginRequest.signatureValid && !loginRequest.signerValid && (
                        <div className='has-text-danger'>
                          <span className='icon'>
                            <i className='fa fa-exclamation' />
                          </span>
                          <strong className='has-text-danger'>Signer is not registered on service provider identity</strong>
                        </div>
                      )}
                      {loginRequest.signatureValid && loginRequest.signerValid && (
                        <div className='has-text-success'>
                          <span className='icon'>
                            <i className='fa fa-check-square' />
                          </span>
                          <strong className='has-text-success'>Signature is valid</strong>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className='button is-primary'
            disabled={
              !account ||
              !selectedIdentity ||
              !loginRequest.formatValid ||
              !loginRequest.signatureValid ||
              !loginRequest.signerValid
            }
            onClick={() => login(
              loginRequest.identity,
              account,
              selectedIdentity,
              loginRequest.redirect,
              loginRequest.state
            )}
          >
            <span className='icon'>
              <i className='fa fa-check' />
            </span>&nbsp;
            Log in
          </button>
        </div>
      )}
    </div>
  </div>
);

LoginRequestComponent.defaultProps = {
  account: null,
  selectedIdentity: null
};

LoginRequestComponent.propTypes = {
  loginRequest: PropTypes.object.isRequired,
  account: PropTypes.string,
  selectedIdentity: PropTypes.string,
  isValidatingSigner: PropTypes.bool.isRequired,

  login: PropTypes.func.isRequired
};

export default LoginRequestComponent;
