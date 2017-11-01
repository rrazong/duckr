import auth from '../helpers/auth';

const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const FETCHING_USER = 'FETCHING_USER';
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';

const initialState = {
  isAuthed: false,
  authedId: '',
  isFetching: false,
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

function user(state = initialUserState, action) {
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

function users(state = initialState, action) {
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
          [action.uid]: user(state[action.uid], action),
        };
    default:
      return state;
  }
}

function authUser(uid) {
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

function fetchingUserSuccess(uid, authedUser, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user: authedUser,
    timestamp,
  };
}

export function fetchAndHandleAuthedUser() {
  return (dispatch) => {
    dispatch(fetchingUser());

    auth()
      .then((authedUser) => {
        dispatch(fetchingUserSuccess(
          authedUser.uid,
          authedUser,
          Date.now(),
        ));
        dispatch(authUser(user.uid));
      })
      .catch((error) => {
        dispatch(fetchingUserFailure(error.message));
      });
  };
}

export default users;
