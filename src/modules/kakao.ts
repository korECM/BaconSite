import { createAction, createReducer, createAsyncAction } from 'typesafe-actions';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import createAsyncThunk from '../lib/createAsyncThunk';
import { getKakaoCallback, KakaoInterface, setName, KakaoNameInterface } from '../api/auth';
import { AxiosError } from 'axios';

const KAKAO = 'kakao/KAKAO' as const;
const KAKAO_SUCCESS = 'kakao/KAKAO_SUCCESS' as const;
const KAKAO_ERROR = 'kakao/KAKAO_ERROR' as const;

const KAKAO_SET_NAME = 'kakao/KAKAO_SET_NAME' as const;
const KAKAO_SET_NAME_SUCCESS = 'kakao/KAKAO_SET_NAME_SUCCESS' as const;
const KAKAO_SET_NAME_ERROR = 'kakao/KAKAO_SET_NAME_ERROR' as const;

const ON_CHANGE_INPUT = 'kakao/ON_CHANGE_INPUT' as const;

const SET_GENDER = 'auth/SET_GENDER' as const;

const SET_VALID = 'kakao/SET_VALID' as const;

const SET_ERROR_MESSAGE = 'kakao/SET_ERROR_MESSAGE' as const;

export const onChange = createAction(ON_CHANGE_INPUT)<string>();
export const setGender = createAction(SET_GENDER)<'f' | 'm' | ''>();

export const setValid = createAction(SET_VALID)<boolean>();

export const setErrorMessage = createAction(SET_ERROR_MESSAGE)<string>();

export const kakaoSetNameAsync = createAsyncAction(KAKAO_SET_NAME, KAKAO_SET_NAME_SUCCESS, KAKAO_SET_NAME_ERROR)<void, KakaoNameInterface, AxiosError>();
export const kakaoAsync = createAsyncAction(KAKAO, KAKAO_SUCCESS, KAKAO_ERROR)<void, KakaoInterface, AxiosError>();

export const kakaoThunk = createAsyncThunk(kakaoAsync, getKakaoCallback);
export const kakaoSetNameThunk = createAsyncThunk(kakaoSetNameAsync, setName);

type KakaoAction =
  | ReturnType<typeof kakaoAsync.request>
  | ReturnType<typeof kakaoAsync.success>
  | ReturnType<typeof kakaoAsync.failure>
  | ReturnType<typeof kakaoSetNameAsync.request>
  | ReturnType<typeof kakaoSetNameAsync.success>
  | ReturnType<typeof kakaoSetNameAsync.failure>
  | ReturnType<typeof setGender>
  | ReturnType<typeof setValid>
  | ReturnType<typeof setErrorMessage>
  | ReturnType<typeof onChange>;

interface KakaoState {
  kakao: AsyncState<KakaoInterface, number>;
  kakaoName: AsyncState<KakaoNameInterface, string>;
  name: string;
  gender: 'm' | 'f' | '';
  valid: boolean;
}

const initialState: KakaoState = {
  kakao: asyncState.initial({
    id: '',
    status: 0,
  }),
  kakaoName: asyncState.initial(),
  name: '',
  gender: '',
  valid: false,
};

const kakao = createReducer<KakaoState, KakaoAction>(initialState, {
  [KAKAO]: (state) => ({
    ...state,
    kakao: asyncState.load(),
  }),
  [KAKAO_SUCCESS]: (state, { payload }) => ({
    ...state,
    kakao: asyncState.success(payload),
  }),
  [KAKAO_ERROR]: (state, { payload: error }) => ({
    ...state,
    kakao: asyncState.error(error.response?.status || 404),
  }),
  [ON_CHANGE_INPUT]: (state, { payload: input }) => ({
    ...state,
    name: input,
  }),
  [KAKAO_SET_NAME]: (state) => ({
    ...state,
    kakaoName: asyncState.load(),
  }),
  [KAKAO_SET_NAME_SUCCESS]: (state, { payload }) => ({
    ...state,
    kakaoName: asyncState.success(payload),
  }),
  [KAKAO_SET_NAME_ERROR]: (state, { payload: error }) => ({
    ...state,
    kakaoName: asyncState.error(error.response?.data),
  }),
  [SET_GENDER]: (state, { payload: gender }) => ({
    ...state,
    gender,
  }),
  [SET_VALID]: (state, { payload: valid }) => ({
    ...state,
    valid,
  }),
  [SET_ERROR_MESSAGE]: (state, { payload: errorMessage }) => ({
    ...state,
    kakaoName: {
      ...state.kakaoName,
      error: errorMessage,
    },
  }),
});

export default kakao;
