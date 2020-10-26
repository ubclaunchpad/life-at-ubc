import { combineReducers } from 'redux-immutable';
import { reducer as Reducer } from '../components/store';

const reducer = combineReducers({
  reducer: Reducer,
});

export default reducer;
