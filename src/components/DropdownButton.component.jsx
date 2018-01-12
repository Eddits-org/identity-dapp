import React from 'react';
import PropTypes from 'prop-types';

export class DropdownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleTrigger = this.handleTrigger.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  setRef(ref) {
    this.dropdownRef = ref;
  }

  handleTrigger() {
    if (!this.state.active) {
      document.addEventListener('mousedown', this.handleClickOutside);
    } else {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
    this.setState({
      active: !this.state.active
    });
  }

  handleClickOutside(event) {
    if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
      this.handleTrigger();
    }
  }

  handleAction(item) {
    return () => {
      this.handleTrigger();
      if (item.onClick) item.onClick();
    };
  }

  render() {
    return (
      <div className={`dropdown ${this.state.active ? 'is-active' : ''}`} ref={this.setRef}>
        <div className='dropdown-trigger'>
          <button
            className={`button is-small ${this.props.className}`}
            onClick={this.handleTrigger}
            disabled={this.props.disabled}
          >
            {this.props.icon && (
              <span className='icon is-small'>
                <i className={`fa ${this.props.icon}`} />
              </span>
            )}
            <span>{this.props.label}</span>
            <span className='icon is-small'>
              <i className='fa fa-angle-down' />
            </span>
          </button>
        </div>
        <div className='dropdown-menu'>
          <div className='dropdown-content'>
            {this.props.items.map(item => (
              <a key={item.label} className='dropdown-item' onClick={this.handleAction(item)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

DropdownButton.defaultProps = {
  items: [],
  icon: null,
  className: '',
  disabled: false
};

DropdownButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func
  })),
  disabled: PropTypes.bool
};
