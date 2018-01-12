import React from 'react';

const NoProviderComponent = () => (
  <section className='section'>
    <div className='container'>
      <article className='message is-danger'>
        <div className='message-body has-text-centered'>
          <p>
            You need an browser extension to connect to the Ethereum network.
          </p>
          <p>
            Please, enable your Web3 provider or install MetaMask.
          </p>
          <a href='https://metamask.io/'>
            <img
              src='https://github.com/MetaMask/faq/raw/master/images/download-metamask.png'
              alt='Install MetaMask'
              style={{ maxWidth: '200px' }}
            />
          </a>
        </div>
      </article>
    </div>
  </section>
);

NoProviderComponent.propTypes = {

};

export default NoProviderComponent;
