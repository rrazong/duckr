import { combineReducers } from 'redux';
import ducks from './ducks';
import feed from './feed';
import listeners from './listeners';
import modal from './modal';
import users from './users';
import usersDucks from './usersDucks';

export default combineReducers({
  ducks,
  feed,
  listeners,
  modal,
  users,
  usersDucks,
});
