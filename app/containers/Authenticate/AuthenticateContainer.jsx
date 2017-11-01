import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/users';
import { Authenticate } from '../../components';
import auth from '../../helpers/auth';

class AuthenticateContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth() {
    this.props.fetchingUser();

    auth()
      .then((user) => {
        this.props.fetchingUserSuccess(
          user.uid,
          user,
          Date.now(),
        );
        this.props.authUser(user.uid);
      })
      .catch((error) => {
        this.props.fetchingUserFailure(error.message);
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

AuthenticateContainer.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUser: PropTypes.func.isRequired,
  fetchingUserFailure: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  // console.log(state);
  return {
    error: state.error,
    isFetching: state.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);
