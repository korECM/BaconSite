import { createAction, createReducer, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { ShopInterface, getShop, Location, ShopCategory } from '../api/getShop';
import createAsyncThunk from '../lib/createAsyncThunk';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import { ReviewInterface, getReview } from '../api/getReview';
import { ImageUploadResponseInterface, shopImageUpload, menuImageUpload } from '../api/uploadImage';
import { LikeInterface, likeShopAPI, unlikeShopAPI } from '../api/likeShop';
import { LocationInterface, getLocation } from '../api/getLocation';

const RESET_DATA = 'detail/RESET_DATA' as const;

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

const GET_LOCATION = 'detail/GET_LOCATION' as const;
const GET_LOCATION_SUCCESS = 'detail/GET_LOCATION_SUCCESS' as const;
const GET_LOCATION_ERROR = 'detail/GET_LOCATION_ERROR' as const;

export const resetData = createAction(RESET_DATA)();

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

export const getLocationAsync = createAsyncAction(GET_LOCATION, GET_LOCATION_SUCCESS, GET_LOCATION_ERROR)<void, LocationInterface, AxiosError>();

type DetailAction =
  | ReturnType<typeof resetData>
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
  | ReturnType<typeof getLocationAsync.request>
  | ReturnType<typeof getLocationAsync.success>
  | ReturnType<typeof getLocationAsync.failure>;

export const getShopThunk = createAsyncThunk(getShopAsync, getShop);
export const getReviewThunk = createAsyncThunk(getReviewAsync, getReview);
export const postShopImageThunk = createAsyncThunk(postShopImagesAsync, shopImageUpload);
export const postMenuImageThunk = createAsyncThunk(postMenuImagesAsync, menuImageUpload);
export const likeShopThunk = createAsyncThunk(likeShopAsync, likeShopAPI);
export const unlikeShopThunk = createAsyncThunk(unlikeShopAsync, unlikeShopAPI);
export const getLocationThunk = createAsyncThunk(getLocationAsync, getLocation);

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
  shop: AsyncState<ShopUIInterface, number>;
  reviews: AsyncState<ReviewInterface[], number>;
  shopImage: AsyncState<ImageUploadResponseInterface, number>;
  menuImage: AsyncState<ImageUploadResponseInterface, number>;
  like: AsyncState<LikeInterface, number>;
  mapAddress: AsyncState<{ x: number; y: number }, number>;
};

const initialState: DetailState = {
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

const categoryToString = (category: ShopCategory) => {
  switch (category) {
    case ShopCategory.Korean:
      return '한식';
    case ShopCategory.Japanese:
      return '일식';
    case ShopCategory.Chinese:
      return '중식';
    case ShopCategory.Western:
      return '양식';
    case ShopCategory.Fusion:
      return '퓨전';
    case ShopCategory.School:
      return '분식';
    case ShopCategory.other:
      return '기타';
    default:
      return '';
  }
};

const locationToString = (location: Location) => {
  switch (location) {
    case Location.Front:
      return '정문 근처';
    case Location.Back:
      return '후문 근처';
    case Location.HsStation:
      return '중대 병원 근처';
    case Location.FrontFar:
      return '흑석역 근처';
    default:
      return '';
  }
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
});
export default detail;
