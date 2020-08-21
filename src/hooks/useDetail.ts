import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import {
  getShopThunk,
  getReviewThunk,
  postShopImageThunk,
  resetData,
  likeShopThunk,
  unlikeShopThunk,
  getLocationThunk,
  postMenuImageThunk,
} from '../modules/detail';

export default function useDetail(shopId: string) {
  const { shop, reviews, shopImage, menuImage, mapAddress } = useSelector((state: RootState) => state.detail);
  const dispatch = useDispatch();

  const onShopRequest = useCallback(() => dispatch(getShopThunk(shopId)), [shopId, dispatch]);
  const onReviewRequest = useCallback(() => dispatch(getReviewThunk(shopId)), [shopId, dispatch]);
  const resetDataAction = useCallback(() => dispatch(resetData()), [dispatch]);

  const onShopImageUploadRequest = useCallback((files: FileList) => dispatch(postShopImageThunk(shopId, files)), [shopId, dispatch]);
  const onMenuImageUploadRequest = useCallback((files: FileList) => dispatch(postMenuImageThunk(shopId, files)), [shopId, dispatch]);

  const onLike = useCallback(() => dispatch(likeShopThunk(shopId)), [dispatch, shopId]);
  const onUnlike = useCallback(() => dispatch(unlikeShopThunk(shopId)), [dispatch, shopId]);

  const getLocation = useCallback((keyword: string) => dispatch(getLocationThunk(keyword)), [dispatch]);

  return {
    shop,
    reviews,
    shopImage,
    menuImage,
    mapAddress,
    onShopRequest,
    onReviewRequest,
    onShopImageUploadRequest,
    onMenuImageUploadRequest,
    resetDataAction,
    onLike,
    onUnlike,
    getLocation,
  };
}
