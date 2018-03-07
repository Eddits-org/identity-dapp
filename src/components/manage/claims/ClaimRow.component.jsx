import React from 'react';
import PropTypes from 'prop-types';

import { keyToAddress } from 'utils/Keys.util';

const shorten = id => `${id.substring(0, 7)}...${id.substring(59)}`;

const Type = ({ type }) => {
  let icon = '';
  switch (type.code) {
    case 1:
      icon = 'fa-angle-double-right';
      break;
    default:
      icon = '';
  }
  return (
    <span className={`tag claim-type-${type.label.toLowerCase()}`}>
      <span className='icon'>
        <i className={`fa ${icon}`} />
      </span>&nbsp;
      {type.label}
    </span>
  );
};

const Scheme = ({ scheme }) => {
  let icon = '';
  switch (scheme.code) {
    case 3:
      icon = 'fa-file';
      break;
    default:
      icon = '';
  }
  return (
    <span className={`tag claim-scheme-${scheme.label.toLowerCase()}`}>
      <span className='icon'>
        <i className={`fa ${icon}`} />
      </span>&nbsp;
      {scheme.label}
    </span>
  );
};

const Issuer = ({ issuer, keys }) => {
  const issuerIsTrusted = !!keys.find(k =>
    keyToAddress(k.key) === issuer &&
    k.purpose.code === 3);
  let tag = 'is-danger';
  let icon = 'fa-exclamation';
  let label = 'This key is not registered on this identity';
  if (issuerIsTrusted) {
    icon = 'fa-check-square';
    tag = 'is-success';
    label = 'This key is a claim key';
  }
  return (
    <span className={`tag ${tag}`}>
      <span
        className='icon'
        title={label}
      >
        <i className={`fa ${icon}`} />
      </span>
      &nbsp;{issuer}
    </span>
  );
};

const ClaimRowComponent = ({
  id,
  type,
  scheme,
  issuer,
  uri,
  keys,
  data,
  verifyContractClaim
}) => (
  <tr>
    <td><span className='tag' title={id}>{shorten(id)}</span></td>
    <td><Type type={type} /></td>
    <td><Scheme scheme={scheme} /></td>
    <td><Issuer {...{ issuer, keys }} /></td>
    <td>{uri}</td>
    <td>
      {scheme.code === 3 && (
        <button
          className='button is-primary is-small'
          onClick={() => verifyContractClaim(issuer, data)}
        >
          <span className='icon is-small'>
            <i className='fa fa-check-circle' />
          </span>
          <span>
            Verify with contract
          </span>
        </button>
      )}
    </td>
  </tr>
);

ClaimRowComponent.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.object.isRequired,
  scheme: PropTypes.object.isRequired,
  issuer: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,

  verifyContractClaim: PropTypes.func.isRequired
};

export default ClaimRowComponent;
