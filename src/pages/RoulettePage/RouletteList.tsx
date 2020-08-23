import React from 'react';
import RouletteItem from './RouletteItem';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import { withRouter, RouteComponentProps, Route, Link } from 'react-router-dom';
import palette from '../../styles/palette';
import { Fade, Bounce } from 'react-awesome-reveal';
import { Animated } from 'react-animated-css';
import styled, { css } from 'styled-components';
import Button from '../../components/common/Button';

const ResultComment = styled.h1`
  font-family: 'Nanum Gothic';
  font-size: 17px;
  font-weight: 900;
  text-align: center;
  margin-top: 7px;
  margin-bottom: 0px;
  color: ${palette.mainRed};
  padding: 5px;
`;

const EmptySpace = styled.h1`
  text-align: center;
  margin-top: 7px;
  margin-bottom: 0px;
  color: white;
  padding: 25px;
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 100%;

  input {
    border-radius: 10px;
    border: none;
    outline: none;
    padding-left: 10px;

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

const Divider = styled.div`
  border-bottom: 0px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 30px;
`;

const ErrorMessage = styled.div`
  color: ${palette.mainRed};
  text-align: center;
  font-size: 12.5px;
  height: 16px;
  font-weight: lighter;
  margin-bottom: 20px;
`;

interface Props {}

interface RouletteItemState {
  id: number;
  text: string;
  done: boolean;
}

interface State {
  input: string;
  RouletteItems: RouletteItemState[];
}

let beClicked = false;
let selected_name = 'false';

class RouletteList extends React.Component<Props, State> {
  nextRouletteId: number = 0;

  state: State = {
    input: '',
    RouletteItems: [],
  };

  onToggle = (id: number): void => {
    const { RouletteItems } = this.state;
    const nextRouletteItems: RouletteItemState[] = RouletteItems.map((item) => {
      if (item.id === id) {
        item.done = !item.done;
      }
      return item;
    });

    this.setState({
      RouletteItems: nextRouletteItems,
    });
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { RouletteItems, input } = this.state;
    const newItem: RouletteItemState = { id: this.nextRouletteId++, text: input, done: false };
    const nextRouletteItems: RouletteItemState[] = RouletteItems.concat(newItem);
    this.setState({
      input: '',
      RouletteItems: nextRouletteItems,
    });
  };

  onRemove = (id: number): void => {
    const { RouletteItems } = this.state;
    const nextRouletteItems: RouletteItemState[] = RouletteItems.filter((item) => item.id !== id);
    this.setState({
      RouletteItems: nextRouletteItems,
    });
  };

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({
      input: value,
    });
  };

  moveHref = () => {
    beClicked = true;
    selected_name = 'true';
  };

  render() {
    const { onSubmit, onChange, onToggle, onRemove, moveHref } = this;
    const { input, RouletteItems } = this.state;

    const RouletteItemList: React.ReactElement[] = RouletteItems.map((Roulette) => (
      <RouletteItem key={Roulette.id} done={Roulette.done} onToggle={() => onToggle(Roulette.id)} onRemove={() => onRemove(Roulette.id)} text={Roulette.text} />
    ));

    // interface datum { option: String, style: { backgroundColor: String, textColor: String }, font: String };
    let data = [{ option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' }];

    if (RouletteItems.length == 2) {
      data = [
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
      ];
    } else if (RouletteItems.length == 3) {
      data = [
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
      ];
    } else if (RouletteItems.length == 4) {
      data = [
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
      ];
    } else if (RouletteItems.length == 5) {
      data = [
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
      ];
    } else if (RouletteItems.length >= 6) {
      data = [
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
        { option: 'dd', style: { backgroundColor: 'dd', textColor: 'dd' }, font: 'dd' },
      ];
    }

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

    // alert(JSON.stringify(RouletteItemList.text));

    return (
      <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
        <Fade>
          <Container color="white">
            <Header category="modal" headerColor="red" />
            <Fade>
              <Bounce>
                <EmptySpace></EmptySpace>
                <div>
                  <ResultComment>어떤 걸 먹을까?</ResultComment>
                  <ResultComment>옵션 내용을 설정해주세요!</ResultComment>
                  <EmptySpace></EmptySpace>

                  <form onSubmit={onSubmit}>
                    <ButtonContainer>
                      <input onChange={onChange} value={input} />
                      <button type="submit">ADD</button>
                    </ButtonContainer>
                  </form>
                  <Divider></Divider>
                  <ul>{RouletteItemList}</ul>
                </div>
                <Link
                  to={{
                    pathname: '/roulette',
                    state: {
                      datalist: data,
                    },
                  }}
                >
                  <Button theme="red" onClick={moveHref}>
                    룰렛 돌리기
                  </Button>
                </Link>
              </Bounce>
            </Fade>
          </Container>
        </Fade>
      </Animated>
    );
  }
}

export default RouletteList;
