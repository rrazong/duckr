// Users

{
  type: AUTH_USER,
  uid,
}

{
  type: UNAUTH_USER,
  uid,
}

{
  type: FETCHING_USER
  uid,
}

{
  type: FETCHING_USER_FAILURE,
  error: 'Error fetching user',
}

{
  type: FETCHING_USER_SUCCESS,
  uid,
  user,
  timestamp,
}

// Ducks

{
  type: FETCHING_DUCK,
}

{
  type: REMOVE_FETCHING_DUCK,
  error: 'Error fetching duck',
}

{
  type: FETCHING_DUCK_FAILURE,
  error: "Error fetching duck",
}

{
  type: FETCHING_DUCK_SUCCESS, // why only fetching one duck?
  duck,
    duckId,
    text,
    timestamp,
    uid,
    avatar,
    name
}

{
  type: ADD_DUCK,
  duck,
    duckId,
    text,
    timestamp,
    uid,
    avatar,
    name,
}

{
  type: ADD_MULTPLE_DUCKS,
  ducks, // { 'duckid1' : {}, {'duckid2' : {} }
}

// Feed

{
  type: SETTNG_FEED_LISTENER,
}

{
  type: SETTNG_FEED_LISTENER_ERROR,
  error: "Error fetching feeds",
}

{
  type: SETTNG_FEED_LISTENER_SUCCESS,
  duckIds,
}

{
  type: ADD_NEW_DUCK_TO_FEED,
  duckId, // Add to newDucksToAdd and set newDucksAvailable
}

{
  type: RESET_NEW_DUCKS_AVAILABLE,
  // Move ducks from newDucksToAdd to duckIds and unset newDucksAvailable
}

// Listeners

{
  type: ADD_LISTENER.
  listnerId,
}

// Modal

{
  type: OPENING_NEW_DUCK_MODAL
}

{
  type: CLOSE_NEW_DUCK_MODAL
}

{
  type: UPDATE_DUCK_TEXT
  newDuckText,
}

// Replies

{
  type: FETCHING_REPLIES
  duckid,
}

{
  type: FETCHING_REPLIES_FAILURE,
  error: 'Error fetching replies',
}

{
  type: FETCHING_REPLIES_SUCCESS,
  duckid,
  replies,
  lastUpdated: Date.now(),
}

{
  type: ADD_REPLY,
  duckid,
  reply,
}

{
  type: ADD_REPLY_ERROR,
  error: 'Error adding reply',
}

{
  type: REMOVE_REPLY
  duckId,
  replyId,
}

// Like Count

{
  type: FETCHING_COUNT
}

{
  type: FETCHING_COUNT_ERROR,
  error: 'Error fetching like count',
}

{
  type: FETCHING_COUNT_SUCCESS,
  duckId,
  count,
}

// Users Ducks

{
  type: FETCHING_USERS_DUCKS,
}

{
  type: FETCHING_USERS_DUCKS_ERROR,
  error: "Error fetching user's ducks",
}

{
  type: FETCHING_USERS_DUCKS_SUCCESS,
  uid,
  duckIds,
  lastUpdated: Date.now();
}

{
  type: ADD_SINGLE_USERS_DUCK, // Keeps redux cache updated
  uid,
  duckId,
  lastUpdated,
}

// Users Likes

{
  type: FETCHING_LIKES
}

{
  type: FETCHING_LIKES_ERROR
  error: 'Error fetching likes'
}

{
  type: FETCHING_LIKES_SUCCESS,
  likes, // { 'duckid1': {}, 'duckid2': {} }
}

// Why are there not error/success for setting likes?
{
  type: ADD_LIKE,
  duckId,
}

{
  type: REMOVE_LIKE,
  duckId,
}
