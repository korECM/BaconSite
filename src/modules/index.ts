import { combineReducers } from 'redux';
import detail from './detail';
import writeReview from './writeReview';
import kakao from './kakao';
import user from './user';
import shops from './shops';

const rootReducer = combineReducers({
  detail,
  writeReview,
  kakao,
  user,
  shops,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
