const SETTNG_FEED_LISTENER = 'SETTNG_FEED_LISTENER';
const SETTNG_FEED_LISTENER_ERROR = 'SETTNG_FEED_LISTENER_ERROR';
const SETTNG_FEED_LISTENER_SUCCESS = 'SETTNG_FEED_LISTENER_SUCCESS';
const ADD_NEW_DUCK_TO_FEED = 'ADD_NEW_DUCK_TO_FEED';
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE';

// ActionCreators
export function settingFeedListener() {
  return {
    type: SETTNG_FEED_LISTENER,
  };
}

export function settingFeedListenerError() {
  return {
    type: SETTNG_FEED_LISTENER_ERROR,
    error: 'Error fetching feeds',
  };
}

export function settingFeedListenerSuccess(duckIds) {
  return {
    type: SETTNG_FEED_LISTENER_SUCCESS,
    duckIds,
  };
}

export function addNewDuckToFeed(duckId) {
  return {
    type: ADD_NEW_DUCK_TO_FEED,
    duckId, // Add to newDucksToAdd and set newDucksAvailable
  };
}

export function resetNewDucksAvailable() {
  return {
    type: RESET_NEW_DUCKS_AVAILABLE,
    // Move ducks from newDucksToAdd to duckIds and unset newDucksAvailable
  };
}

const initialState = {
  isFetching: false,
  error: '',
  newDucksAvailable: false,
  newDucksToAdd: [],
  duckIds: [],
};

export default function feedReducer(state = initialState, action) {
  switch (action.type) {
    case SETTNG_FEED_LISTENER:
      return {
        ...state,
        isFetching: true,
      };
    case SETTNG_FEED_LISTENER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case SETTNG_FEED_LISTENER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        duckIds: action.duckIds,
        newDucksAvailable: false,
      };
    case ADD_NEW_DUCK_TO_FEED:
      return {
        ...state,
        newDucksToAdd: [action.duckId, ...state.newDucksToAdd],
        newDucksAvailable: true,
      };
    case RESET_NEW_DUCKS_AVAILABLE:
      return {
        ...state,
        duckIds: [...state.newDucksToAdd, ...state.duckIds],
        newDucksToAdd: [],
        newDucksAvailable: false,
      };
    default:
      return state;
  }
}
