// import React, { useEffect, useRef, useCallback } from 'react';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import palette from '../../styles/palette';
import Flag from '../../components/common/Flag';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
// import Button from './button';
import { Fade, Bounce } from 'react-awesome-reveal';
import { Animated } from 'react-animated-css';
import { Link } from 'react-router-dom';
import React from 'react';
import FullHeightFade from '../../components/common/FullHeightFade';
import wondering_cat from './wondering_cat.png';
import YesNoDraw from './YesNoDraw';
import { findAllByTestId } from '@testing-library/react';

const base = [
  {
    id: 1,
    name: '매운 거 좋아',
    img: 'wondering_cat.png',
  },
  {
    id: 2,
    name: '매운 거 싫어',
    img: 'wondering_cat.png',
  },
  {
    id: 3,
    name: 'FLEX 가능!',
    img: 'wondering_cat.png',
  },
  {
    id: 4,
    name: 'FLEX 불가능ㅠ',
    img: 'wondering_cat.png',
  },
  {
    id: 5,
    name: '정문 근처',
    img: 'wondering_cat.png',
  },
  {
    id: 6,
    name: '후문 근처',
    img: 'wondering_cat.png',
  },
  {
    id: 7,
    name: '혼밥',
    img: 'wondering_cat.png',
  },
  {
    id: 8,
    name: '혼밥 아님',
    img: 'wondering_cat.png',
  },
  {
    id: 9,
    name: '친구와 함께',
    img: 'wondering_cat.png',
  },
  {
    id: 10,
    name: '연인과 함께',
    img: 'wondering_cat.png',
  },
];

// dataset array shuffle randomly
console.log(base);

interface ShopImageProps {
  imageLink: string;
}

const ImageContainer = styled.div`
  position: relative;
  vertical-align: middle;

  height: 44vw;
  width: 55vw;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 50px;

  background-color: transparent;
`;

const Image = styled.div`
  position: absolute;
  display: center;
  align: center;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${(props: ShopImageProps) =>
    props.imageLink &&
    css`
      background-image: url(${props.imageLink});
    `}
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${palette.mainRed};
  height: 80px;
`;

const Divider = styled.div`
  border-bottom: 0.1px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 30px;
`;

let beClicked = false;
let selected_name = 'false';
let resultDataSet = [true, true, true, true, true];

const moveHref = () => {
  beClicked = true;
  selected_name = 'true';
};

interface Props extends RouteComponentProps {}

interface DataInterface {
  option: string[];
}

interface State {
  views: {
    id: number;
    name: string;
    img: string;
  }[];
  result: string[];
  round: number;
  sequence: number;
  end: boolean;
}

class YesNoPage extends React.Component<Props, State> {
  state: State = {
    views: [base[0], base[1]],
    result: [],
    round: 10,
    sequence: 0,
    end: false,
  };

  handleReset() {
    this.setState({
      views: [base[0], base[1]],
      result: [],
      round: 10,
      sequence: 0,
      end: false,
    });
  }

  count = 0;

  async handleChange(id: number) {
    this.count++;
    const resultdata = this.state.result.slice();
    // resultdata.push(base.find((item) => item.id === id));
    resultdata.push(base[id - 1].name);
    if (id % 2 == 1) {
      resultDataSet[this.count - 1] = true;
    } else {
      resultDataSet[this.count - 1] = false;
    }

    this.setState((prevState) => ({
      sequence: prevState.sequence + 1, // sequence 1씩 증
      views: [base[2 * this.count], base[2 * this.count + 1]],
    }));

    console.log(resultDataSet);
  }

  render() {
    const { views, end, round, sequence } = this.state;
    const path = './';
    console.log(this.state);
    return (
      <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true} style={{ height: '100%' }}>
        <FullHeightFade>
          <Container color="red">
            <Header category="modal" headerColor="red" />

            <FullHeightFade>
              <Bounce>
                <ImageContainer>
                  <Image imageLink={wondering_cat} />
                </ImageContainer>
              </Bounce>
            </FullHeightFade>
            {views.map((view, index) => {
              return <YesNoDraw key={index} id={view.id} name={view.name} img={view.img} onChange={(id) => this.handleChange(id)} />;
            })}
            <ActionContainer></ActionContainer>
          </Container>
        </FullHeightFade>
      </Animated>
    );
  }
}

// imageLink={'https://ifh.cc/g/6onhGJ.png'}

export default YesNoPage;
