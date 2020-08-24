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
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useShops from '../../hooks/useShops';
import { getShopsInterface } from '../../api/getShops';

const ResultComment = styled.h1`
  font-family: 'Nanum Gothic';
  font-size: 17px;
  font-weight: 900;
  margin-top: 7px;
  margin-bottom: 0px;
  color: white;
  padding: 45px;
`;

const RestaurantCardContainer = styled.div`
  & > a {
    margin: 12.5px 0;
    display: block;
    text-decoration: none;
    color: inherit;
  }
`;

function ResultPage({ location }: RouteComponentProps) {
  const { onGetShops, shops } = useShops();

  useEffect(() => {
    const param = location.search
      .split('?')[1]
      .split('&')
      .map((data) => data.split('='));
    let options: getShopsInterface = {};
    param.forEach((option) => {
      if (option[0] === 'location ' || option[0] === 'category') {
        options = {
          ...options,
          [option[0]]: option[1],
        };
      }
    });
    onGetShops(options);
  }, [location, onGetShops]);
  return (
    <Container color="red">
      <Helmet>
        <title>당신만을 위한 식당 - 푸딩</title>
      </Helmet>
      <Header category="modal" headerColor="red" />
      {shops.loading ? (
        <Loader color="white" />
      ) : shops.data ? (
        <>
          <ResultComment>검색 결과를 찾았습니다!</ResultComment>
          <RestaurantCardContainer>
            {shops.data.map((shop, index) => (
              <Link to={`/shop/${shop._id}`} key={shop._id}>
                <RestaurantCard shop={shop} delay={index} />
              </Link>
            ))}
          </RestaurantCardContainer>
        </>
      ) : (
        <div>불러오는 중 에러 발생</div>
      )}
    </Container>
  );
}

// /5f26b992555be6865ede4e28

export default ResultPage;
