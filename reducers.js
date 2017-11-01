const initialState = {
  isAuthed: false,
  authedId: '',
  isFetching: false,
  error: '',
}

function users (state = initialState, action) {
  switch(action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      }
    break;
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        authedId: undefined,
      }
    break;
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      }
    break;
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      }
    break;
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          error: '',
          }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action),
          }
    break;
    default:
      return state
  }
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    avatar: '',
    name: '',
    uid: '',
  },
}

function user(state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        lastUpdated: action.timestamp,
        info: action.user,
      }
    break;
    default:
      return state
  }
}

// Ducks

const initialState = {
  isFetching: true,
  error: '',
}

function ducks(state = initialState, action) {
  switch(action.type) {
    case FETCHING_DUCK:
      return {
        ...state,
        isFetching: true,
      }
    break;
    case FETCHING_DUCK_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    break;
    case ADD_DUCK:
    case FETCHING_DUCK_SUCCESS:
      return {
          ...state,
          isFetching: false,
          error: '',
          [action.duck.duckId]: action.duck,
        }
    break;
    case REMOVE_FETCHING_DUCK:
      return {
        ...state,
        isFetching: false,
        error: '',
      }
    break;
    case ADD_MULTPLE_DUCKS:
      return {
        ...state,
        ...action.ducks,
      }
    break;
    default:
      return state;
  }
}``

// Feed

const initialState = {
  isFetching: false,
  error: '',
  newDucksAvailable: false,
  newDucksToAdd: [],
  duckIds: [],
}

function feed(state = initialState, action) {
  switch(action.type) {
    case SETTNG_FEED_LISTENER:
      return {
        ...state,
        isFetching: true,
      }
    case SETTNG_FEED_LISTENER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SETTNG_FEED_LISTENER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        duckIds: action.duckIds,
        newDucksAvailable: false,
      }
    case ADD_NEW_DUCK_TO_FEED:
      return {
        ...state,
        newDucksToAdd: [action.duckId, ...state.newDucksToAdd]
        newDucksAvailable: true,
      }
    case RESET_NEW_DUCKS_AVAILABLE:
      return {
        ...state,
        duckIds: [...state.newDucksToAdd, ...state.duckIds],
        newDucksToAdd: [],
        newDucksAvailable: false,
      }
    default:
      return state
  }
}

// Listeners

const initialState = {};

function listeners(state = initialState, action) {
  switch(action.type) {
    case ADD_LISTENER:
      return {
        ...state,
        [action.listenerId]: true,
      }
    break;
    default:
      return state
  }
}

// Modal

const initialState = {
  isOpen: false,
  duckText: '',
}

function modal(state = initialState, action) {
  switch(action.type) {
    case OPENING_NEW_DUCK_MODAL:
      return {
        ...state,
        isOpen: true,
      }
    break;
    case CLOSE_NEW_DUCK_MODAL:
      return {
        ...state,
        isOpen: false,
      }
    break;
    case UPDATE_DUCK_TEXT:
      return {
        ...state,
        duckText: action.newDuckText,
      }
    break;
    default:
      return state
  }
}

// User's Likes

const initialState = {
  isFetching: false,
  error: '',
};

function usersLikes(state = initialState, action) {
  switch(action.type) {
    case FETCHING_LIKES:
      return {
        ...state,
        isFetching: true,
      }
    break;
    case FETCHING_LIKES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    break;
    case FETCHING_LIKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        ...action.likes,
      }
    break;
    case ADD_LIKE:
      return {
        ...state,
        [action.duckId]: true,
      }
    break;
    case REMOVE_LIKE:
      return Object
        .key(state)
        .filter(key => key !== action.duckId)
        .reduce((prev, key) => {
          prev[key] = state[key];
          return prev;
        }, {})
    default:
      return state
  }
}

// Like Count

const initialState = {
  isFetching: false,
  error: '',
}

function likeCount(state = initialState, action) {
  switch(action.type) {
    case FETCHING_COUNT:
      return {
        ...state,
        isFetching: true,
      }
    break;
    case FETCHING_COUNT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    break;
    case FETCHING_COUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duckId]: action.count,
      }
    break;
    case ADD_LIKE:
    case REMOVE_LIKE:
      return {
        ...state,
        [action.duckId]: count(state[action.duckId], action),
      }
    break;
    default:
      return state
  }
}

function count(state = 0, action) {
  switch(action.type) {
    case ADD_LIKE:
      return state + 1;
    break;
    case REMOVE_LIKE:
      return state - 1;
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
}

function usersDucks(state, action) {
  switch(action.type) {
    case FETCHING_USERS_DUCKS:
      return {
        ...state,
        isFetching: true,
      }
    break;
    case FETCHING_USERS_DUCKS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    break;
    case FETCHING_USERS_DUCKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          duckIds: action.duckIds,
        }
      }
    break;
    case ADD_SINGLE_USERS_DUCK:
      return typeof state[action.uid] === 'undefined'
        ? state
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: usersDuck(state[action.uid], action),
        }
      }
    break;
    default:
      return state
  }
}

const initialUsersDuckState = {
  lastUpdated: 0,
  duckIds: [],
}

function usersDuck(state = initialUsersDuckState, action) {
  switch(action.type) {
    case ADD_SINGLE_USERS_DUCK:
      return {
        ...state,
        duckIds: state.duckIds.concat(action.duckId),
      }
    break;
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
}

function replies(state, action) {
  switch(action.type) {
    case FETCHING_REPLIES:
      return {
        ...state,
        isFetching: true,
      }
    break;
    case FETCHING_REPLIES_FAILURE:
    case ADD_REPLY_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    break;
    case FETCHING_REPLIES_SUCCESS:
    case ADD_REPLY:
    case REMOVE_REPLY:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duckId]: replies(state[action.duckId], action),
      }
    break;
    default:
      return state
  }
}

const initialRepliesAndLastUpdatedState = {
  lastUpdated: Date.now(),
  replies: {},
}

function repliesAndLastUpdated(state = initialRepliesAndLastUpdatedState, action) {
  switch(action.type) {
    case FETCHING_REPLIES_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: {
          ...action.replies,
        }
      }
    break;
    case ADD_REPLY:
    case REMOVE_REPLY:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: replies(state.replies, action),
        }
      }
    break;
    default:
      return state
  }
}

const initialRepliesState = {};

function replies(state = initialRepliesState, action) {
  switch(action.type) {
    case ADD_REPLY:
      return {
        ...state,
        [action.reply.replyId]: action.reply,
      }
    break;
    case REMOVE_REPLY:
      return {
        ...state,
        [action.reply.replyId]: undefined,
      }
    break;
    default
      return state
  }
}
