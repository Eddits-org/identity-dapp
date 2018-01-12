import React from 'react';
import PropTypes from 'prop-types';

import { validateLoginRequestSignature } from 'utils/Signature.utils';

const parseRequest = loginRequest => JSON.parse(Buffer.from(loginRequest.loginRequest, 'base64'));

const LoginRequestComponent = ({
  loginRequest,
  account,
  selectedIdentity,
  login
}) => {
  const parsed = parseRequest(loginRequest);
  const signOK = validateLoginRequestSignature(loginRequest);
  return (
    <div className='card'>
      <header className='card-header'>
        <p className='card-header-title'>
          <span className='icon card-title-icon'>
            <i className='fa fa-id-card-o' />
          </span>
          Log in
        </p>
      </header>
      <div className='card-content'>
        <div className='content'>
          Do you want to log in the following service?
          <table className='table is-narrow is-bordered'>
            <tbody>
              <tr>
                <th>Service Provider</th>
                <td>{parsed.label}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{parsed.address}</td>
              </tr>
              <tr>
                <th>URL</th>
                <td>{parsed.redirect}</td>
              </tr>
              <tr>
                <th>Signature</th>
                <td>
                  {signOK && <strong className='has-text-success'>Valid</strong>}
                  {!signOK && <strong className='has-text-danger'>Invalid</strong>}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className='button is-primary'
            disabled={!account || !selectedIdentity}
            onClick={() => login(parsed.nonce, account, selectedIdentity, parsed.redirect)}
          >
            <span className='icon'>
              <i className='fa fa-check' />
            </span>&nbsp;
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

LoginRequestComponent.defaultProps = {
  loginRequest: null,
  account: null,
  selectedIdentity: null
};

LoginRequestComponent.propTypes = {
  loginRequest: PropTypes.object,
  account: PropTypes.string,
  selectedIdentity: PropTypes.string,

  login: PropTypes.func.isRequired
};

export default LoginRequestComponent;
