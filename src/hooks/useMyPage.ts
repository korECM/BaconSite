import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { myShopThunk, myReviewThunk } from '../modules/myPage';
import { logoutThunk } from '../modules/user';

export default function useMyPage() {
  const { shops, reviews } = useSelector((state: RootState) => state.myPage);
  const dispatch = useDispatch();

  const getMyShop = useCallback(() => dispatch(myShopThunk()), [dispatch]);
  const getMyReview = useCallback(() => dispatch(myReviewThunk()), [dispatch]);

  const logoutDispatch = useCallback(() => dispatch(logoutThunk()), [dispatch]);

  return {
    shops,
    reviews,
    getMyShop,
    getMyReview,
    logoutDispatch,
  };
}
