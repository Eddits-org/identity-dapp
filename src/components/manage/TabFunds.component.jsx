import React from 'react';
import PropTypes from 'prop-types';

import { toEthString, stringToWei } from 'utils/Eth.utils';

const TabFundsComponent = ({
  balance,
  account,
  processingDeposit,
  deposit
}) => {
  let refInputAmount = null;
  return (
    <div className='content'>
      {balance !== null && (
        <p>
          Current balance: <strong>{toEthString(balance)} ETH</strong>
        </p>
      )}
      {balance === null && (
        <p>
          Fetching current ETH balance...
        </p>
      )}
      <div className=''>
        <p className=''>Deposit from account {account}</p>
        <div className='field is-horizontal'>
          <div className='field-body'>
            <div className='field is-expanded'>
              <span className='control has-icons-left'>
                <input
                  className='input'
                  type='text'
                  placeholder='Amount'
                  ref={(input) => { refInputAmount = input; }}
                />
                <span className='icon is-small is-left'>
                  <i className='fa fa-money' />
                </span>
              </span>
            </div>
            <div className='field'>
              {!processingDeposit && (
                <span className='control'>
                  <button
                    className='button is-success'
                    onClick={() => deposit(stringToWei(refInputAmount.value))}
                  >
                    <span className='icon is-intermediate'><i className='fa fa-credit-card'></i></span>
                    <span> Send money to identity</span>
                  </button>
                </span>
              )}
              {processingDeposit && (
                <span className='icon is-medium' title='Work in progress'>
                  <i className='fas fa-sync-alt fa-spin' />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TabFundsComponent.defaultProps = {
  balance: null
};

TabFundsComponent.propTypes = {
  balance: PropTypes.object,
  account: PropTypes.string.isRequired,
  processingDeposit: PropTypes.bool.isRequired,

  deposit: PropTypes.func.isRequired
};

export default TabFundsComponent;
