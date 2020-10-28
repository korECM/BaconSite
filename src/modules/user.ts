import { createAction, createReducer, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import createAsyncThunk from '../lib/createAsyncThunk';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import { check, UserInterface, logout } from '../api/auth';

const CHECK = 'user/CHECK' as const;
const CHECK_SUCCESS = 'user/CHECK_SUCCESS' as const;
const CHECK_ERROR = 'user/CHECK_ERROR' as const;

const CHECK_WITH_SET = "user/CHECK_WITH_SET" as const;
const CHECK_WITH_SET_SUCCESS = "user/CHECK_WITH_SET_SUCCESS" as const;
const CHECK_WITH_SET_ERROR = "user/CHECK_WITH_SET_ERROR" as const;

const SET_USER = 'user/SET_USER' as const;

const LOGOUT = 'auth/LOGOUT' as const;
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS' as const;
const LOGOUT_ERROR = 'auth/LOGOUT_ERROR' as const;

export const setUser = createAction(SET_USER)<UserInterface>();

export const checkAsync = createAsyncAction(CHECK, CHECK_SUCCESS, CHECK_ERROR)<void, UserInterface, AxiosError>();
export const checkWitSetAsync = createAsyncAction(CHECK_WITH_SET, CHECK_WITH_SET_SUCCESS, CHECK_WITH_SET_ERROR)<void, UserInterface, AxiosError>();
export const logoutAsync = createAsyncAction(LOGOUT, LOGOUT_SUCCESS, LOGOUT_ERROR)<void, void, AxiosError>();

export const checkThunk = createAsyncThunk(checkAsync, check);
export const checkWitSetThunk = createAsyncThunk(checkWitSetAsync, check);
export const logoutThunk = createAsyncThunk(logoutAsync, logout);

type UserAction =
  | ReturnType<typeof checkAsync.request>
  | ReturnType<typeof checkAsync.success>
  | ReturnType<typeof checkAsync.failure>
  | ReturnType<typeof checkWitSetAsync.request>
  | ReturnType<typeof checkWitSetAsync.success>
  | ReturnType<typeof checkWitSetAsync.failure>
  | ReturnType<typeof logoutAsync.request>
  | ReturnType<typeof logoutAsync.success>
  | ReturnType<typeof logoutAsync.failure>
  | ReturnType<typeof setUser>;

interface UserState {
  user: AsyncState<UserInterface, number>;
}

const initialState: UserState = {
  user: asyncState.initial(),
};

const user = createReducer<UserState, UserAction>(initialState, {
  [SET_USER]: (state, { payload: user }) => ({ ...state, user: asyncState.success(user) }),
  [CHECK]: (state) => ({
    ...state,
  }),
  [CHECK_SUCCESS]: (state, { payload: user }) => ({
    ...state,
    user: asyncState.success(user),
  }),
  [CHECK_ERROR]: (state, { payload: error }) => {
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('localStorage 작동 안함');
    }
    return {
      ...state,
      user: asyncState.error(error.response?.status || 404),
    };
  },
  [CHECK_WITH_SET]: (state) => ({
    ...state,
  }),
  [CHECK_WITH_SET_SUCCESS]: (state, { payload: user }) => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('localStorage 작동 안함');
    }
    return {
    ...state,
    user: asyncState.success(user)
    }
  },
  [CHECK_WITH_SET_ERROR]: (state, { payload: error }) => {
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('localStorage 작동 안함');
    }
    return {
      ...state,
      user: asyncState.error(error.response?.status || 404),
    };
  },
  [LOGOUT]: (state) => {
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('localStorage 작동 안함');
    }
    return {
      ...state,
      user: {
        ...state.user,
        data: null,
      },
    };
  },
});
export default user;
