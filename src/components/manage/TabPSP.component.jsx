import React from 'react';
import PropTypes from 'prop-types';

import { toEthString, stringToWei } from 'utils/Eth.utils';
import PaymentRowComponent from "./keys/PaymentRow.component";

class TabPSPComponent extends React.Component {

  componentDidMount(){
    this.props.fetchPayments();
  }

  render() {
    const { payments } = this.props;

    return (
      <div className='content'>
        <table className='table is-fullwidth'>
          <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Amount (eth) </th>
            <th/>
          </tr>
          </thead>
          <tbody>
        { payments.map( (payment, index) =>
          <PaymentRowComponent {...payment} />
        )}
          </tbody>
        </table>
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
