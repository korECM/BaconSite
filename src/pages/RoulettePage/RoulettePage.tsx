import React, { useEffect, useRef, useCallback } from 'react';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
// import React from 'react';
import { Route, BrowserRouter, RouteComponentProps, useHistory, useLocation } from 'react-router-dom';
import palette from '../../styles/palette';
import { Fade, Bounce } from 'react-awesome-reveal';
import { Animated } from 'react-animated-css';
import { Wheel } from 'react-custom-roulette';
import Button from '../../components/common/Button';
import { Helmet } from 'react-helmet-async';
import { RouteProps, withRouter } from 'react-router';
import FullHeightFade from '../../components/common/FullHeightFade';
import { MdLiveTv } from 'react-icons/md';

// import Roulette from 'react-native-casino-roulette';

// const Roulette = require('react-native-casino-roulette');
// //Roulette numbers
// const numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
// const options = numbers.map((o) => ({ index: o }));

// let data = [
//   { option: '맥도날드', style: { backgroundColor: '#dddddd', textColor: '#5d5d5d' }, font: 'Nanum Gothic' },
//   { option: '더마니', style: { backgroundColor: 'white', textColor: '#5d5d5d' }, font: 'Nanum Gothic' },
// ];

const ResultComment = styled.h1`
  font-family: 'Nanum Gothic';
  font-size: 17px;
  font-weight: 900;
  text-align: center;
  margin-top: 7px;
  margin-bottom: 0px;
  color: white;
  padding: 5px;
`;

const EmptySpace = styled.h1`
  text-align: center;
  margin-top: 7px;
  margin-bottom: 0px;
  color: white;
  padding: 25px;
`;

let beClicked = false;
let selected_name = 'false';

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

interface DetailPageProps extends RouteComponentProps {}

// const history = useHistory();
// const location = useLocation();

class RoulettePage extends React.Component<Props, State> {
  moveHref = () => {
    beClicked = true;
    selected_name = 'true';
  };

  render() {
    const { moveHref } = this;

    let items = this.props.location.search
      .split('=')[1]
      .split(',')
      .map((item) => decodeURIComponent(item));
    console.log(items);

    let data: DataInterface[] = Array.from({ length: Math.min(items.length, 6) }, (v) => ({
      option: 'dd',
      style: { backgroundColor: 'dd', textColor: 'dd' },
      font: 'dd',
    }));

    if (items.length >= 1) {
      // let data = RouletteItems.map((v) => {
      //     console.log(RouletteItems[v].text);
      //     return RouletteItems;
      // });

      // console.log(RouletteItems.id.text);
      if (items.length % 2 == 0) {
        for (var i = 0; i < items.length; i++) {
          data[i].option = items[i];
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
      } else {
        for (var i = 0; i < items.length; i++) {
          data[i].option = items[i];
          if (i % 3 == 0) {
            data[i].style.backgroundColor = '#dddddd';
            data[i].style.textColor = '#5d5d5d';
            data[i].font = 'Nanum Gothic';
          } else if (i % 3 == 1) {
            data[i].style.backgroundColor = `${palette.lightGray}`;
            data[i].style.textColor = '#5d5d5d';
            data[i].font = 'Nanum Gothic';
          } else {
            data[i].style.backgroundColor = 'white';
            data[i].style.textColor = '#5d5d5d';
            data[i].font = 'Nanum Gothic';
          }
        }
      }

      console.log(data);
    }

    return (
      <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true} style={{ height: '100%' }}>
        <FullHeightFade>
          <Container color="red">
            <Helmet>
              <title>돌려돌려 돌림판 - 푸딩</title>
            </Helmet>
            <Header category="modal" headerColor="red" />
            <Fade>
              <Bounce>
                <EmptySpace></EmptySpace>
                <ResultComment>START 버튼을 눌러</ResultComment>
                <ResultComment>룰렛을 돌리세요!</ResultComment>
                <EmptySpace></EmptySpace>
                <Wheel
                  mustStartSpinning={!beClicked}
                  prizeNumber={1}
                  data={data}
                  backgroundColors={['#ffffff']}
                  textColors={['#000000']}
                  outerBorderWidth={3}
                  innerBorderWidth={0}
                  radiusLineWidth={0}
                  fontSize={25}
                  onStopSpinning={() => null}
                />
                <Button theme="white" big onClick={moveHref}>
                  start
                </Button>
              </Bounce>
            </Fade>
          </Container>
        </FullHeightFade>
      </Animated>
    );
  }
}

export default withRouter(RoulettePage);

{
  /* <canvas width={50} height={50} color={'black'} background-color={'black'}>
start누르세요
</canvas> */
}
