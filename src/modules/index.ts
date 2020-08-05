import { combineReducers } from 'redux';
import detail from './detail';

const rootReducer = combineReducers({
  detail,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
