import { createAction, createReducer, createAsyncAction } from 'typesafe-actions';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import createAsyncThunk from '../lib/createAsyncThunk';
import { writeReviewAPI } from '../api/writeReview';
import { AxiosError } from 'axios';
const ON_CHANGE_INPUT = 'writeReview/ON_CHANGE_INPUT' as const;

const ON_BUTTON_CLICK = 'writeReview/ON_BUTTON_CLICK' as const;

const WRITE_REVIEW = 'writeReview/WRITE_REVIEW' as const;
const WRITE_REVIEW_SUCCESS = 'writeReview/WRITE_REVIEW_SUCCESS' as const;
const WRITE_REVIEW_ERROR = 'writeReview/WRITE_REVIEW_ERROR' as const;

const writeReviewAsync = createAsyncAction(WRITE_REVIEW, WRITE_REVIEW_SUCCESS, WRITE_REVIEW_ERROR)<void, void, AxiosError>();

export const writeReviewThunk = createAsyncThunk(writeReviewAsync, writeReviewAPI);

interface change {
  value: string;
  target: string;
}

export const onChangeInput = createAction(ON_CHANGE_INPUT)<change>();

export const onButtonClick = createAction(ON_BUTTON_CLICK)<string>();

type WriteReviewAction =
  | ReturnType<typeof onChangeInput>
  | ReturnType<typeof onButtonClick>
  | ReturnType<typeof writeReviewAsync.request>
  | ReturnType<typeof writeReviewAsync.success>
  | ReturnType<typeof writeReviewAsync.failure>;

interface WriteReviewState {
  keywords: {
    atmosphere: boolean;
    costRatio: boolean;
    group: boolean;
    individual: boolean;
    riceAppointment: boolean;
    spicy: boolean;
  };
  score: string;
  review: string;
  reviewRequest: AsyncState<null, number>;
}

const initialState: WriteReviewState = {
  keywords: {
    atmosphere: false,
    costRatio: false,
    group: false,
    individual: false,
    riceAppointment: false,
    spicy: false,
  },
  score: '',
  review: '',
  reviewRequest: asyncState.initial(),
};

const writeReview = createReducer<WriteReviewState, WriteReviewAction>(initialState, {
  [ON_CHANGE_INPUT]: (state, { payload }) => ({
    ...state,
    [payload.target]: payload.value,
  }),
  [WRITE_REVIEW]: (state) => ({
    ...state,
    reviewRequest: asyncState.load(),
  }),
  [WRITE_REVIEW_SUCCESS]: (state) => ({
    ...state,
    reviewRequest: asyncState.success(null),
  }),
  [WRITE_REVIEW_ERROR]: (state, { payload: error }) => ({
    ...state,
    reviewRequest: asyncState.error(error.response?.status || 404),
  }),
  [ON_BUTTON_CLICK]: (state, { payload: name }) => ({
    ...state,
    keywords: {
      ...state.keywords,
      [name]: !(state.keywords as any)[name],
    },
  }),
});
export default writeReview;
