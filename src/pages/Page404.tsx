import React from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import Container from 'components/layout/Container';
import Title from 'lib/meta';
import Header from 'components/layout/Header';
import Cat404 from 'assets/Cat404.svg';
import palette from 'styles/palette';

const Block404 = styled.div``;

const NoResultComment = styled.h1`
  font-size: 17px;
  font-family: 'Nanum Gothic';
  font-weight: 900;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  color: ${palette.mainRed};
`;

const SimpleImage = styled.img`
  width: 80%;
  max-height: 500px;
  height: auto;
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

function Page404() {
  return (
    <Container color="white">
      <Title title="404 - 푸딩" />
      <Header category="modal" headerColor="white" />
      <TopDivider></TopDivider>
      <Divider></Divider>
      <SimpleImageContainer>
        <SimpleImage src={Cat404} />
      </SimpleImageContainer>
      <Divider></Divider>
      <NoResultComment>요청하신 페이지를 찾을수없습니다</NoResultComment>
    </Container>
  );
}

export default Page404;
