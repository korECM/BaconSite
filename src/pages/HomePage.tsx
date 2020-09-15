import React from 'react';
import Container from '../components/layout/Container';
import Header from '../components/layout/Header';
import { Link } from 'react-router-dom';
import RoundContainer from '../components/common/RoundContainer';
import { RouteComponentProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../styles/palette';
import firstbutton from './firstbutton.jpg';
import secondbutton from './secondbutton.jpg';
import thirdbutton from './thirdbutton.jpg';
import search from './search.png';
import titlelogo from 'assets/fooding_logo_outline.svg';

const TitleSlogan = styled.h1`
  font-size: 14px;
  font-family: 'Nanum Gothic';
  font-weight: 700;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  color: black;
`;

const postbuttonsub = styled.h1`
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
  margin-left: 5%;
  margin-right: 5%;
  font-family: 'Nanum Gothic';
  font-weight: 200;
  color: white;
  padding-bottom: 3px;

  vertical-align: center;
`;

const ButtonBlock = styled.button`
  outline: none;
  border: none;

  border-radius: 10px;

  width: 27%;
  height: 90px;

  margin: 3%;

  background-color: ${palette.mainRed};
  color: ${palette.white};

  font-size: 10px;
  font-family: 'Nanum Gothic';
  font-weight: 200;

  -webkit-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
`;

const TextBox = styled.h1`
  font-size: 10px;
  font-family: 'Nanum Gothic';
  font-weight: 200;
  color: white;
  padding-bottom: 3px;
`;

const Divider = styled.div`
  border-bottom: 0px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 17px;
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
  margin-bottom: 40px;
`;

const SearchBoxContainer = styled.div`
  padding-top: 10%;
  padding-bottom: 10%;
  padding-left: 5%;
  padding-right: 5%;

  background-color: ${palette.mainRed};
  width: full;

  justify-content: center;
  align-items: center;
  vertical-align: center;
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

    -webkit-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
    box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
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

    -webkit-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
    box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
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

interface Props extends RouteComponentProps {}

interface RouletteItemState {
  id: number;
  text: string;
  done: boolean;
}

interface DataInterface {
  name: string;
}

interface State {
  input: string;
}

let beClicked = false;
let selected_name = 'false';

class HomePage extends React.Component<Props, State> {
  state: State = {
    input: '',
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { input } = this.state;
    if (input !== '' && input.length < 10) {
      //10글자로 제한
      this.setState({
        input: '',
      });
    }
    console.log('push search button');
  };

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({
      input: value,
    });
  };

  moveHref = (data: DataInterface) => {
    beClicked = true;
    selected_name = 'true';
    if (data.name !== '') {
      this.props.history.push({
        pathname: '/result',
        search: 'name=' + data.name,
      });
    }
  };

  render() {
    const { onSubmit, onChange, moveHref } = this;
    const { input } = this.state;

    let data: DataInterface = {
      name: input,
    };

    return (
      <Container color="white">
        <Header category="main" headerColor="none" />
        <TitleSlogan>뭐 먹을지 고민될 땐?</TitleSlogan>
        <TitleLogo>
          <img src={titlelogo} alt="titlelogo" />
        </TitleLogo>
        <Categories>Categories</Categories>
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
              <button type="submit" onClick={() => moveHref(data)}></button>
              <input placeholder="search" onChange={onChange} value={input} />
            </ButtonContainer>
          </form>
        </SearchBox>
        <RoundContainer theme="image" imageLink={firstbutton}>
          중앙대 정문 맛집 5곳
        </RoundContainer>
        <RoundContainer theme="image" imageLink={secondbutton}>
          <a href="https://blog.naver.com/crystalnam03/222068892248">인스타 감성 저격 카페 5곳</a>
        </RoundContainer>
        <RoundContainer theme="image" imageLink={thirdbutton}>
          상도동 신상 맛집 10곳
        </RoundContainer>
      </Container>
    );
  }
}

export default HomePage;
