import React from 'react';
import RouletteItem from './RouletteItem';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import { withRouter, RouteComponentProps, Route, Link } from 'react-router-dom';
import palette from '../../styles/palette';
import styled, { css } from 'styled-components';
import Button from '../../components/common/Button';
import useShops from '../../hooks/useShops';

const ResultComment = styled.h1`
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

const WarningComment = styled.h1`
  text-align: right;
  margin-top: 3px;
  margin-bottom: 0px;
  color: ${palette.darkGray};
  padding: 10px;
  font-size: 13px;
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 100%;

  input {
    border-radius: 10px;
    border: none;
    outline: none;
    padding-left: 10px;
    width: 75%;

    flex: 1;

    font-size: 15px;
    font-weight: 800;
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
    color: black;
    -webkit-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
    box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
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
    -webkit-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
    box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
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

const SearchBoxContainer = styled.div`
  // margin-right: 30%;
  margin-left: auto;

  // flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  vertical-align: flex-end;
`;

const randomchar = ['r', 'a', 'n', 'd', 'o', 'm'];

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

  // TODO: 공백일 때 입력 안되도록 해야합니당 -> (O)
  // TODO: 6개 넘으면 크래시나요 -> (O)
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

  moveHref = (data: DataInterface[]) => {

    beClicked = true;
    selected_name = 'true';
    const { RouletteItems, input } = this.state;
    const newItem: RouletteItemState = { id: this.nextRouletteId++, text: input, done: false };
    const nextRouletteItems: RouletteItemState[] = RouletteItems.concat(newItem);
    if (RouletteItems.length < 2) {
      console.log('2개 이상 입력하셔야 합니다.');
      if(RouletteItems.length === 0) {
        console.log('완전랜덤');
        this.props.history.push({
          pathname: '/roulette',
          search: '?items=' + 'r,a,n,d,o,m',
        });
      }
    } else {
      this.props.history.push({
        pathname: '/roulette',
        search: '?items=' + data.map((data) => data.option).join(','),
      });
    }
    // setTimeout(() => {
    window.location.reload(false);
    console.log('refresh done');
    // }, 100);
  };

  render() {
    const { onSubmit, onChange, onToggle, onRemove, moveHref } = this;
    const { input, RouletteItems } = this.state;

    const RouletteItemList: React.ReactElement[] = RouletteItems.map((Roulette) => (
      <RouletteItem key={Roulette.id} done={Roulette.done} onToggle={() => onToggle(Roulette.id)} onRemove={() => onRemove(Roulette.id)} text={Roulette.text} />
    ));

    // interface datum { option: String, style: { backgroundColor: String, textColor: String }, font: String };

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

    if (beClicked === true && RouletteItems.length == 0) {
      for (var i = 0; i < 6; i++) {
        data[i].option = randomchar[i];
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
    }

    // alert(JSON.stringify(RouletteItemList.text));

    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
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
            <WarningComment>※ 2 ~ 6개의 값을 입력해주세요.</WarningComment>
          </form>
          <Divider></Divider>
          <ul>{RouletteItemList}</ul>
        </div>
        <Button theme="red" onClick={() => moveHref(data)}>
          Start!
        </Button>
      </Container>
    );
  }
}

export default withRouter(RouletteList);
