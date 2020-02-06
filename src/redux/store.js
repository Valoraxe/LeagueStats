import { createStore, combineReducers } from 'redux';
import matchReducer from './reducers/matches';

const rootReducer = combineReducers({
  matches: matchReducer
})

const store = createStore(rootReducer);

export default store