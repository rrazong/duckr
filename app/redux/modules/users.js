import { auth, logout, saveUser } from '../../helpers/auth';
import { formatUserInfo } from '../../helpers/util';

const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const FETCHING_USER = 'FETCHING_USER';
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
const REMOVE_IS_FETCHING = 'REMOVE_IS_FETCHING';

const initialState = {
  isAuthed: false,
  authedId: '',
  isFetching: true,
  error: '',
};

const initialUserState = {
  lastUpdated: 0,
  info: {
    avatar: '',
    name: '',
    uid: '',
  },
};

function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS: {
      const { avatar = '', name = '', uid = '' } = action.user;
      return {
        ...state,
        lastUpdated: action.timestamp,
        info: {
          avatar,
          name,
          uid,
        },
      };
    }
    default:
      return state;
  }
}

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      };
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      };
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          authedId: '',
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          authedId: action.uid,
          isFetching: false,
          error: '',
          [action.uid]: userReducer(state[action.uid], action),
        };
    case REMOVE_IS_FETCHING:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}

export function authUser(uid) {
  return {
    type: AUTH_USER,
    uid,
  };
}

function unauthUser() {
  return {
    type: UNAUTH_USER,
  };
}

function fetchingUser() {
  return {
    type: FETCHING_USER,
  };
}

function fetchingUserFailure(error) {
  return {
    type: FETCHING_USER_FAILURE,
    error,
  };
}

export function fetchingUserSuccess(uid, userInfo, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user: userInfo,
    timestamp,
  };
}

export function logoutAndUnauth() {
  return (dispatch) => {
    logout(); // Log out from Firebase
    dispatch(unauthUser()); // Update app state
  };
}

export function fetchAndHandleAuthedUser() {
  return (dispatch) => {
    dispatch(fetchingUser());

    return auth()
      .then(({ user: authedUser/* , credential */ }) => {
        const userData = authedUser.providerData[0];
        const userInfo = formatUserInfo(
          userData.displayName,
          userData.photoURL,
          authedUser.uid,
        );

        return dispatch(fetchingUserSuccess(
          userInfo.uid,
          userInfo,
          Date.now(),
        ));
      })
      .then(({ user }) => saveUser(user)) // eslint-disable-line no-shadow
      .then(user => dispatch(authUser(user.uid))) // eslint-disable-line no-shadow
      .catch(error => dispatch(fetchingUserFailure(error.message)));
  };
}

export function removeIsFetching() {
  return {
    type: REMOVE_IS_FETCHING,
  };
}
