import React from 'react';
import PropTypes from 'prop-types';
import FacebookAuthenticateButton from './FacebookAuthenticateButton';
import { centeredContainer, errorMsg, largeHeader } from '../../sharedStyles/styles.css';

const Authenticate = ({ error, isFetching, onAuth }) => (
  <div className={centeredContainer}>
    <h1 className={largeHeader}>
      Authenticate
    </h1>
    <FacebookAuthenticateButton
      isFetching={isFetching}
      onAuth={onAuth}
    />
    {
      error &&
        <p className={errorMsg}>
          {error}
        </p>
    }
  </div>
);

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
};

export default Authenticate;
