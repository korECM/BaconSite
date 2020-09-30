import { createAction, createReducer, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import createAsyncThunk from '../lib/createAsyncThunk';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import { getMainPostAPI, MainPostInterface } from 'api/getMainPost';

const GET_MAIN_POST = 'myPage/GET_MAIN_POST' as const;
const GET_MAIN_POST_SUCCESS = 'myPage/GET_MAIN_POST_SUCCESS' as const;
const GET_MAIN_POST_ERROR = 'myPage/GET_MAIN_POST_ERROR' as const;

export const getMainPostAsync = createAsyncAction(GET_MAIN_POST, GET_MAIN_POST_SUCCESS, GET_MAIN_POST_ERROR)<void, MainPostInterface[], AxiosError>();

export const getMainPostThunk = createAsyncThunk(getMainPostAsync, getMainPostAPI);

type MainAction = ReturnType<typeof getMainPostAsync.request> | ReturnType<typeof getMainPostAsync.success> | ReturnType<typeof getMainPostAsync.failure>;

interface MainState {
  posts: AsyncState<MainPostInterface[], number>;
}

const initialState: MainState = {
  posts: asyncState.initial(),
};

const Main = createReducer<MainState, MainAction>(initialState, {
  [GET_MAIN_POST]: (state) => ({
    ...state,
  }),
  [GET_MAIN_POST_SUCCESS]: (state, { payload: posts }) => ({
    ...state,
    posts: asyncState.success(posts),
  }),
  [GET_MAIN_POST_ERROR]: (state, { payload: error }) => ({
    ...state,
    posts: asyncState.error(error.response?.status || 404),
  }),
});
export default Main;
