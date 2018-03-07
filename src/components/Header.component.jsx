import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const className = (location, path) => (
  `navbar-item ${location.pathname === path ? 'is-active' : ''}`
);

const HeaderComponent = ({ location }) => (
  <header>
    <nav className='navbar'>
      <div className='container'>
        <div className='navbar-brand'>
          <Link to='/' href='/' className='navbar-item is-size-3 has-text-weight-bold'>
            EDDITS
          </Link>
          <span className='navbar-burger burger' data-target='navbarMenu' />
        </div>
        <div id='navbarMenu' className='navbar-menu'>
          <div className='navbar-end'>
            <Link to='/' href='/' className={className(location, '/')}>
              Home
            </Link>
            <Link to='/register' href='/register' className={className(location, '/register')}>
              Register
            </Link>
            <Link to='/manage' href='/manage' className={className(location, '/manage')}>
              Manage
            </Link>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

HeaderComponent.propTypes = {
  location: PropTypes.object.isRequired
};

export default HeaderComponent;
