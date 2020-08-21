import { createReducer, createAsyncAction } from 'typesafe-actions';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import createAsyncThunk from '../lib/createAsyncThunk';
import { AxiosError } from 'axios';
import { ShopsInterface, getShops } from '../api/getShops';

const GET_SHOPS = 'shops/GET_SHOPS' as const;
const GET_SHOPS_SUCCESS = 'shops/GET_SHOPS_SUCCESS' as const;
const GET_SHOPS_ERROR = 'shops/GET_SHOPS_ERROR' as const;

export const getShopsAsync = createAsyncAction(GET_SHOPS, GET_SHOPS_SUCCESS, GET_SHOPS_ERROR)<void, ShopsInterface[], AxiosError>();

export const getShopsThunk = createAsyncThunk(getShopsAsync, getShops);

type ShopsAction = ReturnType<typeof getShopsAsync.request> | ReturnType<typeof getShopsAsync.success> | ReturnType<typeof getShopsAsync.failure>;

interface ShopsState {
  shops: AsyncState<ShopsInterface[], number>;
}

const initialState: ShopsState = {
  shops: asyncState.initial(),
};

const shops = createReducer<ShopsState, ShopsAction>(initialState, {
  [GET_SHOPS]: (state) => ({
    ...state,
    shops: asyncState.load(),
  }),
  [GET_SHOPS_SUCCESS]: (state, { payload: data }) => ({
    ...state,
    shops: asyncState.success(data),
  }),
  [GET_SHOPS_ERROR]: (state, { payload: error }) => ({
    ...state,
    shops: asyncState.error(error.response?.status || 404),
  }),
});

export default shops;
