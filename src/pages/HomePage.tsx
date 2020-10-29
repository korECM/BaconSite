import React, { useCallback, useEffect, useState } from 'react';
import Container from '../components/layout/Container';
import Header from '../components/layout/Header';
import { Link, withRouter } from 'react-router-dom';
import RoundContainer from '../components/common/RoundContainer';
import { RouteComponentProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../styles/palette';
import search from 'assets/search.png';
import titlelogo from 'assets/fooding_logo_outline.svg';
import './TagButton.css';
import useMainPost from 'hooks/useMain';
import axios from 'axios';
import { apiLink } from 'lib/getAPILink';
import debounce from 'lodash/debounce';

const TitleSlogan = styled.h1`
  font-size: 14px;
  font-family: 'Nanum Gothic';
  font-weight: 700;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  color: black;
`;

const TitleLogo = styled.div`
  display: flex;

  justify-content: center;

  img {
    padding: 0 10%;
    height: 64px;
    width: 284px;
  }
`;

const Categories = styled.h1`
  font-size: 15px;
  font-family: 'Nanum Gothic';
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 0px;
  color: black;
`;

const ButtonLine = styled.h1`
  display: 100%;
  margin-left: 0%;
  margin-right: 0%;
  font-family: 'Nanum Gothic';
  font-weight: 200;
  color: white;
  padding-bottom: 0px;

  vertical-align: center;
`;

const ButtonBlock = styled.button`
  outline: none;
  border: none;

  border-radius: 10px;

  width: 27%;
  height: 90px;

  margin-bottom: 0%;
  margin-top: 0%;
  margin-left: 3%;
  margin-right: 3%;

  background-color: ${palette.mainRed};
  color: ${palette.white};

  font-size: 10px;
  font-family: 'Nanum Gothic';
  font-weight: 200;

  -webkit-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
  box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
`;

const TextBox = styled.h1`
  font-size: 10px;
  font-family: 'Nanum Gothic';
  font-weight: 200;
  color: white;
  padding-bottom: 3px;
`;

const BottomTextBox = styled.span`
  font-size: 13px;
  font-family: 'Nanum Gothic';
  font-weight: 200;
  color: white;
  padding-left: 5px;
  width: 50%;
  margin-right: 20%;
`;

const Divider = styled.div`
  border-bottom: 0px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 60px;
`;

const SearchBox = styled.div`
  background-color: ${palette.white};
  width: full;
  border-radius: 50px;

  justify-content: center;
  align-items: center;

  border-color: ${palette.mainRed};
  border-style: solid;
  border-width: 2px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SearchBoxContainer = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  margin-top: -50px;

  background-color: ${palette.mainRed};
  height: 80px;

  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 40px;

  input {
    border-radius: 50px;
    border: none;

    outline: none;
    padding-left: 10px;
    width: 75%;

    flex: 1;

    font-size: 15px;
    font-weight: 800;
    font-family: 'Nanum Gothic';
    color: black;

    -webkit-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
    box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
  }

  li {
    border-radius: 10px;
    border: none;
    outline: none;
    padding-left: 30px;

    width: 100%;

    font-size: 15px;
    font-weight: 900;
    font-family: 'Nanum Gothic';
    color: black;

    -webkit-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
    box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
  }

  button {
    border-radius: 10px;
    border: none;
    outline: none;
    width: 25px;
    height: 25px;
    margin-left: 10px;
    background: url(${search});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 60%;
    background-blend-mode: multiply;
    justify-content: center;
    align-items: center;
    vertical-align: center;
    margin-top: 8px;
    margin-left: 3%;

    color: ${palette.white};
  }
  button:nth-child(1) {
    padding-left: 0;
  }

  button:nth-child(2) {
  }
`;

const AddText = styled.div`
  font-size: 13px;
  font-family: 'Nanum Gothic';
  font-weight: 200;
  color: white;
  @media only screen and (min-width: 320px) {
    margin-right: 50px;
  }

  @media only screen and (min-width: 350px) {
    margin-right: 100px;
  }
  @media only screen and (min-width: 500px) {
    margin-right: 30px;
  }
`;

function HomePage({ history }: RouteComponentProps) {
  const [input, setInput] = useState('');

  const { getMainPost, posts } = useMainPost();

  useEffect(() => {
    getMainPost();
  }, [getMainPost]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input !== '' && input.length < 10) {
      //10글자로 제한
      setInput('');
    }
  };

  const debounceSearch = useCallback(
    debounce(async (keyword: string) => {
      if (keyword.length === 0) {
      } else {
        try {
          const response = await axios.get<string[]>(apiLink() + `/shop/search/${keyword}`, {
            withCredentials: true,
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }, 300),
    [],
  );

  const onChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInput(value);
    debounceSearch(value);
  };

  const moveHref = (input: string) => {
    if (input.length > 0) {
      history.push({
        pathname: '/result',
        search: 'name=' + input + '&search=true',
      });
    }
  };

  return (
    <>
      <Container color="white">
        <Header category="main" headerColor="none" withOutHeaderIcon />
        <TitleSlogan>뭐 먹을지 고민될 땐?</TitleSlogan>
        <TitleLogo>
          <img src={titlelogo} alt="titlelogo" />
        </TitleLogo>
        <Divider></Divider>
        <ButtonLine>
          <ButtonBlock>
            <Link to="/filter">
              <TextBox>필터링</TextBox>
              <TextBox>검색</TextBox>
            </Link>
          </ButtonBlock>
          <ButtonBlock>
            <Link to="/yesno">
              <TextBox>선택장애</TextBox>
              <TextBox>Yes or No</TextBox>
            </Link>
          </ButtonBlock>
          <ButtonBlock>
            <Link to="/rouletteList">
              <TextBox>돌려돌려</TextBox>
              <TextBox>돌림판</TextBox>
            </Link>
          </ButtonBlock>
        </ButtonLine>
        <SearchBox>
          <form onSubmit={onSubmit}>
            <ButtonContainer>
              <button type="submit" onClick={() => moveHref(input)}></button>
              <input placeholder="식당 or 메뉴를 검색하세요!" onChange={onChange} value={input} />
            </ButtonContainer>
          </form>
        </SearchBox>
        {posts.data &&
          posts.data.map((post) => (
            <a href={post.link} key={post.image}>
              <RoundContainer theme="image" imageLink={post.image} key={`${post.registerDate}`}>
                <span>{post.title}</span>
              </RoundContainer>
            </a>
          ))}
      </Container>
      <SearchBoxContainer>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <AddText>
            <span>찾는 식당이 안보이세요?</span>
          </AddText>
          <button className="roundButton yHover " style={{ height: '35px', width: '100px' }}>
            <a href="https://forms.gle/G2AGwkTyaXeN7C1T6">식당등록하기</a>
          </button>
        </div>
      </SearchBoxContainer>
    </>
  );
}

export default withRouter(HomePage);
