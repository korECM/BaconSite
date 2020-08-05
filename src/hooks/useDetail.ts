import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { getShopThunk, getReviewThunk } from '../modules/detail';

export default function useDetail(shopId: string) {
  const { shop, reviews } = useSelector((state: RootState) => state.detail);
  const dispatch = useDispatch();

  const onShopRequest = useCallback(() => dispatch(getShopThunk(shopId)), [shopId, dispatch]);
  const onReviewRequest = useCallback(() => dispatch(getReviewThunk(shopId)), [shopId, dispatch]);

  return {
    loading: shop.loading,
    error: shop.error,
    shop: shop.data,
    reviews: reviews.data,
    onShopRequest,
    onReviewRequest,
  };
}
