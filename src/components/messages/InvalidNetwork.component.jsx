import React from 'react';
import PropTypes from 'prop-types';

const InvalidNetworkComponent = ({ network }) => (
  <section className='section'>
    <div className='container'>
      <article className='message is-warning'>
        <div className='message-body has-text-centered'>
          <p>
            You are connected to <strong>{network.name}</strong> network,
            which is currently not supported.
          </p>
          <p>
            Please, change the selected network in MetaMask.
          </p>
        </div>
      </article>
    </div>
  </section>
);

InvalidNetworkComponent.propTypes = {
  network: PropTypes.object.isRequired
};

export default InvalidNetworkComponent;
