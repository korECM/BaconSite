import { createAction, createReducer, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { ShopInterface, getShop, Location, ShopCategory, Keyword } from '../api/getShop';
import createAsyncThunk from '../lib/createAsyncThunk';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import { ReviewInterface, getReview } from '../api/getReview';
import { ImageUploadResponseInterface, imageUpload } from '../api/uploadImage';

const GET_SHOP_INFO = 'detail/GET_SHOP_INFO' as const;
const GET_SHOP_INFO_SUCCESS = 'detail/GET_SHOP_INFO_SUCCESS' as const;
const GET_SHOP_INFO_ERROR = 'detail/GET_SHOP_INFO_ERROR' as const;

const GET_REVIEW = 'detail/GET_REVIEW' as const;
const GET_REVIEW_SUCCESS = 'detail/GET_REVIEW_SUCCESS' as const;
const GET_REVIEW_ERROR = 'detail/GET_REVIEW_ERROR' as const;

const POST_IMAGES = 'detail/POST_IMAGES' as const;
const POST_IMAGES_SUCCESS = 'detail/POST_IMAGES_SUCCESS' as const;
const POST_IMAGES_ERROR = 'detail/POST_IMAGES_ERROR' as const;

export const getShopAsync = createAsyncAction(GET_SHOP_INFO, GET_SHOP_INFO_SUCCESS, GET_SHOP_INFO_ERROR)<void, ShopInterface, AxiosError>();

export const getReviewAsync = createAsyncAction(GET_REVIEW, GET_REVIEW_SUCCESS, GET_REVIEW_ERROR)<void, ReviewInterface[], AxiosError>();

export const postImagesAsync = createAsyncAction(POST_IMAGES, POST_IMAGES_SUCCESS, POST_IMAGES_ERROR)<void, ImageUploadResponseInterface, AxiosError>();

type DetailAction =
  | ReturnType<typeof getShopAsync.request>
  | ReturnType<typeof getShopAsync.success>
  | ReturnType<typeof getShopAsync.failure>
  | ReturnType<typeof getReviewAsync.request>
  | ReturnType<typeof getReviewAsync.success>
  | ReturnType<typeof getReviewAsync.failure>
  | ReturnType<typeof postImagesAsync.request>
  | ReturnType<typeof postImagesAsync.success>
  | ReturnType<typeof postImagesAsync.failure>;

export const getShopThunk = createAsyncThunk(getShopAsync, getShop);
export const getReviewThunk = createAsyncThunk(getReviewAsync, getReview);
export const postImageThunk = createAsyncThunk(postImagesAsync, imageUpload);

interface ShopUIInterface {
  name: string;
  location: string;
  address: string;
  contact: string;
  open: string;
  closed: string;
  category: string;
  keyword: Keyword;
  image: string[];
  scoreAverage: number;
  reviewCount: number;
  likerCount: number;
  didLike: boolean;
}

type DetailState = {
  shop: AsyncState<ShopUIInterface, number>;
  reviews: AsyncState<ReviewInterface[], number>;
  images: AsyncState<ImageUploadResponseInterface, number>;
};

const initialState: DetailState = {
  shop: asyncState.initial({
    name: '',
    location: '',
    contact: '',
    address: '',
    category: '',
    open: '',
    closed: '',
    image: [],
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
  }),
  reviews: asyncState.initial(new Array<ReviewInterface>()),
  images: asyncState.initial(),
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
  [POST_IMAGES]: (state) => ({
    ...state,
    images: asyncState.load(),
  }),
  [POST_IMAGES_SUCCESS]: (state, { payload: locations }) => ({
    ...state,
    images: asyncState.success(locations),
  }),
  [POST_IMAGES_ERROR]: (state, { payload: error }) => ({
    ...state,
    images: asyncState.error(error.response?.status || 404),
  }),
});
export default detail;
