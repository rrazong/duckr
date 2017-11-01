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

export function authUser(uid) {
  return {
    type: AUTH_USER,
    uid,
  };
}

export function unAuthUser() {
  return {
    type: UNAUTH_USER,
  };
}

export function fetchingUser() {
  return {
    type: FETCHING_USER,
  };
}

export function fetchingUserFailure() {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user',
  };
}

export function fetchingUserSuccess(uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  };
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
          isFetching: false,
          error: '',
          authedId: action.user,
        };
    default:
      return state;
  }
}

export default users;
