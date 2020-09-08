import React from 'react';
import Container from '../../components/layout/Container';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import palette from '../../styles/palette';
import { Wheel, WheelDataType } from 'react-custom-roulette';
import Button from '../../components/common/Button';
import { withRouter } from 'react-router';
import Title from 'lib/meta';
import { MdClear, MdKeyboardArrowLeft } from 'react-icons/md';
import FoodingTitleWhite from 'assets/FoodingTitleWhite.png';

const HeaderBlock = styled.div`
  width: 100%;
  height: 60px;
`;

const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  align-items: center;

  color: ${palette.white};

  background-color: ${palette.mainRed};

  img {
    width: 50px;
    height: 50px;
  }

  .titleLogo {
    width: 109px;
    height: 31px;
    margin: 0 auto;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    font-size: 2.5rem;
    cursor: pointer;
  }
  .left {
    position: absolute;
    left: 0;
    padding-left: 0;
  }

  .right {
    position: absolute;
    right: 0;
    /* margin-left: auto; */
    padding-right: 0;
  }

  .myPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 27px;
      height: 23px;
    }
    div {
      font-size: 10px;
      margin-top: 5px;
    }
  }

  .title {
    width: 109px;
    height: 31px;
    margin: 0 auto;

    font-size: 20px;
    font-weight: bolder;
    text-align: center;
    color: ${palette.white};
  }
`;

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

interface Props extends RouteComponentProps {}

interface RouletteItemState {
  id: number;
  text: string;
  done: boolean;
}

interface State {
  // input: string;
  // RouletteItems: RouletteItemState[];
  beClicked: boolean;
}

interface DetailPageProps extends RouteComponentProps {}

class RoulettePage extends React.Component<Props, State> {
  state: State = {
    beClicked: false,
  };

  setSpin = (bool: boolean) => {
    console.log(bool);
    this.setState({
      beClicked: bool,
    });
  };

  render() {
    const { setSpin } = this;

    let items = this.props.location.search
      .split('=')[1]
      .split(',')
      .map((item) => decodeURIComponent(item));

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

    const onLeftButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      this.props.history.goBack();
    };

    const onRightButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      this.props.history.push({
        pathname: '/',
      });
      window.location.reload(false);
    };

    const RouletteDraw = (
      <Wheel
        mustStartSpinning={this.state.beClicked}
        prizeNumber={1}
        data={data}
        backgroundColors={['#ffffff']}
        textColors={['#000000']}
        outerBorderWidth={3}
        innerBorderWidth={0}
        radiusLineWidth={0}
        fontSize={23}
        onStopSpinning={() => {}}
      />
    );

    return (
      <Container color="red">
        <Title title="돌려돌려 돌림판 - 푸딩" />
        <HeaderBlock>
          <HeaderContainer>
            <button onClick={onLeftButtonClick} className="left">
              <MdKeyboardArrowLeft />
            </button>
            <img className="titleLogo" src={FoodingTitleWhite} alt="title" />
            <button onClick={onRightButtonClick} className="right">
              <MdClear />
            </button>
          </HeaderContainer>
        </HeaderBlock>
        <EmptySpace></EmptySpace>
        <ResultComment>START 버튼을 눌러</ResultComment>
        <ResultComment>룰렛을 돌리세요!</ResultComment>
        <EmptySpace></EmptySpace>
        <RouletteContainer>{RouletteDraw}</RouletteContainer>
        <Button theme="white" big onClick={() => setSpin(true)}>
          start
        </Button>
      </Container>
    );
  }
}

export default withRouter(RoulettePage);

{
  /* <canvas width={50} height={50} color={'black'} background-color={'black'}>
start누르세요
</canvas> */
}
