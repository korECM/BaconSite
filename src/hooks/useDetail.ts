import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { getShopThunk, getReviewThunk, postImageThunk, resetData, likeShopThunk, unlikeShopThunk } from '../modules/detail';

export default function useDetail(shopId: string) {
  const { shop, reviews, images } = useSelector((state: RootState) => state.detail);
  const dispatch = useDispatch();

  const onShopRequest = useCallback(() => dispatch(getShopThunk(shopId)), [shopId, dispatch]);
  const onReviewRequest = useCallback(() => dispatch(getReviewThunk(shopId)), [shopId, dispatch]);
  const resetDataAction = useCallback(() => dispatch(resetData()), [dispatch]);

  const onImageUploadRequest = useCallback((files: FileList) => dispatch(postImageThunk(shopId, files)), [shopId, dispatch]);

  const onLike = useCallback(() => dispatch(likeShopThunk(shopId)), [dispatch, shopId]);
  const onUnlike = useCallback(() => dispatch(unlikeShopThunk(shopId)), [dispatch, shopId]);

  return {
    shop,
    reviews,
    images,
    onShopRequest,
    onReviewRequest,
    onImageUploadRequest,
    resetDataAction,
    onLike,
    onUnlike,
  };
}
