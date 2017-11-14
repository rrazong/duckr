import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/modules/users';
import { Authenticate } from '../../components';

class AuthenticateContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth(e) {
    e.preventDefault();

    this.props.fetchAndHandleAuthedUser()
      .then((/* dispatch() */) => {
        this.context.router.history.replace('feed');
      });
  }

  render() {
    const { error, isFetching } = this.props;

    return (
      <div>
        <Authenticate
          error={error}
          isFetching={isFetching}
          onAuth={this.handleAuth}
        />
      </div>
    );
  }
}

AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired,
};

AuthenticateContainer.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    error: state.error,
    isFetching: state.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);
