import { createAction, createReducer, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import createAsyncThunk from '../lib/createAsyncThunk';
import { AsyncState, asyncState } from '../lib/reducerUtils';

const CHANGE_INPUT = 'auth/CHANGE_INPUT' as const;

const SET_MODE = 'auth/SET_MODE' as const;

const SET_ERROR_MESSAGE = 'auth/SET_ERROR_MESSAGE' as const;

const SET_VALID = 'auth/SET_VALID' as const;

const RESET_FORM = 'auth/RESET_FORM' as const;

export const changeInput = createAction(CHANGE_INPUT)<{ target: string; value: string }>();
export const setMode = createAction(SET_MODE)<'login' | 'register'>();
export const setErrorMessage = createAction(SET_ERROR_MESSAGE)<string>();
export const setValid = createAction(SET_VALID)<boolean>();
export const resetForm = createAction(RESET_FORM)();

type AuthAction =
  | ReturnType<typeof changeInput>
  | ReturnType<typeof setMode>
  | ReturnType<typeof setErrorMessage>
  | ReturnType<typeof setValid>
  | ReturnType<typeof resetForm>;

interface AuthState {
  form: {
    email: string;
    password: string;
    name: string;
    passwordConfirm: string;
  };
  mode: 'login' | 'register';
  errorMessage: string;
  valid: boolean;
}

const initialState: AuthState = {
  form: {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  },
  mode: 'login',
  errorMessage: '',
  valid: false,
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
    },
    errorMessage: '',
    valid: false,
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
    },
    mode: 'login',
    errorMessage: '',
    valid: false,
  }),
});

export default auth;
