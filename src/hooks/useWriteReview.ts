import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { onChangeInput, writeReviewThunk, onButtonClick } from '../modules/writeReview';

export default function useWriteReview(shopId: string) {
  const { keywords, review, score } = useSelector((state: RootState) => state.writeReview);
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

  return {
    onChangeInputDispatch,
    onSubmit,
    onClick,
    keywords,
    review,
  };
}
