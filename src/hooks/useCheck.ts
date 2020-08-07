import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { checkThunk, setUser } from '../modules/user';
import { UserInterface } from '../api/auth';

export default function useCheck() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const check = useCallback(() => dispatch(checkThunk()), [dispatch]);

  return {
    user: user.data,
    check,
  };
}
