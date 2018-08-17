import React from 'react';
import PropTypes from 'prop-types';
import {toEthString} from "utils/Eth.utils";

const PaymentRowComponent = ({
  from,
  to,
  at,
  amount
}) => {
  return (
    <tr>
      <td> {new Date(at.toNumber()*1000).toLocaleDateString()} </td>
      <td className='address-text'> {from} </td>
      <td className='address-text'> {to} </td>
      <td> {toEthString(amount)} </td>
    </tr>
  );
};

PaymentRowComponent.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  at: PropTypes.object.isRequired,
  amount: PropTypes.object.isRequired
};

export default PaymentRowComponent;
