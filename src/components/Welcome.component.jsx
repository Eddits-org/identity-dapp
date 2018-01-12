import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeComponent = () => (
  <div className='welcome'>
    <section className='hero is-info is-medium is-bold'>
      <div className='hero-body has-text-centered'>
        <div className='container'>
          <h1 className='title'>
            Decentralized Authentication Service
          </h1>
          <h2 className='subtitle'>
            <p>A new decentralized authentication service, based on Ethereum blockchain.</p>
            <p>
              Create your <strong>identity</strong> in the chain,
              collect <strong>claims</strong> to complete your profile,
              use your identity to <strong>log in</strong> online sevices
            </p>
          </h2>
          <h2 className='subtitle'>
            <Link
              to='/manage'
              href='/manage'
              className='button is-info is-inverted is-outlined'
              style={{ marginRight: '10px' }}
            >
              Manage your identity
            </Link>
            <Link
              to='/register'
              href='/register'
              className='button is-info is-inverted is-outlined'
            >
              Create your identity
            </Link>
          </h2>
        </div>
      </div>
    </section>
    <div className='box has-text-centered'>
      <span className='tag is-primary'>New</span> Add claim with your LuxTrust certificate!
    </div>
    <section className='container'>
      <div className='columns features'>
        <div className='column is-4'>
          <div className='card'>
            <div className='card-image has-text-centered'>
              <i className='fa fa-paw' />
            </div>
            <div className='card-content'>
              <div className='content'>
                <h4>Tristique senectus et netus et. </h4>
                <p>
                  Purus semper eget duis at tellus at urna condimentum mattis.
                  Non blandit massa enim nec.
                  Integer enim neque volutpat ac tincidunt vitae semper quis.
                  Accumsan tortor posuere ac ut consequat semper viverra nam.
                </p>
                <p><a href='/'>Learn more</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className='column is-4'>
          <div className='card'>
            <div className='card-image has-text-centered'>
              <i className='fa fa-id-card-o' />
            </div>
            <div className='card-content'>
              <div className='content'>
                <h4>Tempor orci dapibus ultrices in.</h4>
                <p>
                  Ut venenatis tellus in metus vulputate.
                  Amet consectetur adipiscing elit pellentesque.
                  Sed arcu non odio euismod lacinia at quis risus.
                  Faucibus turpis in eu mi bibendum neque egestas cmonsu songue.
                  Phasellus vestibulum lorem sed risus.
                </p>
                <p><a href='/'>Learn more</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className='column is-4'>
          <div className='card'>
            <div className='card-image has-text-centered'>
              <i className='fa fa-rocket' />
            </div>
            <div className='card-content'>
              <div className='content'>
                <h4> Leo integer malesuada nunc vel risus.  </h4>
                <p>
                  Imperdiet dui accumsan sit amet nulla facilisi morbi.
                  Fusce ut placerat orci nulla pellentesque dignissim enim.
                  Libero id faucibus nisl tincidunt eget nullam.
                  Commodo viverra maecenas accumsan lacus vel facilisis.
                </p>
                <p><a href='/'>Learn more</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

WelcomeComponent.propTypes = {
};

export default WelcomeComponent;
