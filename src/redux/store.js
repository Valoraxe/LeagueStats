import { createStore, combineReducers } from 'redux';
import championReducer from './reducers/champions';
import matchReducer from './reducers/matches';
import playerReducer from './reducers/player';
import runeReducer from './reducers/runes';
import summonerReducer from './reducers/summoners';


const rootReducer = combineReducers({
  champions: championReducer,
  matches: matchReducer,
  player: playerReducer,
  runes: runeReducer,
  summoners: summonerReducer
})

const store = createStore(rootReducer);

export default store