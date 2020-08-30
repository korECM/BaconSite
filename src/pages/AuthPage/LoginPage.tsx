import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import palette from '../../styles/palette';
import Button from '../../components/common/Button';
import kakaotalk from 'assets/kakaotalk.png';
import gender from 'assets/gender.png';
import { AiOutlineUser, AiOutlineLock, AiOutlineIdcard } from 'react-icons/ai';
import useAuth from '../../hooks/useAuth';
import useCheck from '../../hooks/useCheck';
import StyledInput from '../../components/common/StyledInput';
import LogoImage from 'assets/fooding_titlelogo.png';
import Title from 'lib/meta';

const AuthPageBlock = styled.div`
  padding: 0 5%;
`;
const AuthContainer = styled.form``;

const Logo = styled.div`
  margin: 50px 0;
  h1 {
    color: black;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  img {
    display: block;
    height: 64px;
    width: 284px;
    margin: 0 auto;
  }
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

const InputBlock = styled.div`
  margin-bottom: 40px;
`;

const GenderWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-top: 15px;

  img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }

  button {
    flex: 1;
    /* margin: 0 10px; */
    padding: 7.5px 10px;
    border: 1px solid ${palette.mainRed};
    outline: none;
    background-color: transparent;
    border-radius: 10px 0 0 10px;
    color: ${palette.mainRed};
    transition: background-color 0.2s ease, color 0.2s ease;
    &.selected {
      color: ${palette.white};
      background-color: ${palette.mainRed};
    }
  }
  button + button {
    border-left: none;
    border-radius: 0 10px 10px 0;
  }
`;

const FooterText = styled.a`
  color: ${palette.middleGray};
  text-decoration: underline;
  font-size: 10px;
  margin-top: 12.5px;
  display: block;
  float: right;
`;

const ErrorMessage = styled.div`
  color: ${palette.mainRed};
  text-align: center;
  font-size: 12.5px;
  height: 16px;
  font-weight: lighter;
  margin-bottom: 20px;
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

const redirectionURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/auth/kakao/callback' : 'https://caufooding.com/auth/kakao/callback';

function LoginPage({ history }: RouteComponentProps) {
  const {
    form,
    mode,
    errorMessage,
    valid,
    loading,
    success,
    changeInputDispatch,
    setModeDispatch,
    resetFormDispatch,
    setErrorMessageDispatch,
    setValidDispatch,
    setGenderDispatch,
    registerDispatch,
    loginDispatch,
  } = useAuth();

  const { check, user } = useCheck();

  useEffect(() => {
    if (mode === 'login') {
      if (form.email.length && form.password.length) setValidDispatch(true);
      else setValidDispatch(false);
    } else if (mode === 'register') {
      let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (form.email.length && (emailRegex.test(form.email) === false || form.email.length > 50)) {
        setValidDispatch(false);
        setErrorMessageDispatch('유효한 이메일 형식이 아닙니다');
        return;
      }
      if (form.name.length && (form.name.length < 2 || form.name.length > 10)) {
        setValidDispatch(false);
        setErrorMessageDispatch('닉네임은 2글자 이상, 10글자 이하로 이루어져야 합니다');
        return;
      }
      if (form.password.length && form.password.length > 20) {
        setValidDispatch(false);
        setErrorMessageDispatch('비밀번호는 20글자 이하로 이루어져야 합니다');
        return;
      }
      if (form.password.length && form.passwordConfirm.length && form.password !== form.passwordConfirm) {
        setValidDispatch(false);
        setErrorMessageDispatch('비밀번호와 비밀번호 확인이 일치하지 않습니다');
        return;
      }
      if (!form.email.length || !form.name.length || !form.password.length || !form.passwordConfirm.length || form.gender === '') {
        setValidDispatch(false);
        setErrorMessageDispatch('');
        return;
      }
      setValidDispatch(true);
      setErrorMessageDispatch('');
    }
  }, [form, mode, setValidDispatch, setErrorMessageDispatch]);

  useEffect(() => {
    return () => {
      resetFormDispatch();
    };
  }, [resetFormDispatch]);

  useEffect(() => {
    if (success) {
      check();
    }
  }, [success, check]);

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

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(loading);
      if (!valid) return;
      if (loading) return;
      console.log('if 통과');
      if (mode === 'login') {
        loginDispatch({ email: form.email, password: form.password });
      } else if (mode === 'register') {
        registerDispatch({
          email: form.email,
          gender: form.gender,
          name: form.name,
          password: form.password,
        });
      }
    },
    [mode, valid, loginDispatch, registerDispatch, form, loading],
  );

  return (
    <Container color="white">
      <Header category="modal" headerColor="white" />
      <Title title={`${mode === 'login' ? '로그인' : '회원가입'} - 푸딩`} />
      <AuthPageBlock>
        <Logo>
          <h1>뭐 먹을지 고민될 땐?</h1>
          <img src={LogoImage} alt="logo" />
        </Logo>
        <AuthContainer onSubmit={onSubmit}>
          <AuthSelectBlock>
            <button type="button" className={cx({ select: mode === 'login' })} onClick={() => setModeDispatch('login')}>
              로그인
            </button>
            <button type="button" className={cx({ select: mode === 'register' })} onClick={() => setModeDispatch('register')}>
              회원가입
            </button>
          </AuthSelectBlock>
          <InputBlock>
            <StyledInput name="email" type="email" placeholder="이메일" onChange={changeInputDispatch} value={form.email} icon={<AiOutlineUser />} />
            {mode === 'register' && (
              <StyledInput name="name" type="text" placeholder="닉네임" onChange={changeInputDispatch} value={form.name} icon={<AiOutlineIdcard />} />
            )}
            <StyledInput name="password" type="password" placeholder="비밀번호" onChange={changeInputDispatch} value={form.password} icon={<AiOutlineLock />} />
            {mode === 'login' ? (
              <FooterText>비밀번호 찾기</FooterText>
            ) : (
              <>
                <StyledInput
                  name="passwordConfirm"
                  type="password"
                  placeholder="비밀번호 확인"
                  onChange={changeInputDispatch}
                  value={form.passwordConfirm}
                  icon={<AiOutlineLock />}
                />
                <GenderWrapper>
                  <img src={gender} alt="gender 이미지" />
                  <button type="button" className={cx({ selected: form.gender === 'm' })} onClick={() => setGenderDispatch('m')}>
                    남자
                  </button>
                  <button type="button" className={cx({ selected: form.gender === 'f' })} onClick={() => setGenderDispatch('f')}>
                    여자
                  </button>
                </GenderWrapper>
              </>
            )}
          </InputBlock>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          {mode === 'login' && (
            <>
              <Button theme="red" fullWidth middle disabled={!valid}>
                {loading ? '로딩중' : '로그인'}
              </Button>
              <KakaoLogin
                onClick={() => {
                  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${redirectionURL}&response_type=code`;
                }}
              >
                <img src={kakaotalk} alt="카카오 로고" />
                <span>카카오톡 계정으로 로그인</span>
              </KakaoLogin>
            </>
          )}
          {mode === 'register' && (
            <Button theme="red" fullWidth middle disabled={!valid}>
              {loading ? '로딩중' : '회원가입'}
            </Button>
          )}
        </AuthContainer>
      </AuthPageBlock>
    </Container>
  );
}

export default withRouter(LoginPage);
