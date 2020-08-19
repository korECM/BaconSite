import React, { useEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { RouteComponentProps } from 'react-router-dom';
import useKakao from '../../hooks/useKakao';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import palette from '../../styles/palette';
import useCheck from '../../hooks/useCheck';
import Loader from '../../components/common/Loader';
import StyledInput from '../../components/common/StyledInput';
import { AiOutlineIdcard } from 'react-icons/ai';
import gender from './gender.png';
import Button from '../../components/common/Button';

const KakaoPageBlock = styled.div``;

const InputBlock = styled.div`
  padding: 0 5%;

  text-align: center;
`;

const Title = styled.div`
  color: ${palette.mainRed};
  font-size: 25px;
  margin: 50px 0;
`;

const GenderWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-top: 15px;

  margin-bottom: 50px;

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

const ErrorMessage = styled.div`
  color: ${palette.mainRed};
  text-align: center;
  font-size: 12.5px;
  height: 16px;
  font-weight: lighter;
  margin-bottom: 20px;
`;

function KakaoPage({ location, history }: RouteComponentProps) {
  const code = location.search
    .split('?')
    .filter((data) => data)
    .map((data) => data.split('=')[1])[0];

  const {
    kakao,
    name,
    kakaoName,
    gender: genderInput,
    valid,
    onKakaoInit,
    onChangeInput,
    onKakaoRequestWithName,
    setGenderDispatch,
    setValidDispatch,
    setErrorMessageDispatch,
  } = useKakao(code);

  const { check, user } = useCheck();

  const onButtonClick = (id: string) => {
    onKakaoRequestWithName(id);
  };

  useEffect(() => {
    onKakaoInit();
  }, [onKakaoInit]);

  useEffect(() => {
    if (kakaoName.data) {
      check();
    }
  }, [kakaoName, check]);

  useEffect(() => {
    if (kakao.data) {
      check();
    }
  }, [kakao, check]);

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

  useEffect(() => {
    if (name.length === 0) {
      setValidDispatch(false);
      return;
    }
    if (name.length < 2 || name.length > 10) {
      setValidDispatch(false);
      setErrorMessageDispatch('닉네임은 2글자 이상, 10글자 이하로 이루어져야 합니다');
      return;
    }
    if (genderInput === '') {
      setValidDispatch(false);
      setErrorMessageDispatch('');
      return;
    }
    setValidDispatch(true);
    setErrorMessageDispatch('');
  }, [name, setValidDispatch, setErrorMessageDispatch, genderInput]);

  if (kakao.loading) {
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
        <InputBlock>
          <Title>카카오 로그인</Title>
          <StyledInput name="name" type="text" onChange={onChangeInput} placeholder="닉네임" value={name} icon={<AiOutlineIdcard />} />
          <GenderWrapper>
            <img src={gender} alt="gender 이미지" />
            <button type="button" className={cx({ selected: genderInput === 'm' })} onClick={() => setGenderDispatch('m')}>
              남자
            </button>
            <button type="button" className={cx({ selected: genderInput === 'f' })} onClick={() => setGenderDispatch('f')}>
              여자
            </button>
          </GenderWrapper>
          <ErrorMessage>{kakaoName.error}</ErrorMessage>
          <Button theme="red" middle fullWidth onClick={() => onButtonClick(kakao.data!.id)} disabled={!valid}>
            {kakaoName.loading ? '로딩 중' : '가입 완료'}
          </Button>
        </InputBlock>
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
