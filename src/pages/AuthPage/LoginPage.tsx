import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import palette from '../../styles/palette';
import Button from '../../components/common/Button';
import kakaotalk from './kakaotalk.png';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';

const AuthPageBlock = styled.div`
  padding: 0 5%;
`;
const AuthContainer = styled.div``;

const Logo = styled.div`
  margin: 50px 0;
`;

const AuthSelectBlock = styled.div`
  display: flex;

  margin-bottom: 30px;

  button {
    border: none;
    background-color: transparent;
    flex: 1;

    padding: 10px 0;
    &.select {
      border-bottom: 2px solid ${palette.mainRed};

      color: ${palette.darkGray};
    }
  }
`;

const InputBlock = styled.div``;

const StyledInputWrapper = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  & + & {
    margin-top: 15px;
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  flex: 1;
  font-size: 14px;
  padding: 5px 12.5px;
`;

const FooterText = styled.a`
  color: ${palette.middleGray};
  text-decoration: underline;
  font-size: 12px;
  margin-top: 12.5px;
  margin-bottom: 30px;
  display: block;
  float: right;
`;

const KakaoLogin = styled.button`
  border: none;
  padding: 15px;
  border-radius: 30px;
  font-size: 16px;
  background-color: #fee500;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 10px;
  }
`;

const redirectionURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/auth/kakao/callback' : 'http://221.149.10.240:5000/auth/kakao/callback';

function LoginPage({ history }: RouteComponentProps) {
  return (
    <Container color="white">
      <Header category="modal" headerColor="white" />
      <AuthPageBlock>
        <Logo>로고 들어가는 자리</Logo>
        <AuthContainer>
          <AuthSelectBlock>
            <button className={cx({ select: true })}>로그인</button>
            <button className={cx({ select: false })}>회원가입</button>
          </AuthSelectBlock>
          <InputBlock>
            <StyledInputWrapper>
              <AiOutlineUser />
              <StyledInput placeholder="이메일" type="email" />
            </StyledInputWrapper>
            <StyledInputWrapper>
              <AiOutlineLock />
              <StyledInput placeholder="비밀번호" type="password" />
            </StyledInputWrapper>
          </InputBlock>
          <FooterText>비밀번호 찾기</FooterText>
          <Button theme="red" fullWidth middle>
            로그인
          </Button>
          <a
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${redirectionURL}&response_type=code`}
          >
            <KakaoLogin>
              <img src={kakaotalk} />
              <span>카카오톡 계정으로 로그인</span>
            </KakaoLogin>
          </a>
        </AuthContainer>
      </AuthPageBlock>
    </Container>
  );
}

export default withRouter(LoginPage);
