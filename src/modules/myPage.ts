import { createAction, createReducer, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import createAsyncThunk from '../lib/createAsyncThunk';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import { getMyShops, ShopsInterface } from '../api/getShops';
import { getMyReview, ReviewInterface } from '../api/review';
import { getMyReport, MyReportResponse } from 'api/report';

const MY_SHOP = 'myPage/MY_SHOP' as const;
const MY_SHOP_SUCCESS = 'myPage/MY_SHOP_SUCCESS' as const;
const MY_SHOP_ERROR = 'myPage/MY_SHOP_ERROR' as const;

const MY_REVIEW = 'myPage/MY_REVIEW' as const;
const MY_REVIEW_SUCCESS = 'myPage/MY_REVIEW_SUCCESS' as const;
const MY_REVIEW_ERROR = 'myPage/MY_REVIEW_ERROR' as const;

const MY_REPORT = 'myPage/MY_REPORT' as const;
const MY_REPORT_SUCCESS = 'myPage/MY_REPORT_SUCCESS' as const;
const MY_REPORT_ERROR = 'myPage/MY_REPORT_ERROR' as const;

export const myShopAsync = createAsyncAction(MY_SHOP, MY_SHOP_SUCCESS, MY_SHOP_ERROR)<void, ShopsInterface[], AxiosError>();
export const myReviewAsync = createAsyncAction(MY_REVIEW, MY_REVIEW_SUCCESS, MY_REVIEW_ERROR)<void, ReviewInterface[], AxiosError>();
export const myReportAsync = createAsyncAction(MY_REPORT, MY_REPORT_SUCCESS, MY_REPORT_ERROR)<void, MyReportResponse[], AxiosError>();

export const myShopThunk = createAsyncThunk(myShopAsync, getMyShops);
export const myReviewThunk = createAsyncThunk(myReviewAsync, getMyReview);
export const myReportThunk = createAsyncThunk(myReportAsync, getMyReport);

type UserAction =
  | ReturnType<typeof myShopAsync.request>
  | ReturnType<typeof myShopAsync.success>
  | ReturnType<typeof myShopAsync.failure>
  | ReturnType<typeof myReportAsync.request>
  | ReturnType<typeof myReportAsync.success>
  | ReturnType<typeof myReportAsync.failure>
  | ReturnType<typeof myReviewAsync.request>
  | ReturnType<typeof myReviewAsync.success>
  | ReturnType<typeof myReviewAsync.failure>;

interface UserState {
  shops: AsyncState<ShopsInterface[], number>;
  reviews: AsyncState<ReviewInterface[], number>;
  reports: AsyncState<MyReportResponse[], number>;
}

const initialState: UserState = {
  shops: asyncState.initial(),
  reviews: asyncState.initial(),
  reports: asyncState.initial(),
};

const myPage = createReducer<UserState, UserAction>(initialState, {
  [MY_SHOP]: (state) => ({
    ...state,
  }),
  [MY_SHOP_SUCCESS]: (state, { payload: shops }) => ({
    ...state,
    shops: asyncState.success(shops),
  }),
  [MY_SHOP_ERROR]: (state, { payload: error }) => ({
    ...state,
    shops: asyncState.error(error.response?.status || 404),
  }),
  [MY_REVIEW]: (state) => ({
    ...state,
  }),
  [MY_REVIEW_SUCCESS]: (state, { payload: reviews }) => ({
    ...state,
    reviews: asyncState.success(reviews),
  }),
  [MY_REVIEW_ERROR]: (state, { payload: error }) => ({
    ...state,
    reviews: asyncState.error(error.response?.status || 404),
  }),
  [MY_REPORT]: (state) => ({
    ...state,
  }),
  [MY_REPORT_SUCCESS]: (state, { payload: reports }) => ({
    ...state,
    reports: asyncState.success(reports),
  }),
  [MY_REPORT_ERROR]: (state, { payload: error }) => ({
    ...state,
    reports: asyncState.error(error.response?.status || 404),
  }),
});
export default myPage;
