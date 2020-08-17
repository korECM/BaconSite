import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { changeInput, setMode, setErrorMessage, setValid, resetForm } from '../modules/auth';

export default function useAuth() {
  const { form, mode, errorMessage, valid } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const changeInputDispatch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(
        changeInput({
          target: event.target.name,
          value: event.target.value,
        }),
      ),
    [dispatch],
  );

  const setModeDispatch = useCallback((mode: 'login' | 'register') => dispatch(setMode(mode)), [dispatch]);

  const setErrorMessageDispatch = useCallback((message: string) => dispatch(setErrorMessage(message)), [dispatch]);

  const setValidDispatch = useCallback(
    (valid: boolean) => {
      dispatch(setValid(valid));
    },
    [dispatch],
  );

  const resetFormDispatch = useCallback(() => {
    dispatch(resetForm());
  }, [dispatch]);

  return {
    form,
    mode,
    errorMessage,
    valid,
    changeInputDispatch,
    setModeDispatch,
    setErrorMessageDispatch,
    resetFormDispatch,
    setValidDispatch,
  };
}
