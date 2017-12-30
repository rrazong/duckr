import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../redux/modules/users';
import { Navigation } from '../../components';
import { container, innerContainer } from './styles.css';
import { firebaseAuth } from '../../config/constants';
import { formatUserInfo } from '../../helpers/util';

class MainContainer extends React.Component {
  componentDidMount() {
    const { authUser, fetchingUserSuccess, removeIsFetching } = this.props;
    const { router } = this.context;

    // Add listener for Firebase auth state change
    // Also gets called when onAuthStateChanged is registered
    firebaseAuth().onAuthStateChanged((user) => {
      // If user has been authenticated, update app state.
      if (user) {
        const userData = user.providerData[0];
        const userInfo = formatUserInfo(
          userData.displayName,
          userData.photoURL,
          user.uid,
        );

        authUser(user.uid);
        fetchingUserSuccess(user.uid, userInfo, Date.now());

        // If you're on the home route, go to the feed
        if (router.history.location.pathname === '/') {
          router.history.replace('/feed');
        }
      } else {
        removeIsFetching();
      }
    });
  }

  render() {
    const { children, isAuthed, isFetching } = this.props;

    return isFetching
      ? null
      : (
        <div className={container}>
          <Navigation isAuthed={isAuthed} />
          <div className={innerContainer}>
            {children}
          </div>
        </div>
      );
  }
}

MainContainer.propTypes = {
  authUser: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  removeIsFetching: PropTypes.func.isRequired,
};

MainContainer.contextTypes = {
  router: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  isAuthed: state.users.isAuthed,
  isFetching: state.users.isFetching,
});
const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer));
