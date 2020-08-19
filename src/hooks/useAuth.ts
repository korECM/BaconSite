import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { changeInput, setMode, setErrorMessage, setValid, resetForm, setGender, registerThunk } from '../modules/auth';
import { RegisterInterface } from '../api/auth';

export default function useAuth() {
  const { form, mode, errorMessage, valid, loading, success } = useSelector((state: RootState) => state.auth);
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
  const setGenderDispatch = useCallback((gender: 'f' | 'm' | '') => dispatch(setGender(gender)), [dispatch]);

  const registerDispatch = useCallback((data: RegisterInterface) => dispatch(registerThunk(data)), [dispatch]);

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
    loading,
    success,
    changeInputDispatch,
    setModeDispatch,
    setErrorMessageDispatch,
    resetFormDispatch,
    setValidDispatch,
    setGenderDispatch,
    registerDispatch,
  };
}
