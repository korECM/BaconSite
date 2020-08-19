import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { kakaoThunk, onChange, kakaoSetNameThunk, setGender, setValid, setErrorMessage } from '../modules/kakao';

export default function useKakao(code: string) {
  const { kakao, name, kakaoName, gender, valid } = useSelector((state: RootState) => state.kakao);
  const dispatch = useDispatch();

  const onKakaoInit = useCallback(() => dispatch(kakaoThunk(code)), [dispatch, code]);

  const onKakaoRequestWithName = useCallback((id: string) => dispatch(kakaoSetNameThunk(id, name, gender)), [dispatch, name, gender]);

  const onChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => dispatch(onChange(event.target.value)), [dispatch]);

  const setGenderDispatch = useCallback((gender: 'f' | 'm' | '') => dispatch(setGender(gender)), [dispatch]);

  const setValidDispatch = useCallback((valid: boolean) => dispatch(setValid(valid)), [dispatch]);

  const setErrorMessageDispatch = useCallback((message: string) => dispatch(setErrorMessage(message)), [dispatch]);

  return {
    kakao,
    name,
    kakaoName,
    gender,
    valid,
    onKakaoInit,
    onKakaoRequestWithName,
    onChangeInput,
    setGenderDispatch,
    setValidDispatch,
    setErrorMessageDispatch,
  };
}
