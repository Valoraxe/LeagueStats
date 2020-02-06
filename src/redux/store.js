import { createStore, combineReducers } from 'redux';
import championReducer from './reducers/champions';
import matchReducer from './reducers/matches';

const rootReducer = combineReducers({
  champions: championReducer,
  matches: matchReducer
})

const store = createStore(rootReducer);

export default store