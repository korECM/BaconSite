import React from 'react';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import palette from '../../styles/palette';
import { Wheel, WheelDataType } from 'react-custom-roulette';
import Button from '../../components/common/Button';
import { withRouter } from 'react-router';
import Title from 'lib/meta';
import FullHeightFade from '../../components/common/FullHeightFade';

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

const RouletteContainer = styled.h1`
  width: 100%;
  justify-content: center;
  align-items: center;
  vertical-align: center;
  padding-left: 3%;
  padding-top: 3%;
`;

let beClicked = false;
let selected_name = 'false';

interface Props extends RouteComponentProps {}

interface RouletteItemState {
  id: number;
  text: string;
  done: boolean;
}

interface State {
  input: string;
  RouletteItems: RouletteItemState[];
}

interface DetailPageProps extends RouteComponentProps {}

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

    let data: WheelDataType[] = Array.from({ length: Math.min(items.length, 6) }, (v) => ({
      option: 'dd',
      style: { backgroundColor: 'dd', textColor: 'dd' },
      font: 'dd',
    }));

    function textLengthCheck(str: string, len: number) {
      let returnValue = '';

      if (str.length > len) {
        returnValue = str.substring(0, len);
      } else {
        returnValue = str;
      }

      return returnValue;
    }

    if (items.length >= 1) {
      if (items.length % 2 === 0) {
        for (let i = 0; i < items.length; i++) {
          data[i].option = textLengthCheck(items[i], 6);
          if (i % 2 === 0) {
            data[i].style = {
              backgroundColor: '#dddddd',
              textColor: '#5d5d5d',
            };
          } else {
            data[i].style = {
              backgroundColor: 'white',
              textColor: '#5d5d5d',
            };
          }
        }
      } else {
        for (let i = 0; i < items.length; i++) {
          data[i].option = textLengthCheck(items[i], 6);
          if (i % 3 === 0) {
            data[i].style = {
              backgroundColor: '#dddddd',
              textColor: '#5d5d5d',
            };
          } else if (i % 3 === 1) {
            data[i].style = {
              backgroundColor: `${palette.darkGray}`,
              textColor: 'white',
            };
          } else {
            data[i].style = {
              backgroundColor: 'white',
              textColor: '#5d5d5d',
            };
          }
        }
      }
    }

    return (
      <FullHeightFade>
        <Container color="red">
          <Title title="돌려돌려 돌림판 - 푸딩" />
          <EmptySpace></EmptySpace>
          <ResultComment>START 버튼을 눌러</ResultComment>
          <ResultComment>룰렛을 돌리세요!</ResultComment>
          <EmptySpace></EmptySpace>
          <FullHeightFade>
            <RouletteContainer>
              <Wheel
                mustStartSpinning={beClicked}
                prizeNumber={1}
                data={data}
                backgroundColors={['#ffffff']}
                textColors={['#000000']}
                outerBorderWidth={3}
                innerBorderWidth={0}
                radiusLineWidth={0}
                fontSize={23}
                onStopSpinning={() => null}
              />
            </RouletteContainer>
          </FullHeightFade>
          <Button theme="white" big onClick={moveHref}>
            start
          </Button>
        </Container>
      </FullHeightFade>
    );
  }
}

export default withRouter(RoulettePage);

{
  /* <canvas width={50} height={50} color={'black'} background-color={'black'}>
start누르세요
</canvas> */
}
