import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import { withRouter, RouteComponentProps, Route, Link } from 'react-router-dom';
import RestaurantCard from '../../components/common/RestaurantCard';
import Loader from '../../components/common/Loader';
import React, { useEffect, useState } from 'react';
import useShops from '../../hooks/useShops';
import { getShopsInterface } from '../../api/getShops';
import Title from 'lib/meta';
import noResultCat from 'assets/NoResultCat.svg';
import noResultCat2 from 'assets/NoResultCat2.svg';
import ScrollToTopController from 'components/common/ScrollToTopController';

const ResultComment = styled.h1`
  font-family: 'Nanum Gothic';
  font-size: 17px;
  font-weight: 900;
  margin-top: 7px;
  margin-bottom: 0px;
  color: white;
  padding: 45px;
  text-align: center;
`;

const NoResultComment = styled.h1`
  font-size: 17px;
  font-family: 'Nanum Gothic';
  font-weight: 900;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  color: white;
`;

const SimpleImage = styled.img`
  height: 150px;
  object-fit: contain;
`;

const SimpleImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0 30px;
`;

const Divider = styled.div`
  border-bottom: 0px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 60px;
`;

const TopDivider = styled.div`
  border-bottom: 0px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 60px;
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

  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const param = location.search
      .split('?')[1]
      .split('&')
      .map((data) => data.split('='));
    let options: getShopsInterface = {};
    param.forEach((option) => {
      if (
        option[0] === 'location' ||
        option[0] === 'category' ||
        option[0] === 'price' ||
        option[0] === 'keyword' ||
        option[0] === 'name' ||
        option[0] === 'order' ||
        option[0] === 'foodCategory'
      ) {
        options = {
          ...options,
          [option[0]]: option[1],
        };
      } else if (option[0] === 'search') {
        setIsSearch(true);
      }
    });
    onGetShops(options);
  }, [location, onGetShops]);
  return (
    <Container color="red">
      <Title title="당신만을 위한 식당 - 푸딩" />
      <Header category="modal" headerColor="red" />
      {shops.loading ? (
        <Loader color="white" />
        ) : shops.data ? (
          <>
          {shops.data.length === 0 ? (
            <>
            <ScrollToTopController/>
              <TopDivider></TopDivider>
              <NoResultComment>앗, 검색 결과가 없습니다!</NoResultComment>
              <Divider></Divider>
              <SimpleImageContainer>
                <SimpleImage src={isSearch ? noResultCat2 : noResultCat} />
              </SimpleImageContainer>
              <Divider></Divider>
              {isSearch ? <NoResultComment>다른 검색어로</NoResultComment> : <NoResultComment>다른 옵션으로</NoResultComment>}
              <NoResultComment>다시 검색해주세요</NoResultComment>
            </>
          ) : (
            <>
            <ScrollToTopController/>
              <ResultComment>검색 결과를 찾았습니다!</ResultComment>
              <RestaurantCardContainer>
                {shops.data.map((shop, index) => (
                  <Link to={`/shop/${shop._id}`} key={shop._id}>
                    <RestaurantCard shop={shop} delay={index * 75} />
                  </Link>
                ))}
              </RestaurantCardContainer>
            </>
          )}
        </>
      ) : (
        <>
          <TopDivider></TopDivider>
          <NoResultComment>앗, 결과를 받아올 수 없었어요!</NoResultComment>
          <Divider></Divider>
          <SimpleImageContainer>
            <SimpleImage src={noResultCat} />
          </SimpleImageContainer>
          <Divider></Divider>
          <NoResultComment>잠시 후에</NoResultComment>
          <NoResultComment>다시 시도해주세요</NoResultComment>
        </>
      )}
    </Container>
  );
}

// /5f26b992555be6865ede4e28

export default ResultPage;
