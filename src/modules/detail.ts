import { createAction, createReducer, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { ShopInterface, getShop, Location, ShopCategory } from '../api/getShop';
import createAsyncThunk from '../lib/createAsyncThunk';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import { ReviewInterface, getReview } from '../api/getReview';
import { ImageUploadResponseInterface, shopImageUpload, menuImageUpload } from '../api/uploadImage';
import { LikeInterface, likeShopAPI, unlikeShopAPI } from '../api/likeShop';
import { LocationInterface, getLocation } from '../api/getLocation';
import { LikeCommentInterface, likeCommentAPI, unlikeCommentAPI } from '../api/likeComment';
import { locationToString, categoryToString } from '../lib/shopUtil';
import { ReportInterface, reportShopAPI, reportReviewAPI } from '../api/report';

const RESET_DATA = 'detail/RESET_DATA' as const;

const TOGGLE_SHOP_REPORT_BUTTON = 'detail/TOGGLE_SHOP_REPORT_BUTTON' as const;

const SET_SHOP_REPORT_COMMENT = 'detail/SET_SHOP_REPORT_COMMENT' as const;

const SET_REVIEW_REPORT_COMMENT = 'detail/SET_REVIEW_REPORT_COMMENT' as const;

const GET_SHOP_INFO = 'detail/GET_SHOP_INFO' as const;
const GET_SHOP_INFO_SUCCESS = 'detail/GET_SHOP_INFO_SUCCESS' as const;
const GET_SHOP_INFO_ERROR = 'detail/GET_SHOP_INFO_ERROR' as const;

const GET_REVIEW = 'detail/GET_REVIEW' as const;
const GET_REVIEW_SUCCESS = 'detail/GET_REVIEW_SUCCESS' as const;
const GET_REVIEW_ERROR = 'detail/GET_REVIEW_ERROR' as const;

const POST_SHOP_IMAGES = 'detail/POST_SHOP_IMAGES' as const;
const POST_SHOP_IMAGES_SUCCESS = 'detail/POST_SHOP_IMAGES_SUCCESS' as const;
const POST_SHOP_IMAGES_ERROR = 'detail/POST_SHOP_IMAGES_ERROR' as const;

const POST_MENU_IMAGES = 'detail/POST_MENU_IMAGES' as const;
const POST_MENU_IMAGES_SUCCESS = 'detail/POST_MENU_IMAGES_SUCCESS' as const;
const POST_MENU_IMAGES_ERROR = 'detail/POST_MENU_IMAGES_ERROR' as const;

const LIKE_SHOP = 'detail/LIKE_SHOP' as const;
const LIKE_SHOP_SUCCESS = 'detail/LIKE_SHOP_SUCCESS' as const;
const LIKE_SHOP_ERROR = 'detail/LIKE_SHOP_ERROR' as const;

const UNLIKE_SHOP = 'detail/UNLIKE_SHOP' as const;
const UNLIKE_SHOP_SUCCESS = 'detail/UNLIKE_SHOP_SUCCESS' as const;
const UNLIKE_SHOP_ERROR = 'detail/UNLIKE_SHOP_ERROR' as const;

const LIKE_COMMENT = 'detail/LIKE_COMMENT' as const;
const LIKE_COMMENT_SUCCESS = 'detail/LIKE_COMMENT_SUCCESS' as const;
const LIKE_COMMENT_ERROR = 'detail/LIKE_COMMENT_ERROR' as const;

const UNLIKE_COMMENT = 'detail/UNLIKE_COMMENT' as const;
const UNLIKE_COMMENT_SUCCESS = 'detail/UNLIKE_COMMENT_SUCCESS' as const;
const UNLIKE_COMMENT_ERROR = 'detail/UNLIKE_COMMENT_ERROR' as const;

const GET_LOCATION = 'detail/GET_LOCATION' as const;
const GET_LOCATION_SUCCESS = 'detail/GET_LOCATION_SUCCESS' as const;
const GET_LOCATION_ERROR = 'detail/GET_LOCATION_ERROR' as const;

const POST_SHOP_REPORT = 'detail/POST_SHOP_REPORT' as const;
const POST_SHOP_REPORT_SUCCESS = 'detail/POST_SHOP_REPORT_SUCCESS' as const;
const POST_SHOP_REPORT_ERROR = 'detail/POST_SHOP_REPORT_ERROR' as const;

const POST_REVIEW_REPORT = 'detail/POST_REVIEW_REPORT' as const;
const POST_REVIEW_REPORT_SUCCESS = 'detail/POST_REVIEW_REPORT_SUCCESS' as const;
const POST_REVIEW_REPORT_ERROR = 'detail/POST_REVIEW_REPORT_ERROR' as const;

export const resetData = createAction(RESET_DATA)();
export const toggleShopReportButton = createAction(TOGGLE_SHOP_REPORT_BUTTON)<number>();
export const setShopReportComment = createAction(SET_SHOP_REPORT_COMMENT)<string>();
export const setReviewReportComment = createAction(SET_REVIEW_REPORT_COMMENT)<string>();

export const getShopAsync = createAsyncAction(GET_SHOP_INFO, GET_SHOP_INFO_SUCCESS, GET_SHOP_INFO_ERROR)<void, ShopInterface, AxiosError>();

export const getReviewAsync = createAsyncAction(GET_REVIEW, GET_REVIEW_SUCCESS, GET_REVIEW_ERROR)<void, ReviewInterface[], AxiosError>();

export const postShopImagesAsync = createAsyncAction(POST_SHOP_IMAGES, POST_SHOP_IMAGES_SUCCESS, POST_SHOP_IMAGES_ERROR)<
  void,
  ImageUploadResponseInterface,
  AxiosError
>();

export const postMenuImagesAsync = createAsyncAction(POST_MENU_IMAGES, POST_MENU_IMAGES_SUCCESS, POST_MENU_IMAGES_ERROR)<
  void,
  ImageUploadResponseInterface,
  AxiosError
>();

export const likeShopAsync = createAsyncAction(LIKE_SHOP, LIKE_SHOP_SUCCESS, LIKE_SHOP_ERROR)<void, LikeInterface, AxiosError>();

export const unlikeShopAsync = createAsyncAction(UNLIKE_SHOP, UNLIKE_SHOP_SUCCESS, UNLIKE_SHOP_ERROR)<void, LikeInterface, AxiosError>();

export const likeCommentAsync = createAsyncAction(LIKE_COMMENT, LIKE_COMMENT_SUCCESS, LIKE_COMMENT_ERROR)<void, LikeCommentInterface, AxiosError>();

export const unlikeCommentAsync = createAsyncAction(UNLIKE_COMMENT, UNLIKE_COMMENT_SUCCESS, UNLIKE_COMMENT_ERROR)<void, LikeCommentInterface, AxiosError>();

export const getLocationAsync = createAsyncAction(GET_LOCATION, GET_LOCATION_SUCCESS, GET_LOCATION_ERROR)<void, LocationInterface, AxiosError>();

export const postShopReportAsync = createAsyncAction(POST_SHOP_REPORT, POST_SHOP_REPORT_SUCCESS, POST_SHOP_REPORT_ERROR)<void, ReportInterface, AxiosError>();

export const postReviewReportAsync = createAsyncAction(POST_REVIEW_REPORT, POST_REVIEW_REPORT_SUCCESS, POST_REVIEW_REPORT_ERROR)<
  void,
  ReportInterface,
  AxiosError
>();

type DetailAction =
  | ReturnType<typeof resetData>
  | ReturnType<typeof toggleShopReportButton>
  | ReturnType<typeof setShopReportComment>
  | ReturnType<typeof setReviewReportComment>
  | ReturnType<typeof getShopAsync.request>
  | ReturnType<typeof getShopAsync.success>
  | ReturnType<typeof getShopAsync.failure>
  | ReturnType<typeof getReviewAsync.request>
  | ReturnType<typeof getReviewAsync.success>
  | ReturnType<typeof getReviewAsync.failure>
  | ReturnType<typeof postShopImagesAsync.request>
  | ReturnType<typeof postShopImagesAsync.success>
  | ReturnType<typeof postShopImagesAsync.failure>
  | ReturnType<typeof postMenuImagesAsync.request>
  | ReturnType<typeof postMenuImagesAsync.success>
  | ReturnType<typeof postMenuImagesAsync.failure>
  | ReturnType<typeof likeShopAsync.request>
  | ReturnType<typeof likeShopAsync.success>
  | ReturnType<typeof likeShopAsync.failure>
  | ReturnType<typeof unlikeShopAsync.request>
  | ReturnType<typeof unlikeShopAsync.success>
  | ReturnType<typeof unlikeShopAsync.failure>
  | ReturnType<typeof likeCommentAsync.request>
  | ReturnType<typeof likeCommentAsync.success>
  | ReturnType<typeof likeCommentAsync.failure>
  | ReturnType<typeof unlikeCommentAsync.request>
  | ReturnType<typeof unlikeCommentAsync.success>
  | ReturnType<typeof unlikeCommentAsync.failure>
  | ReturnType<typeof getLocationAsync.request>
  | ReturnType<typeof getLocationAsync.success>
  | ReturnType<typeof getLocationAsync.failure>
  | ReturnType<typeof postShopReportAsync.request>
  | ReturnType<typeof postShopReportAsync.success>
  | ReturnType<typeof postShopReportAsync.failure>
  | ReturnType<typeof postReviewReportAsync.request>
  | ReturnType<typeof postReviewReportAsync.success>
  | ReturnType<typeof postReviewReportAsync.failure>;

export const getShopThunk = createAsyncThunk(getShopAsync, getShop);
export const getReviewThunk = createAsyncThunk(getReviewAsync, getReview);
export const postShopImageThunk = createAsyncThunk(postShopImagesAsync, shopImageUpload);
export const postMenuImageThunk = createAsyncThunk(postMenuImagesAsync, menuImageUpload);
export const likeShopThunk = createAsyncThunk(likeShopAsync, likeShopAPI);
export const unlikeShopThunk = createAsyncThunk(unlikeShopAsync, unlikeShopAPI);
export const likeCommentThunk = createAsyncThunk(likeCommentAsync, likeCommentAPI);
export const unlikeCommentThunk = createAsyncThunk(unlikeCommentAsync, unlikeCommentAPI);
export const getLocationThunk = createAsyncThunk(getLocationAsync, getLocation);
export const postShopReportThunk = createAsyncThunk(postShopReportAsync, reportShopAPI);
export const postReviewReportThunk = createAsyncThunk(postReviewReportAsync, reportReviewAPI);

type Modify<T, R> = Omit<T, keyof R> & R;

export interface ShopUIInterface
  extends Modify<
    ShopInterface,
    {
      location: string;
      category: string;
    }
  > {}

type DetailState = {
  form: {
    shopReport: {
      type: boolean[];
      comment: string;
    };
    reviewReport: {
      comment: string;
    };
  };
  shopReport: AsyncState<ReportInterface, number>;
  reviewReport: AsyncState<ReportInterface, number>;
  shop: AsyncState<ShopUIInterface, number>;
  reviews: AsyncState<ReviewInterface[], number>;
  shopImage: AsyncState<ImageUploadResponseInterface, number>;
  menuImage: AsyncState<ImageUploadResponseInterface, number>;
  like: AsyncState<LikeInterface, number>;
  mapAddress: AsyncState<{ x: number; y: number }, number>;
};

const initialState: DetailState = {
  form: {
    shopReport: {
      type: [false, false, false, false, false, false],
      comment: '',
    },
    reviewReport: {
      comment: '',
    },
  },
  shopReport: asyncState.initial(),
  reviewReport: asyncState.initial(),
  shop: asyncState.initial(
    {
      _id: '',
      name: '',
      location: '',
      latitude: 0,
      longitude: 0,
      contact: '',
      address: '',
      category: '',
      open: '',
      closed: '',
      shopImage: [],
      menuImage: [],
      menus: [],
      didLike: false,
      likerCount: 0,
      reviewCount: 0,
      scoreAverage: 0,
      keyword: {
        atmosphere: 0,
        costRatio: 0,
        group: 0,
        individual: 0,
        riceAppointment: 0,
        spicy: 0,
      },
      registerDate: new Date(),
    },
    true,
  ),
  reviews: asyncState.initial(new Array<ReviewInterface>()),
  shopImage: asyncState.initial(),
  menuImage: asyncState.initial(),
  like: asyncState.initial(),
  mapAddress: asyncState.initial(),
};

const detail = createReducer<DetailState, DetailAction>(initialState, {
  [RESET_DATA]: (state) => ({
    ...state,
    shop: {
      ...asyncState.initial(),
      loading: true,
    },
    reviews: asyncState.initial(new Array<ReviewInterface>()),
    shopImage: asyncState.initial(),
  }),
  [TOGGLE_SHOP_REPORT_BUTTON]: (state, { payload: num }) => ({
    ...state,
    form: {
      ...state.form,
      shopReport: {
        ...state.form.shopReport,
        type: state.form.shopReport.type.map((t, index) => (index === num ? !t : t)),
      },
    },
  }),
  [SET_SHOP_REPORT_COMMENT]: (state, { payload: comment }) => ({
    ...state,
    form: {
      ...state.form,
      shopReport: {
        ...state.form.shopReport,
        comment,
      },
    },
  }),
  [SET_REVIEW_REPORT_COMMENT]: (state, { payload: comment }) => ({
    ...state,
    form: {
      ...state.form,
      reviewReport: {
        ...state.form.reviewReport,
        comment,
      },
    },
  }),
  [GET_SHOP_INFO]: (state) => ({
    ...state,
    shop: asyncState.load(),
  }),
  [GET_SHOP_INFO_SUCCESS]: (state, { payload: shop }) => ({
    ...state,
    shop: asyncState.success({
      ...shop,
      location: locationToString(shop.location),
      category: categoryToString(shop.category),
    }),
  }),
  [GET_SHOP_INFO_ERROR]: (state, { payload: error }) => ({
    ...state,
    shop: asyncState.error(error.response?.status || 404),
  }),
  [GET_REVIEW]: (state) => ({
    ...state,
    shop: asyncState.load(),
  }),
  [GET_REVIEW_SUCCESS]: (state, { payload: reviews }) => ({
    ...state,
    reviews: asyncState.success(reviews),
  }),
  [GET_REVIEW_ERROR]: (state, { payload: error }) => ({
    ...state,
    reviews: asyncState.error(error.response?.status || 404),
  }),
  [POST_SHOP_IMAGES]: (state) => ({
    ...state,
    shopImage: asyncState.load(),
  }),
  [POST_SHOP_IMAGES_SUCCESS]: (state, { payload: locations }) => ({
    ...state,
    shopImage: asyncState.success(locations),
  }),
  [POST_SHOP_IMAGES_ERROR]: (state, { payload: error }) => ({
    ...state,
    shopImage: asyncState.error(error.response?.status || 404),
  }),
  [POST_MENU_IMAGES]: (state) => ({
    ...state,
    menuImage: asyncState.load(),
  }),
  [POST_MENU_IMAGES_SUCCESS]: (state, { payload: locations }) => ({
    ...state,
    menuImage: asyncState.success(locations),
  }),
  [POST_MENU_IMAGES_ERROR]: (state, { payload: error }) => ({
    ...state,
    menuImage: asyncState.error(error.response?.status || 404),
  }),
  [LIKE_SHOP]: (state) => ({
    ...state,
    like: asyncState.load(),
  }),
  [LIKE_SHOP_SUCCESS]: (state, { payload: like }) => ({
    ...state,
    like: asyncState.success(like),
  }),
  [LIKE_SHOP_ERROR]: (state, { payload: error }) => ({
    ...state,
    like: asyncState.error(error.response?.status || 404),
  }),
  [UNLIKE_SHOP]: (state) => ({
    ...state,
    like: asyncState.load(),
  }),
  [UNLIKE_SHOP_SUCCESS]: (state, { payload: like }) => ({
    ...state,
    like: asyncState.success(like),
  }),
  [UNLIKE_SHOP_ERROR]: (state, { payload: error }) => ({
    ...state,
    like: asyncState.error(error.response?.status || 404),
  }),
  [GET_LOCATION]: (state) => ({
    ...state,
    mapAddress: asyncState.load(),
  }),
  [GET_LOCATION_SUCCESS]: (state, { payload: data }) => ({
    ...state,
    mapAddress: data.documents.length ? asyncState.success({ x: Number(data.documents[0].x), y: Number(data.documents[0].y) }) : asyncState.error(406),
  }),
  [GET_LOCATION_ERROR]: (state, { payload: error }) => ({
    ...state,
    mapAddress: asyncState.error(error.response?.status || 404),
  }),
  [LIKE_COMMENT]: (state) => ({
    ...state,
  }),
  [LIKE_COMMENT_SUCCESS]: (state) => ({
    ...state,
  }),
  [LIKE_COMMENT_ERROR]: (state) => ({
    ...state,
  }),
  [UNLIKE_COMMENT]: (state) => ({
    ...state,
  }),
  [UNLIKE_COMMENT_SUCCESS]: (state) => ({
    ...state,
  }),
  [UNLIKE_COMMENT_ERROR]: (state) => ({
    ...state,
  }),
  [POST_SHOP_REPORT]: (state) => ({
    ...state,
    shopReport: asyncState.load(),
    form: {
      ...state.form,
      shopReport: {
        comment: '',
        type: [false, false, false, false, false, false],
      },
    },
  }),
  [POST_SHOP_REPORT_SUCCESS]: (state, { payload: data }) => ({
    ...state,
    shopReport: asyncState.success(data),
  }),
  [POST_SHOP_REPORT_ERROR]: (state, { payload: error }) => ({
    ...state,
    shopReport: asyncState.error(error.response?.status || 404),
  }),
  [POST_REVIEW_REPORT]: (state) => ({
    ...state,
    reviewReport: asyncState.load(),
    form: {
      ...state.form,
      reviewReport: {
        comment: '',
      },
    },
  }),
  [POST_REVIEW_REPORT_SUCCESS]: (state, { payload: data }) => ({
    ...state,
    reviewReport: asyncState.success(data),
  }),
  [POST_REVIEW_REPORT_ERROR]: (state, { payload: error }) => ({
    ...state,
    reviewReport: asyncState.error(error.response?.status || 404),
  }),
});
export default detail;
