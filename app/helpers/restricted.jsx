import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { checkIfAuthed } from './auth';

export default function restricted(Component, store) {
  function checkAuthentication(props) {
    const isAuthed = checkIfAuthed(store);
    const { history, location: { pathname: destination } } = props;

    if (destination === '/' || destination === '/auth') {
      if (isAuthed) {
        history.push('/feed');
      }
    } else if (!isAuthed) {
      history.push('/auth');
    }
  }

  class Restricted extends React.Component {
    componentWillMount() {
      checkAuthentication(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        checkAuthentication(nextProps);
      }
    }
    render() {
      return <Component {...this.props} />;
    }
  }

  Restricted.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  return withRouter(Restricted);
}
