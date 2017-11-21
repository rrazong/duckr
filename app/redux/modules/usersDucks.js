const FETCHING_USERS_DUCKS = 'FETCHING_USERS_DUCKS ';
const FETCHING_USERS_DUCKS_ERROR = 'FETCHING_USERS_DUCKS_ERROR ';
const FETCHING_USERS_DUCKS_SUCCESS = 'FETCHING_USERS_DUCKS_SUCCESS ';
const ADD_SINGLE_USERS_DUCK = 'ADD_SINGLE_USERS_DUCK ';

// ActionCreators
export function fetchingUsersDucks() {
  return {
    type: FETCHING_USERS_DUCKS,
  };
}

export function fetchingUsersDucksError() {
  return {
    type: FETCHING_USERS_DUCKS_ERROR,
    error: 'Error fetching user\'s ducks',
  };
}

export function fetchingUsersDucksSuccess(uid, duckIds) {
  return {
    type: FETCHING_USERS_DUCKS_SUCCESS,
    uid,
    duckIds,
    lastUpdated: Date.now(),
  };
}

export function addSingleUsersDuck(uid, duckId, lastUpdated) {
  return {
    type: ADD_SINGLE_USERS_DUCK, // Keeps redux cache updated
    uid,
    duckId,
    lastUpdated,
  };
}

const initialUsersDuckState = {
  lastUpdated: 0,
  duckIds: [],
};

function usersDuck(state = initialUsersDuckState, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_DUCK:
      return {
        ...state,
        duckIds: state.duckIds.concat(action.duckId),
      };
    default:
      return state;
  }
}

const initialState = {
  isFetching: false,
  error: '',
};

export default function usersDucksReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS_DUCKS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_USERS_DUCKS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FETCHING_USERS_DUCKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          duckIds: action.duckIds,
        },
      };
    case ADD_SINGLE_USERS_DUCK:
      if (typeof state[action.uid] === 'undefined') {
        return state;
      }
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: usersDuck(state[action.uid], action),
      };
    default:
      return state;
  }
}
