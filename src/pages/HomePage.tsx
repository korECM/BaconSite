import React from 'react';
import Container from '../components/layout/Container';
import Header from '../components/layout/Header';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import RoundContainer from '../components/common/RoundContainer';
import { RouteComponentProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../styles/palette';
import FullHeightFade from '../components/common/FullHeightFade';
import firstbutton from './firstbutton.jpg';
import secondbutton from './secondbutton.jpg';
import thirdbutton from './thirdbutton.jpg';
import titlelogo from 'assets/fooding_titlelogo.png';

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
  width = full;
  height = 100px;
  background-color: ${palette.mainRed};
  
  justify-content: center;
  align-items: center;
  
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 50px;

  input {
    border-radius: 10px;
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
    width: 70px;
    height: 50px;
    margin-left: 10px;
    background-color: ${palette.mainRed};
    color: ${palette.white};
    font-size: 13px;
    font-weight: 900;
    font-family: 'Nanum Gothic';

    -webkit-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
    box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
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
  option: string;
  style: { backgroundColor: string; textColor: string };
  font: string;
}

interface State {
  input: string;
  RouletteItems: RouletteItemState[];
}

let beClicked = false;
let selected_name = 'false';

class HomePage extends React.Component<Props, State> {
  nextRouletteId: number = 0;

  state: State = {
    input: '',
    RouletteItems: [],
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { RouletteItems, input } = this.state;
    const newItem: RouletteItemState = { id: this.nextRouletteId++, text: input, done: false };
    const nextRouletteItems: RouletteItemState[] = RouletteItems.concat(newItem);
    if (input !== '' && RouletteItems.length < 6) {
      this.setState({
        input: '',
        RouletteItems: nextRouletteItems,
      });
    }
    console.log('push add button');
  };

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({
      input: value,
    });
  };

  render() {
    const { onSubmit, onChange } = this;
    const { input, RouletteItems } = this.state;

    let data: DataInterface[] = Array.from({ length: Math.min(RouletteItems.length, 6) }, (v) => ({
      option: 'dd',
      style: { backgroundColor: 'dd', textColor: 'dd' },
      font: 'dd',
    }));

    if (RouletteItems.length >= 1) {
      // let data = RouletteItems.map((v) => {
      //     console.log(RouletteItems[v].text);
      //     return RouletteItems;
      // });

      // console.log(RouletteItems.id.text);
      for (var i = 0; i < RouletteItems.length; i++) {
        data[i].option = RouletteItems[i].text;
        if (i % 2 == 0) {
          data[i].style.backgroundColor = '#dddddd';
          data[i].style.textColor = '#5d5d5d';
          data[i].font = 'Nanum Gothic';
        } else {
          data[i].style.backgroundColor = 'white';
          data[i].style.textColor = '#5d5d5d';
          data[i].font = 'Nanum Gothic';
        }
      }
      console.log(data);
    }

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
            <Link to="/shop/5f26b992555be6865ede4e28">
              <TextBox>테스트</TextBox>
              <TextBox>가게</TextBox>
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
        <Divider></Divider>
        <ButtonLine>
          <ButtonBlock>
            <Link to="/rouletteList">
              <TextBox>돌림판</TextBox>
              <TextBox>리스트 받기</TextBox>
            </Link>
          </ButtonBlock>
          <ButtonBlock>
            <Link to="/result?location=front,back&category=western,korean">
              <TextBox>필터링</TextBox>
              <TextBox>결과</TextBox>
            </Link>
          </ButtonBlock>
          <ButtonBlock>
            <Link to="/filter">
              <TextBox>필터링</TextBox>
              <TextBox>검색</TextBox>
            </Link>
          </ButtonBlock>
        </ButtonLine>
        <RoundContainer theme="image" imageLink={firstbutton}>
          중앙대 정문 맛집 5곳
        </RoundContainer>
        <RoundContainer theme="image" imageLink={secondbutton}>
          <a href="https://blog.naver.com/crystalnam03/222068892248">인스타 감성 저격 카페 5곳</a>
        </RoundContainer>
        <RoundContainer theme="image" imageLink={thirdbutton}>
          상도동 신상 맛집 10곳
        </RoundContainer>
        <SearchBox>
          <form onSubmit={onSubmit}>
            <ButtonContainer>
              <input onChange={onChange} value={input} />
              <button type="submit">search</button>
            </ButtonContainer>
          </form>
        </SearchBox>
      </Container>
    );
  }
}

export default HomePage;
