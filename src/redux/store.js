import { createStore, combineReducers } from 'redux';
import championReducer from './reducers/champions';
import playerReducer from './reducers/player';
import runeReducer from './reducers/runes';
import summonerReducer from './reducers/summoners';


const rootReducer = combineReducers({
  champions: championReducer,
  player: playerReducer,
  runes: runeReducer,
  summoners: summonerReducer
})

const store = createStore(rootReducer);

export default store