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
  toggleShopReportButton,
  setReviewReportComment,
  setShopReportComment,
  postShopReportThunk,
  postReviewReportThunk,
  checkTodayReviewAvailableThunk,
  deleteReviewReportThunk,
} from '../modules/detail';

export default function useDetail(shopId: string) {
  const { shop, reviews, shopImage, menuImage, mapAddress, form, shopReport, reviewReport, checkReview, deleteReview } = useSelector(
    (state: RootState) => state.detail,
  );
  const dispatch = useDispatch();

  const onShopRequest = useCallback(() => dispatch(getShopThunk(shopId)), [shopId, dispatch]);
  const onReviewRequest = useCallback(() => dispatch(getReviewThunk(shopId)), [shopId, dispatch]);
  const resetDataAction = useCallback(() => dispatch(resetData()), [dispatch]);

  const onShopImageUploadRequest = useCallback((files: File[]) => dispatch(postShopImageThunk(shopId, files)), [shopId, dispatch]);
  const onMenuImageUploadRequest = useCallback((files: File[]) => dispatch(postMenuImageThunk(shopId, files)), [shopId, dispatch]);

  const onLikeShop = useCallback(() => dispatch(likeShopThunk(shopId)), [dispatch, shopId]);
  const onUnlikeShop = useCallback(() => dispatch(unlikeShopThunk(shopId)), [dispatch, shopId]);

  const onLikeComment = useCallback((commentId: string) => dispatch(likeCommentThunk(commentId)), [dispatch]);
  const onUnlikeComment = useCallback((commentId: string) => dispatch(unlikeCommentThunk(commentId)), [dispatch]);

  const getLocation = useCallback((keyword: string) => dispatch(getLocationThunk(keyword)), [dispatch]);

  const toggleShopReportButtonDispatch = useCallback((num: number) => dispatch(toggleShopReportButton(num)), [dispatch]);

  const setShopReportCommentDispatch = useCallback((comment: string) => dispatch(setShopReportComment(comment)), [dispatch]);
  const setReviewReportCommentDispatch = useCallback((comment: string) => dispatch(setReviewReportComment(comment)), [dispatch]);

  const postShopReportDispatch = useCallback(() => dispatch(postShopReportThunk(shopId, { type: form.shopReport.type, comment: form.shopReport.comment })), [
    dispatch,
    shopId,
    form.shopReport,
  ]);

  const postReviewReportDispatch = useCallback((reviewId: string) => dispatch(postReviewReportThunk(reviewId, form.reviewReport.comment)), [
    dispatch,
    form.reviewReport,
  ]);

  const deleteReviewReportDispatch = useCallback((reviewId: string) => dispatch(deleteReviewReportThunk(reviewId)), [dispatch]);

  const checkTodayReviewDispatch = useCallback(() => dispatch(checkTodayReviewAvailableThunk(shopId)), [dispatch, shopId]);

  return {
    shop,
    reviews,
    shopImage,
    menuImage,
    mapAddress,
    form,
    shopReport,
    reviewReport,
    checkReview,
    deleteReview,
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
    toggleShopReportButtonDispatch,
    setShopReportCommentDispatch,
    setReviewReportCommentDispatch,
    postShopReportDispatch,
    postReviewReportDispatch,
    checkTodayReviewDispatch,
    deleteReviewReportDispatch,
  };
}
