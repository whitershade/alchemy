import { combineReducers } from 'redux';
import PlayersReducer from '../features/Players/Reducer';

const rootReducer = combineReducers({
  players: PlayersReducer
});

export default rootReducer
