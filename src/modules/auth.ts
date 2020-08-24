import { createAction, createReducer, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import createAsyncThunk from '../lib/createAsyncThunk';
import { register, login, logout } from '../api/auth';

const CHANGE_INPUT = 'auth/CHANGE_INPUT' as const;

const SET_MODE = 'auth/SET_MODE' as const;

const SET_ERROR_MESSAGE = 'auth/SET_ERROR_MESSAGE' as const;

const SET_VALID = 'auth/SET_VALID' as const;

const RESET_FORM = 'auth/RESET_FORM' as const;

const SET_GENDER = 'auth/SET_GENDER' as const;

const REGISTER = 'auth/REGISTER' as const;
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS' as const;
const REGISTER_ERROR = 'auth/REGISTER_ERROR' as const;

const LOGIN = 'auth/LOGIN' as const;
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
const LOGIN_ERROR = 'auth/LOGIN_ERROR' as const;

export const changeInput = createAction(CHANGE_INPUT)<{ target: string; value: string }>();
export const setMode = createAction(SET_MODE)<'login' | 'register'>();
export const setErrorMessage = createAction(SET_ERROR_MESSAGE)<string>();
export const setValid = createAction(SET_VALID)<boolean>();
export const resetForm = createAction(RESET_FORM)();
export const setGender = createAction(SET_GENDER)<'f' | 'm' | ''>();

export const registerAsync = createAsyncAction(REGISTER, REGISTER_SUCCESS, REGISTER_ERROR)<void, void, AxiosError>();
export const loginAsync = createAsyncAction(LOGIN, LOGIN_SUCCESS, LOGIN_ERROR)<void, void, AxiosError>();

export const registerThunk = createAsyncThunk(registerAsync, register);
export const loginThunk = createAsyncThunk(loginAsync, login);

type AuthAction =
  | ReturnType<typeof changeInput>
  | ReturnType<typeof setMode>
  | ReturnType<typeof setErrorMessage>
  | ReturnType<typeof setValid>
  | ReturnType<typeof resetForm>
  | ReturnType<typeof registerAsync.request>
  | ReturnType<typeof registerAsync.success>
  | ReturnType<typeof registerAsync.failure>
  | ReturnType<typeof loginAsync.request>
  | ReturnType<typeof loginAsync.success>
  | ReturnType<typeof loginAsync.failure>
  | ReturnType<typeof setGender>;

interface AuthState {
  form: {
    email: string;
    password: string;
    name: string;
    passwordConfirm: string;
    gender: 'f' | 'm' | '';
  };
  mode: 'login' | 'register';
  errorMessage: string;
  valid: boolean;
  loading: boolean;
  success: boolean;
}

const initialState: AuthState = {
  form: {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    gender: '',
  },
  mode: 'login',
  errorMessage: '',
  valid: false,
  loading: false,
  success: false,
};

const auth = createReducer<AuthState, AuthAction>(initialState, {
  [CHANGE_INPUT]: (state, { payload }) => ({
    ...state,
    form: {
      ...state.form,
      [payload.target]: payload.value,
    },
  }),
  [SET_MODE]: (state, { payload: mode }) => ({
    ...state,
    mode,
    form: {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      gender: '',
    },
    errorMessage: '',
    valid: false,
    loading: false,
    success: false,
  }),
  [SET_ERROR_MESSAGE]: (state, { payload: errorMessage }) => ({
    ...state,
    errorMessage,
  }),
  [SET_VALID]: (state, { payload: valid }) => ({
    ...state,
    valid,
  }),
  [RESET_FORM]: (state) => ({
    ...state,
    form: {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      gender: '',
    },
    mode: 'login',
    errorMessage: '',
    valid: false,
    loading: false,
    success: false,
  }),
  [SET_GENDER]: (state, { payload: gender }) => ({
    ...state,
    form: {
      ...state.form,
      gender,
    },
  }),
  [REGISTER]: (state) => ({
    ...state,
    loading: true,
    success: false,
  }),
  [REGISTER_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    success: true,
  }),
  [REGISTER_ERROR]: (state, { payload: error }) => ({
    ...state,
    errorMessage: error.response?.data || '회원가입 도중 문제가 생겼습니다',
    loading: false,
    success: false,
  }),
  [LOGIN]: (state) => ({
    ...state,
    loading: true,
    success: false,
  }),
  [LOGIN_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    success: true,
  }),
  [LOGIN_ERROR]: (state, { payload: error }) => ({
    ...state,
    errorMessage: error.response?.status === 400 ? '가입되지 않은 이메일이거나, 잘못된 비밀번호입니다.' : error.response?.data || '로그인 중 문제가 생겼습니다',
    loading: false,
    success: false,
  }),
});

export default auth;
