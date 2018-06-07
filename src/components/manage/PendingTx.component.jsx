import React from 'react';
import PropTypes from 'prop-types';

const shorten = hash => `${hash.substring(0, 7)}...${hash.substring(59)}`;

const maybeLink = (hash, network) => {
  if (!network) return hash;
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={`${network.etherscan}/tx/${hash}`}
    >
      {shorten(hash)}
    </a>
  );
};

const PendingTxComponent = ({ transactions, hidePendingTx, network }) => (
  <div className='content pending-tx'>
    {transactions.filter(tx => tx.show).map(tx => (
      <div key={tx.hash} className='notification is-primary'>
        <button className='delete' onClick={() => hidePendingTx(tx.hash)} />
        <div><h6 className='title has-text-weight-semibold is-6'>{tx.label}</h6></div>
        <span className='icon'>
          <i className='fas fa-sync-alt fa-spin' />
        </span>
        <small>Waiting for transaction {maybeLink(tx.hash, network)}</small>
      </div>
    ))}
  </div>
);

PendingTxComponent.defaultProps = {
  network: null
};

PendingTxComponent.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  network: PropTypes.object,

  hidePendingTx: PropTypes.func.isRequired
};

export default PendingTxComponent;
