import React from 'react';
import PropTypes from 'prop-types';

import { toEthString, stringToWei } from 'utils/Eth.utils';

class TabPSPComponent extends React.Component {

  componentDidMount(){
    this.props.fetchPayments();
  }

  render() {
    const { payments } = this.props;

    return (
      <div className='content'>
        <ul>
        { payments.map( (payment, index) =>
          <li key={ index }>
            { `Payment requested by ${payment.from} the ${new Date(payment.at.toNumber()*1000).toLocaleDateString()}. Transferred ${payment.amount.toString()} to ${payment.to}` }
          </li>
        )}
        </ul>
      </div>
    );
  };
}
TabPSPComponent.defaultProps = {
  payments: []
};

TabPSPComponent.propTypes = {
  payments: PropTypes.arrayOf(PropTypes.object),
  fetchPayments: PropTypes.func.isRequired
};

export default TabPSPComponent;
