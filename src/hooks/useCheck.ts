import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { checkThunk } from '../modules/user';

export default function useCheck() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const check = useCallback(() => dispatch(checkThunk()), [dispatch]);

  return {
    user: user.data,
    check,
  };
}
