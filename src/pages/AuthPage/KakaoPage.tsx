import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import useKakao from '../../hooks/useKakao';

const KakaoPageBlock = styled.div``;

function KakaoPage({ location }: RouteComponentProps) {
  const code = location.search
    .split('?')
    .filter((data) => data)
    .map((data) => data.split('=')[1])[0];

  const { kakao, name, kakaoName, onKakaoInit, onChangeInput, onKakaoRequestWithName } = useKakao(code);

  const onButtonClick = (id: string, name: string) => {
    onKakaoRequestWithName(id, name);
  };

  useEffect(() => {
    onKakaoInit();
  }, [onKakaoInit]);

  if (kakao.loading || kakaoName.loading) {
    return <div>로딩중</div>;
  }

  console.log(kakao.data);

  if (kakao.data!.status === 303) {
    return (
      <div>
        <input onChange={onChangeInput} value={name} />
        <button onClick={() => onButtonClick(kakao.data!.id, name)}>닉네임 직성</button>
      </div>
    );
  }

  return <KakaoPageBlock>카카오 로그인 성공</KakaoPageBlock>;
}

export default KakaoPage;
