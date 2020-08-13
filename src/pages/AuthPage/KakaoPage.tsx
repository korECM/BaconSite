import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import useKakao from '../../hooks/useKakao';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import palette from '../../styles/palette';
import useCheck from '../../hooks/useCheck';
import Loader from '../../components/common/Loader';

const KakaoPageBlock = styled.div``;

function KakaoPage({ location, history }: RouteComponentProps) {
  const code = location.search
    .split('?')
    .filter((data) => data)
    .map((data) => data.split('=')[1])[0];

  const { kakao, name, kakaoName, onKakaoInit, onChangeInput, onKakaoRequestWithName } = useKakao(code);

  const { check, user } = useCheck();

  const onButtonClick = (id: string, name: string) => {
    onKakaoRequestWithName(id, name);
    check();
  };

  useEffect(() => {
    onKakaoInit();
  }, [onKakaoInit]);

  useEffect(() => {
    if (kakao.data) {
      check();
    }
  }, [kakao.data, check]);

  useEffect(() => {
    if (user) {
      console.log('check 성공');
      console.log(user);
      try {
        localStorage.setItem('user', JSON.stringify(user));
        let redir = localStorage.getItem('redir');
        history.push(redir || '/');
      } catch (error) {
        console.error('localStorage 사용 불가');
      }
    }
  }, [user, history]);

  if (kakao.loading || kakaoName.loading) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <Loader />
      </Container>
    );
  }

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
