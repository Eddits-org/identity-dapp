import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/messages/Loading.component';
import NoProvider from 'components/messages/NoProvider.component';
import InvalidNetwork from 'components/messages/InvalidNetwork.component';

import PendingTx from 'components/manage/PendingTx.component';
import IdentityDetail from 'components/manage/IdentityDetail.component';
import IdentityCardUnfold from "components/IdentityCardUnfold";

const ManageComponent = ({
  providerReady,
  network,
  account,
  keyPurposes,
  identities,
  selectedIdentity,
  identityDetailTab,
  pendingTransactions,
  balance,
  processingDeposit,
  addIdentityVisible,

  selectIdentity,
  removeIdentity,
  setTab,
  hidePendingTx,
  deposit
}) => {
  if (!providerReady) return <NoProvider />;
  if (!network) {
    return <Loading message='Please wait during the connection to Ethereum network...' />;
  }
  if (!network.enabled) return <InvalidNetwork {...{ network }} />;
  return (
    <section className='section'>
      <div className='container'>
        <PendingTx transactions={pendingTransactions} {...{ hidePendingTx, network }} />
        <h1 className='title'>Manage your identity</h1>
        {!selectedIdentity && (
          <div className='columns'>
            <div className='column'>
              <IdentityCardUnfold
              {...{
                identities,
                selectedIdentity,
                addIdentityVisible,
                selectIdentity,
                removeIdentity
              }}
              />
            </div>
          </div>
        )}
        {!!selectedIdentity && (
          <IdentityDetail
            address={selectedIdentity}
            tab={identityDetailTab}
            {...{
              setTab,
              balance,
              account,
              processingDeposit,
              deposit,
              keyPurposes
            }}
          />
        )}
      </div>
    </section>
  );
};

ManageComponent.defaultProps = {
  network: null,
  account: null,
  keyPurposes: [],
  selectedIdentity: null,
  balance: null
};

ManageComponent.propTypes = {
  providerReady: PropTypes.bool.isRequired,
  network: PropTypes.object,
  account: PropTypes.string,
  keyPurposes: PropTypes.arrayOf(PropTypes.number),
  identities: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedIdentity: PropTypes.string,
  identityDetailTab: PropTypes.string.isRequired,
  pendingTransactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  balance: PropTypes.object,
  processingDeposit: PropTypes.bool.isRequired,
  addIdentityVisible: PropTypes.bool.isRequired,

  selectIdentity: PropTypes.func.isRequired,
  removeIdentity: PropTypes.func.isRequired,
  setTab: PropTypes.func.isRequired,
  hidePendingTx: PropTypes.func.isRequired,
  deposit: PropTypes.func.isRequired
};

export default ManageComponent;
