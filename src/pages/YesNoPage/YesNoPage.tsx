import React, { useEffect, useRef, useCallback } from 'react';
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

interface ShopImageProps {
  imageLink: string;
}

const ImageContainer = styled.div`
  position: relative;
  vertical-align: middle;

  height: 42vw;
  width: 40vw;
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

interface DetailPageProps extends RouteComponentProps {}

function YesNoPage({ match, history }: DetailPageProps) {
  return (
    <Fade>
      <Container color="red">
        <Header category="modal" headerColor="red" />
        <Fade>
          <Bounce>
            <ImageContainer>
              <Image imageLink={'https://ifh.cc/g/6onhGJ.png'} />
            </ImageContainer>
          </Bounce>
        </Fade>
        <Fade>
          <Bounce>
            <Button theme="white" big>
              매운 거
            </Button>
          </Bounce>
        </Fade>
        <Fade>
          <Bounce>
            <Button theme="white" big>
              안 매운 거
            </Button>
          </Bounce>
        </Fade>

        <ActionContainer></ActionContainer>
        <Divider />
      </Container>
    </Fade>
  );
}

export default YesNoPage;
