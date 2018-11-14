import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.style.scss'

const WelcomeComponent = () => (
  <div className='welcome'>
    <section className='hero is-medium is-bold'>
      <div className='hero-body has-text-centered'>
        <div className='container'>
          <h1 className='title'>
            Ethereum Decentralized Digital Identity and Trust Services
          </h1>
          <h2 className='subtitle'>
            <p>A new decentralized identity management service, based on Ethereum blockchain.</p>
            <p>
              Create your <strong>identity</strong> in the chain,
              collect <strong>claims</strong> to complete your profile,
              use your identity to <strong>log in</strong> online sevices
            </p>
          </h2>
          <h2 className='subtitle'>
            <Link
              to='/register'
              href='/register'
              className='button is-info is-inverted is-outlined'
              style={{ marginRight: '10px', fontSize: '24px' }}
            >
              Create your identity
            </Link>
            <Link
              to='/manage'
              href='/manage'
              style={{fontSize: '24px'}}
              className='button is-info is-inverted is-outlined'
            >
              Manage your identity
            </Link>
          </h2>
        </div>
      </div>
    </section>
  </div>
);

WelcomeComponent.propTypes = {
};

export default WelcomeComponent;
