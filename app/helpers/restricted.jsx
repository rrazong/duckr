import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { checkIfAuthed } from './auth';

export default function restricted(BaseComponent, store) {
  function checkAuthentication(props) {
    const { history } = props;
    const nextPathName = history.location.pathname;
    const isAuthed = checkIfAuthed(store);

    // If going to home or auth page, but already authenticated,
    // go to the feed page instead.
    // If going to any page other than home or auth page, while not authenticated,
    // go to the auth page instead.
    if (nextPathName === '/' || nextPathName === '/auth') {
      if (isAuthed) {
        history.replace('feed');
      }
    } else if (!isAuthed) {
      history.replace('auth');
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
      return <BaseComponent {...this.args} />;
    }
  }

  Restricted.propTypes = {
    location: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({}).isRequired,
  };

  return withRouter(Restricted);
}
