import React from 'react';
import PropTypes from 'prop-types';

const FacebookAuthenticateButton = ({ isFetching, onAuth }) => (
  <button
    onClick={onAuth}
  >
    { isFetching
      ? 'Authenticating...'
      : 'Authenticate with Facebook'
    }
  </button>
);

FacebookAuthenticateButton.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
};

export default FacebookAuthenticateButton;
