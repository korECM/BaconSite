import React from 'react';
import Container from '../components/layout/Container';
import Header from '../components/layout/Header';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

function HomePage() {
  return (
    <Container color="white">
      <Header category="main" headerColor="white" />
      <Button theme="white">
        <Link to="/shop/5f26b992555be6865ede4e28">테스트 가게</Link>
      </Button>
      <Button theme="white">
        <Link to="/yesno">선택 장애</Link>
      </Button>
    </Container>
  );
}

export default HomePage;
