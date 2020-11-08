import React from 'react';
import Container from '../../components/layout/Container';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import palette from '../../styles/palette';
import Button from '../../components/common/Button';
import { withRouter } from 'react-router';
import Title from 'lib/meta';
import { Wheel } from 'components/common/Wheel/Wheel';
import { WheelData } from 'components/common/Wheel/types';
import Header from 'components/layout/Header';

type WheelDataType = WheelData;

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

const EmptySpace = styled.div`
  text-align: center;
  margin-top: 7px;
  margin-bottom: 0px;
  color: white;
  padding: 25px;
`;

const RouletteContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  vertical-align: center;
`;

interface Props extends RouteComponentProps {}

interface State {
  // input: string;
  // RouletteItems: RouletteItemState[];
  beClicked: boolean;
  available: boolean;
  prize: number;
}

interface DetailPageProps extends RouteComponentProps {}

class RoulettePage extends React.Component<Props, State> {
  state: State = {
    beClicked: false,
    available: true,
    prize: 0,
  };

  setSpin = (bool: boolean) => {
    console.log(bool);
    this.setState({
      beClicked: bool,
    });
  };

  render() {
    const { setSpin } = this;

    let items: string[] = [];

    if (this.props.location.search.split('=').length <= 1) {
      this.props.history.push('/rouletteList');
    } else {
      items = this.props.location.search
        .split('=')[1]
        .split(',')
        .map((item) => decodeURIComponent(item));
    }

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

    const spinStartFunction = () => {
      this.setState({
        prize: Math.floor(Math.random() * data.length),
      });
      setSpin(true);
      this.setState({
        available: false,
      });
      setTimeout(() => {
        setSpin(false);
      }, 1000);
    };

    const spinEndFunction = () => {
      this.setState({
        prize: Math.floor(Math.random() * data.length),
      });
      setSpin(false);
      this.setState({
        available: false,
      });
      setTimeout(() => {
        setSpin(true);
        setSpin(false);
      }, 0);
    };

    return (
      <Container color="red">
        <Title title="돌려돌려 돌림판 - 푸딩" />
        <Header category="modal" headerColor="red" />
        <EmptySpace></EmptySpace>
        <ResultComment>START 버튼을 눌러</ResultComment>
        <ResultComment>룰렛을 돌리세요!</ResultComment>
        <EmptySpace></EmptySpace>
        <RouletteContainer>
          {
            <Wheel
              mustStartSpinning={this.state.beClicked}
              prizeNumber={this.state.prize}
              data={data}
              backgroundColors={['#ffffff']}
              textColors={['#000000']}
              outerBorderWidth={3}
              innerBorderWidth={0}
              radiusLineWidth={0}
              fontSize={23}
              onStopSpinning={() => {
                // useEffect Error 피하기위한 꼼수
                console.log('stop');
                setTimeout(() => {
                  this.setState({
                    available: true,
                  });
                }, 0);
              }}
            />
          }
        </RouletteContainer>
        <Button theme="white" big onClick={spinStartFunction} disabled={!this.state.available}>
          start
        </Button>
      </Container>
    );
  }
}

export default withRouter(RoulettePage);
