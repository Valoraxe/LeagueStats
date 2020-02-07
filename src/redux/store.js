import { createStore, combineReducers } from 'redux';
import championReducer from './reducers/champions';
import summonerReducer from './reducers/summoners';
import runeReducer from './reducers/runes';

const rootReducer = combineReducers({
  champions: championReducer,
  runes: runeReducer,
  summoners: summonerReducer
})

const store = createStore(rootReducer);

export default store