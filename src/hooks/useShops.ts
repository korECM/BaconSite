import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { getShopsThunk } from '../modules/shops';
import { getShopsInterface } from '../api/getShops';

export default function useShops() {
  const { shops } = useSelector((state: RootState) => state.shops);
  const dispatch = useDispatch();

  const onGetShops = useCallback((options: getShopsInterface) => dispatch(getShopsThunk(options)), [dispatch]);

  return {
    shops,
    onGetShops,
  };
}
