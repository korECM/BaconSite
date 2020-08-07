import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import KakaoPage from './KakaoPage';

const LoginPageRouterBlock = styled.div`
  height: 100%;
`;

function LoginPageRouter({ match }: RouteComponentProps) {
  console.log(`${match.path}/kakao/callback`);
  return (
    <LoginPageRouterBlock>
      <Route exact path={`${match.path}/login`} component={LoginPage} />
      <Route exact path={`${match.path}/kakao/callback`} component={KakaoPage} />
    </LoginPageRouterBlock>
  );
}

export default withRouter(LoginPageRouter);
