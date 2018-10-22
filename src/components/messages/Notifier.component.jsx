import React from 'react';
import PropTypes from 'prop-types';

const NotifierComponent = ({ state, message }) => {
    
    let className = "is-danger";
    if (state === null) return null;
    if (state === true) className = "is-success";

    return (


    <section className='section'>
        <div className='container'>
        <article className={'message '+className}>
            <div className='message-body has-text-centered'>
                <p>{message}</p>
            </div>
        </article>
        </div>
    </section>
    )

}


NotifierComponent.defaultProps = {
  state: null,
  message: null
};

NotifierComponent.propTypes = {
  state: PropTypes.boolean,
  message: PropTypes.string
};

export default NotifierComponent;
