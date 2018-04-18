import React from 'react';
import PropTypes from 'prop-types';

const LoginResponseComponent = ({
  loginRedirectionURL
}) => (
  <div className='card'>
    <header className='card-header'>
      <p className='card-header-title'>
        <span className='icon card-title-icon'>
          <i className='far fa-id-card' />
        </span>
        Log in
      </p>
    </header>
    <div className='card-content'>
      <div className='content'>
        <a href={loginRedirectionURL}>
          Click here to log in the service provider
        </a>
      </div>
    </div>
  </div>
);

LoginResponseComponent.defaultProps = {
  loginRedirectionURL: null
};

LoginResponseComponent.propTypes = {
  loginRedirectionURL: PropTypes.string
};

export default LoginResponseComponent;
