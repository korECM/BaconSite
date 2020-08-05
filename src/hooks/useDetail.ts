import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { getShopThunk } from '../modules/detail';

export default function useDetail(shopId: string) {
  const { shop } = useSelector((state: RootState) => state.detail);
  const dispatch = useDispatch();

  const onRequest = useCallback(() => dispatch(getShopThunk(shopId)), [shopId, dispatch]);

  return {
    loading: shop.loading,
    error: shop.error,
    shop: shop.data,
    onRequest,
  };
}
