import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import blipReducer from './reducers/blipReducer';
import testReducer from './reducers/testReducer';
import arrangementReducer from './reducers/arrangementReducer';
import participantReducer from './reducers/participantReducer';

const reducer = combineReducers({
  // blips: blipReducer,
  tests: testReducer,
  arrangements: arrangementReducer,
  participants: participantReducer,
});

const store = createStore(
  reducer, applyMiddleware(thunk),
);
export default store;
