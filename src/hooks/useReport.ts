import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { reportThunk } from 'modules/report';

export default function useReport() {
  const { report } = useSelector((state: RootState) => state.report);
  const dispatch = useDispatch();

  const reportDispatch = useCallback((imageId: string) => dispatch(reportThunk(imageId)), [dispatch]);

  return {
    report,
    reportDispatch,
  };
}
