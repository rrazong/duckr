import { addSingleUsersDuck } from './usersDucks';
import { closeModal } from './modal';
import saveDuck from '../../helpers/api';

const FETCHING_DUCK = 'FETCHING_DUCK ';
const REMOVE_FETCHING_DUCK = 'REMOVE_FETCHING_DUCK ';
const FETCHING_DUCK_FAILURE = 'FETCHING_DUCK_FAILURE ';
const FETCHING_DUCK_SUCCESS = 'FETCHING_DUCK_SUCCESS ';
const ADD_DUCK = 'ADD_DUCK ';
const ADD_MULTPLE_DUCKS = 'ADD_MULTPLE_DUCKS ';

// Action Creators
export function fetchingDuck() {
  return {
    type: FETCHING_DUCK,
  };
}

export function removeFetchingDuck() {
  return {
    type: REMOVE_FETCHING_DUCK,
    error: 'Error fetching duck',
  };
}

export function fetchingDuckFailure() {
  return {
    type: FETCHING_DUCK_FAILURE,
    error: 'Error fetching duck',
  };
}

export function fetchingDuckSuccess(duck) {
  return {
    type: FETCHING_DUCK_SUCCESS,
    duck,
  };
}

export function addDuck(duck) {
  return {
    type: ADD_DUCK,
    duck,
  };
}

export function addMultipleDucks(ducks) {
  return {
    type: ADD_MULTPLE_DUCKS,
    ducks, // { 'duckid1' : {}, {'duckid2' : {} }
  };
}

export function duckFanout(duck) {
  return (dispatch, getState) => {
    const uid = getState().users.authedId;

    saveDuck(duck)
      .then((duckWithId) => {
        dispatch(addDuck(duckWithId));
        dispatch(addSingleUsersDuck(uid, duckWithId, Date.now()));
        dispatch(closeModal());
      })
      .catch((error) => {
        console.warn('Error in duckFanout', error);
      });
  };
}
const initialState = {
  isFetching: true,
  error: '',
};

function ducksReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DUCK:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_DUCK_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case ADD_DUCK:
    case FETCHING_DUCK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duck.duckId]: action.duck,
      };
    case REMOVE_FETCHING_DUCK:
      return {
        ...state,
        isFetching: false,
        error: '',
      };
    case ADD_MULTPLE_DUCKS:
      return {
        ...state,
        ...action.ducks,
      };
    default:
      return state;
  }
}

export default ducksReducer;
