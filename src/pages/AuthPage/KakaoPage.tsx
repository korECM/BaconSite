import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import useKakao from '../../hooks/useKakao';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import Loader from 'react-spinners/PacmanLoader';
import palette from '../../styles/palette';

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
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <Loader color={palette.mainRed} />
      </Container>
    );
  }

  console.log(kakao.data);

  if (kakao.data === null) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <div>기술상의 문제로 현재 로그인할 수 없습니다</div>
      </Container>
    );
  }

  if (kakao.data!.status === 303) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <input onChange={onChangeInput} value={name} />
        <button onClick={() => onButtonClick(kakao.data!.id, name)}>닉네임 직성</button>
      </Container>
    );
  }

  return (
    <Container color="white">
      <Header category="modal" headerColor="white" />
      카카오 로그인 성공
    </Container>
  );
}

export default KakaoPage;
