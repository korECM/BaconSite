import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { apiLink } from '../../lib/getAPILink';

const LoginPageBlock = styled.div``;

function LoginPage({ history }: RouteComponentProps) {
  return (
    <LoginPageBlock>
      <a
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${
          process.env.REACT_APP_KAKAO_REST_API_KEY
        }&redirect_uri=${'http://localhost:3000/auth/kakao/callback'}&response_type=code`}
      >
        카카오 로그인
      </a>
    </LoginPageBlock>
  );
}

export default withRouter(LoginPage);
