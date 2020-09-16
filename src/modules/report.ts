import { createAction, createReducer, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import createAsyncThunk from '../lib/createAsyncThunk';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import { check, UserInterface, logout } from '../api/auth';
import { ReportInterface, reportImageAPI } from 'api/report';

const REPORT = 'report/REPORT' as const;
const REPORT_SUCCESS = 'report/REPORT_SUCCESS' as const;
const REPORT_ERROR = 'report/REPORT_ERROR' as const;

export const reportAsync = createAsyncAction(REPORT, REPORT_SUCCESS, REPORT_ERROR)<void, ReportInterface, AxiosError>();

export const reportThunk = createAsyncThunk(reportAsync, reportImageAPI);

type ReportAction = ReturnType<typeof reportAsync.request> | ReturnType<typeof reportAsync.success> | ReturnType<typeof reportAsync.failure>;

interface ReportState {
  report: AsyncState<ReportInterface, number>;
}

const initialState: ReportState = {
  report: asyncState.initial(),
};

const report = createReducer<ReportState, ReportAction>(initialState, {
  [REPORT]: (state) => ({
    ...state,
    report: asyncState.load(),
  }),
  [REPORT_SUCCESS]: (state, { payload: response }) => ({
    ...state,
    report: asyncState.success(response),
  }),
  [REPORT_ERROR]: (state, { payload: error }) => ({
    ...state,
    report: asyncState.error(error.response?.status || 404),
  }),
});
export default report;
