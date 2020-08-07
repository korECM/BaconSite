import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { kakaoThunk, onChange, kakaoSetNameThunk } from '../modules/kakao';

export default function useKakao(code: string) {
  const { kakao, name, kakaoName } = useSelector((state: RootState) => state.kakao);
  const dispatch = useDispatch();

  const onKakaoInit = useCallback(() => dispatch(kakaoThunk(code)), [dispatch, code]);

  const onKakaoRequestWithName = useCallback((id: string, name: string) => dispatch(kakaoSetNameThunk(id, name)), [dispatch]);

  const onChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => dispatch(onChange(event.target.value)), [dispatch]);

  return {
    kakao,
    name,
    kakaoName,
    onKakaoInit,
    onKakaoRequestWithName,
    onChangeInput,
  };
}
