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
  likeCommentThunk,
  unlikeCommentThunk,
} from '../modules/detail';

export default function useDetail(shopId: string) {
  const { shop, reviews, shopImage, menuImage, mapAddress } = useSelector((state: RootState) => state.detail);
  const dispatch = useDispatch();

  const onShopRequest = useCallback(() => dispatch(getShopThunk(shopId)), [shopId, dispatch]);
  const onReviewRequest = useCallback(() => dispatch(getReviewThunk(shopId)), [shopId, dispatch]);
  const resetDataAction = useCallback(() => dispatch(resetData()), [dispatch]);

  const onShopImageUploadRequest = useCallback((files: FileList) => dispatch(postShopImageThunk(shopId, files)), [shopId, dispatch]);
  const onMenuImageUploadRequest = useCallback((files: FileList) => dispatch(postMenuImageThunk(shopId, files)), [shopId, dispatch]);

  const onLikeShop = useCallback(() => dispatch(likeShopThunk(shopId)), [dispatch, shopId]);
  const onUnlikeShop = useCallback(() => dispatch(unlikeShopThunk(shopId)), [dispatch, shopId]);

  const onLikeComment = useCallback((commentId: string) => dispatch(likeCommentThunk(commentId)), [dispatch]);
  const onUnlikeComment = useCallback((commentId: string) => dispatch(unlikeCommentThunk(commentId)), [dispatch]);

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
    onLikeShop,
    onUnlikeShop,
    onLikeComment,
    onUnlikeComment,
    getLocation,
  };
}
