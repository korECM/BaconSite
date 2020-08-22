// import React, { useEffect, useRef, useCallback } from 'react';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import { withRouter, RouteComponentProps, Route, Link } from 'react-router-dom';
import palette from '../../styles/palette';
import Flag from '../../components/common/Flag';
import RestaurantCard from '../../components/common/RestaurantCard';
import Loader from '../../components/common/Loader';
import { Fade, Bounce } from 'react-awesome-reveal';
import { Animated } from 'react-animated-css';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const ResultComment = styled.h1`
  font-family: 'Nanum Gothic';
  font-size: 17px;
  font-weight: 900;
  margin-top: 7px;
  margin-bottom: 0px;
  color: white;
  padding: 45px;
`;

function ResultPage({ match }: RouteComponentProps) {
  return (
    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
      <Fade>
        <Container color="red">
          <Helmet>
            <title>당신만을 위한 식당 - 푸딩</title>
          </Helmet>
          <Header category="modal" headerColor="red" />
          <Fade>
            <Bounce>
              <ResultComment>검색 결과를 찾았습니다!</ResultComment>
              <Link to="/shop/5f26b992555be6865ede4e28">
                <Route exact path={`${match.path}`} component={RestaurantCard} />
              </Link>
              <Link to="/result">
                <Route exact path={`${match.path}`} component={RestaurantCard} />
              </Link>
              <Link to="/result">
                <Route exact path={`${match.path}`} component={RestaurantCard} />
              </Link>
            </Bounce>
          </Fade>
        </Container>
      </Fade>
    </Animated>
  );
}

// /5f26b992555be6865ede4e28

export default ResultPage;
