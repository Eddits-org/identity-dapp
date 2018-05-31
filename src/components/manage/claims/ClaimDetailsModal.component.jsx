import React from 'react';
import PropTypes from 'prop-types';

const ClaimDetailsModalComponent = ({ details, closeDetail }) => (
  <div className='modal is-active'>
    <div className='modal-background' />
    <div className='modal-content'>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Claim verification</p>
          <button className='delete' aria-label='close' onClick={closeDetail} />
        </header>
        <section className='modal-card-body'>
          <table className='table is-narrow'>
            <tbody>
              <tr>
                <th>Common name</th>
                <td>{details.subjectCN}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{details.country}</td>
              </tr>
              <tr>
                <th>Certification authority</th>
                <td>{details.issuerCN}</td>
              </tr>
            </tbody>
          </table>
          {details.active && (
            <div className='is-size-5 has-text-success'>
              <span className='icon is-success'>
                <i className='fa fa-check-square' />
              </span>
              <span>This claim is valid</span>
            </div>
          )}
          {!details.active && (
            <div className='is-size-5 has-text-danger'>
              <span className='icon is-danger'>
                <i className='fa fa-exclamation' />
              </span>
              <span>This claim is NOT valid</span>
            </div>
          )}
        </section>
      </div>
    </div>
  </div>
);

ClaimDetailsModalComponent.propTypes = {
  details: PropTypes.object.isRequired,

  closeDetail: PropTypes.func.isRequired
};

export default ClaimDetailsModalComponent;
