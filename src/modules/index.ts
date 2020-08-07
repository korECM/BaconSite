import { combineReducers } from 'redux';
import detail from './detail';
import writeReview from './writeReview';
import kakao from './kakao';

const rootReducer = combineReducers({
  detail,
  writeReview,
  kakao,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
