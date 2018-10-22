import React from 'react';
import PropTypes from 'prop-types';

import TabKeys from 'containers/TabKeys.container';
import TabClaims from 'containers/TabClaims.container';
import TabActions from './TabActions.component';
import TabFunds from './TabFunds.component';
import TabPSP from 'containers/TabPSP.container';

import { toEthString } from 'utils/Eth.utils';
import makeBlockie from 'ethereum-blockies-base64';

const TabHeader = ({
  id,
  currentTab,
  label,
  setTab
}) => {
  const className = (currentTab === id ? 'is-active' : '');
  return <li className={className}><a onClick={() => setTab(id)}>{label}</a></li>;
};

const IdentityDetailComponent = ({
  address,
  account,
  tab,
  balance,
  processingDeposit,
  setTab,
  deposit
}) => (
  <div className='card identity-detail'>
    <header className='card-header flex-column'>
      <div className='card-header-title'>
        <div className='card-header-title'>
		  <img
			  className='identicon'
			  src={makeBlockie(address)}
			  alt={ `Identicon of ether address ${address}` }
		  />
		  <div className='title-p2'>
            <h2> Identity </h2>
            <div className='address-text'> {address} </div>
          </div>
        </div>
        <div className='balance'>
			Current balance: <strong>{toEthString(balance)} ETH</strong>
        </div>
      </div>
      <div className='tabs'>
          <ul>
              <TabHeader label='Keys' id='keys' currentTab={tab} setTab={setTab} />
              <TabHeader label='Claims' id='claims' currentTab={tab} setTab={setTab} />
              <TabHeader label='Funds' id='funds' currentTab={tab} setTab={setTab} />
              <TabHeader label='Actions' id='actions' currentTab={tab} setTab={setTab} />
              <TabHeader label='Payments' id='psp' currentTab={tab} setTab={setTab} />
          </ul>
      </div>
    </header>
    <div className='card-content identity-content'>
      {tab === 'keys' && <TabKeys  />}
      {tab === 'claims' && <TabClaims />}
      {tab === 'funds' && (
        <TabFunds {...{
            balance,
            account,
            processingDeposit,
            deposit
          }}
        />
      )}
      {tab === 'actions' && <TabActions />}
      {tab === 'psp' && <TabPSP />}
    </div>
  </div>
);

IdentityDetailComponent.defaultProps = {
  balance: null
};

IdentityDetailComponent.propTypes = {
  address: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  balance: PropTypes.object,
  account: PropTypes.string.isRequired,
  processingDeposit: PropTypes.bool.isRequired,

  setTab: PropTypes.func.isRequired,
  deposit: PropTypes.func.isRequired
};

import './IdentityDetail.style.scss'

export default IdentityDetailComponent;
