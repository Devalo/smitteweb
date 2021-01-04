import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import arrangementReducer from './reducers/arrangementReducer';
import participantReducer from './reducers/participantReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  arrangements: arrangementReducer,
  participants: participantReducer,
  notification: notificationReducer,
});

const store = createStore(
  reducer, applyMiddleware(thunk),
);
export default store;
