import { combineReducers } from 'redux';
import detail from './detail';
import writeReview from './writeReview';

const rootReducer = combineReducers({
  detail,
  writeReview,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
