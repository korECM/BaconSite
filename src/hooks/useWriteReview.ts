import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { onChangeInput, writeReviewThunk, onButtonClick, resetForm } from '../modules/writeReview';

export default function useWriteReview(shopId: string) {
  const { keywords, review, score, reviewRequest } = useSelector((state: RootState) => state.writeReview);
  const dispatch = useDispatch();

  const onChangeInputDispatch = useCallback(
    (target: string, value: string) =>
      dispatch(
        onChangeInput({
          target,
          value,
        }),
      ),
    [dispatch],
  );

  const onSubmit = useCallback(() => {
    dispatch(
      writeReviewThunk(shopId, {
        comment: review,
        score,
        keywords,
      }),
    );
  }, [dispatch, shopId, review, score, keywords]);

  const onClick = useCallback(
    (name: string) => {
      dispatch(onButtonClick(name));
    },
    [dispatch],
  );

  const reset = useCallback(() => {
    dispatch(resetForm());
  }, [dispatch]);

  return {
    onChangeInputDispatch,
    onSubmit,
    onClick,
    reset,
    keywords,
    review,
    reviewRequest,
    score,
  };
}
