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

interface ShopImageProps {
  imageLink: string;
}

const ImageContainer = styled.div`
  position: relative;
  vertical-align: middle;

  height: 42vw;
  width: 42vw;
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

function FlexPage() {
  // const onWriteReviewButtonClick = useCallback(() => {
  //   history.push(`comment/${(match.params as any).shopId}`);
  // }, [history, match.params];
  let beClicked = false;
  let selected_name = 'false';

  const moveHref = () => {
    // document.location.href = '/';
    beClicked = true;
    selected_name = 'true';
    // background-color = "red";
  };

  // function changeBackground(e) {
  //   e.target.style.background = 'red';
  // }

  return (
    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
      <Container color="red">
        <Header category="modal" headerColor="red" />
        <Fade>
          <Bounce>
            <ImageContainer>
              <Image imageLink={'https://ifh.cc/g/6ZlXcR.png'} />
            </ImageContainer>
          </Bounce>
        </Fade>
        <Fade>
          <Bounce>
            <Link to="/">
              <Button theme="white" big onClick={moveHref}>
                FLEX 가능!
              </Button>
            </Link>
          </Bounce>
        </Fade>
        <Fade>
          <Bounce>
            <Link to="/">
              <Button theme="white" big>
                FLEX 불가능 ㅠㅠ
              </Button>
            </Link>
          </Bounce>
        </Fade>

        <ActionContainer></ActionContainer>
        <Divider />
      </Container>
    </Animated>
  );

  // beClicked = false;
}

export default FlexPage;
