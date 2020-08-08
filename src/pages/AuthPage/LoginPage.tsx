import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';

const LoginPageBlock = styled.div``;

const redirectionURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/auth/kakao/callback' : 'http://221.149.10.240:5000/auth/kakao/callback';

function LoginPage({ history }: RouteComponentProps) {
  return (
    <Container color="white">
      <Header category="modal" headerColor="white" />
      <a
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${redirectionURL}&response_type=code`}
      >
        카카오 로그인
      </a>
    </Container>
  );
}

export default withRouter(LoginPage);
