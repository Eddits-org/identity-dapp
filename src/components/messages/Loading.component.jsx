import React from 'react';
import PropTypes from 'prop-types';

const LoadingComponent = ({ message }) => (
  <section className='section'>
    <div className='container'>
      <article className='message is-info'>
        <div className='message-body has-text-centered'>
          <span className='icon is-medium'>
            <i className='fas fa-sync-alt fa-spin' />
          </span>
          <p>{message}</p>
        </div>
      </article>
    </div>
  </section>
);

LoadingComponent.defaultProps = {
  message: 'Please wait, loading...'
};

LoadingComponent.propTypes = {
  message: PropTypes.string
};

export default LoadingComponent;
