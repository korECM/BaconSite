import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { getMainPostThunk } from '../modules/main';

export default function useMainPost() {
  const { posts } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();

  const getMainPost = useCallback(() => dispatch(getMainPostThunk()), [dispatch]);

  return {
    posts,
    getMainPost,
  };
}
