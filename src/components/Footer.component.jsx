import React from 'react';
import PropTypes from 'prop-types';

const FooterComponent = ({ network, account }) => (
  <footer className='footer app-footer'>
    <div className='container'>
      <div className='content has-text-centered'>
        {network && account && (
          <p>
            Connected to <strong>{network.name}</strong> using account <strong>{account}</strong>
          </p>
        )}
      </div>
    </div>
  </footer>
);

FooterComponent.defaultProps = {
  network: null,
  account: null
};

FooterComponent.propTypes = {
  network: PropTypes.object,
  account: PropTypes.string
};

export default FooterComponent;
