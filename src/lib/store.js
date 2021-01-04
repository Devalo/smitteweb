import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import blipReducer from './reducers/blipReducer';
import testReducer from './reducers/testReducer';

const reducer = combineReducers({
  // blips: blipReducer,
  tests: testReducer,
});

const store = createStore(
  reducer, applyMiddleware(thunk),
);
export default store;
