import React, { useCallback, useEffect, useState } from 'react';
import Container from '../components/layout/Container';
import { Link, withRouter } from 'react-router-dom';
import RoundContainer from '../components/common/RoundContainer';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../styles/palette';
import MainLogoSvg from 'assets/fooding_white.svg';
import MainLogoTitleSvg from 'assets/fooding_title_main_white.svg';
import Filter from 'assets/filter.svg';
import YesNo from 'assets/yesno.svg';
import Roulette from 'assets/roulette.svg';
import MyPage from 'assets/fooding.svg';
import Korean from 'assets/korean.svg';
import School from 'assets/school.svg';
import Fastfood from 'assets/fastfood.svg';
import Pizza from 'assets/pizza.svg';
import AsianWestern from 'assets/asian_western.svg';
import Japanese from 'assets/japanese.svg';
import Chinese from 'assets/chinese.svg';
import Chicken from 'assets/chicken.svg';
import Stew from 'assets/stew.svg';
import Pig from 'assets/pig.svg';
import Bakery from 'assets/bakery.svg';
import './TagButton.css';
import useMainPost from 'hooks/useMain';
import useCheck from 'hooks/useCheck';
import { useScrollTop } from 'components/common/ScrollToTopController';
import Button from 'components/common/Button';

const BackgroundImage = styled.div`
  position: absolute;
  top: -225px;
  left: 0;
  right: 0;
  background-color: ${palette.mainRed};
  height: 470px;
`;

const MainLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12.5px;
  margin-bottom: 15px;
  img {
    width: 54px;
    height: 48px;
  }
`;

const FunctionContainer = styled.div`
  background-color: ${palette.white};
  border-radius: 15px;
  width: 100%;
  -webkit-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.05);
  box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.05);
  .functionTitle {
    color: ${palette.deppDarkGray};
    font-size: 11px;
    font-weight: bolder;
    text-align: center;
    padding: 25px 0;
    padding-top: 30px;
    width: 100%;
  }
  .functionRow {
    width: 100%;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;
    .function {
      width: 20%;
      margin: 0 5px;
      animation: fadeInScaleOut 0.3s ease-in;
      animation-fill-mode: forwards;
      .imgHolder {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48px;
        height: 48px;
        margin: 0 auto;
        border-radius: 50%;
        background-color: ${palette.middleLightGray};
        img {
          width: 20px;
          height: 20px;
        }
      }
      .imgHolder.red {
        background-color: ${palette.mainRed};
      }
      .name {
        color: ${palette.deppDarkGray};
        font-weight: light;
        font-size: 12px;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
`;
const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  height: 35px;
  border-radius: 50px;
  background-color: ${palette.white};
  svg {
    padding-left: 20px;
  }
  input {
    border: none;
    outline: none;

    padding-left: 10px;

    flex: 1;

    font-size: 12.5px;
    font-weight: 100;
    font-family: 'Nanum Gothic';
  }
`;

const CategoryContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
  .category {
    width: 25%;
    animation-fill-mode: forwards;
    .imgHolder {
      width: 48px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      border-radius: 50%;
      background-color: ${palette.white};
      img {
        width: 20px;
        height: 20px;
      }
    }
    .name {
      color: ${palette.deppDarkGray};
      font-weight: lighter;
      font-size: 11px;
      text-align: center;
      margin-top: 10px;
    }
  }
`;

const InstarContainer = styled.div`
  background-color: ${palette.white};
  border-radius: 15px;
  margin-top: 30px;
  margin-bottom: 35px;
  padding-bottom: 7.5px;

  -webkit-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.05);
  box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.05);

  .title {
    font-weight: bolder;
    text-align: center;
    padding-top: 25px;
    padding-bottom: 5px;
    font-size: 14.5px;
  }
  .posts {
    margin: 0 20px;

    .loaderContainer {
      display: flex;
      justify-content: center;
      margin: 10px 0;
      padding: 30px 0;
    }

    .loader {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 0 auto;
      display: inline-block;
      position: relative;
      vertical-align: middle;
    }
    .loader,
    .loader:before,
    .loader:after {
      animation: 1s infinite ease-in-out;
    }
    .loader:before,
    .loader:after {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .loader-black {
      background-color: ${palette.mainRed};
    }
    .loader-1 {
      animation-name: loader1;
    }
    @keyframes loader1 {
      from {
        transform: scale(0);
        opacity: 1;
      }
      to {
        transform: scale(1);
        opacity: 0;
      }
    }
  }
`;

const AddShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${palette.mainRed};
  padding-top: 50px;
  transform: translateY(-50px);
  .subTitle {
    font-weight: bolder;
    padding-bottom: 5px;
    font-size: 12px;
  }

  button {
    border-radius: 20px;
    font-size: 11px;
    font-weight: bold;
    padding: 7.5px 25px;
  }

  .info {
    margin-top: 27.5px;
    font-size: 11px;
    padding-bottom: 50px;
    .bold {
      font-weight: bolder;
    }
  }
`;

interface Category {
  name: string;
  img: string;
  search: string;
}

const CategoryArray: Category[] = [
  {
    name: '한식',
    img: Korean,
    search: 'korean',
  },
  {
    name: '분식',
    img: School,
    search: 'school',
  },
  {
    name: '패스트푸드',
    img: Fastfood,
    search: 'fastfood',
  },
  {
    name: '피자',
    img: Pizza,
    search: 'pizza',
  },
  {
    name: '아시안・양식',
    img: AsianWestern,
    search: 'asianWestern',
  },
  {
    name: '돈까스・회・일식',
    img: Japanese,
    search: 'japanese',
  },
  {
    name: '중국집',
    img: Chinese,
    search: 'chinese',
  },
  {
    name: '치킨',
    img: Chicken,
    search: 'chicken',
  },
  {
    name: '찜・탕',
    img: Stew,
    search: 'stew',
  },
  {
    name: '족발・보쌈',
    img: Pig,
    search: 'pig',
  },
  {
    name: '베이커리',
    img: Bakery,
    search: 'bakery',
  },
  {
    name: '',
    img: '',
    search: '',
  },
];

function HomePage({ history, match }: RouteComponentProps) {
  const { getMainPost, posts } = useMainPost();

  const { user } = useCheck();

  useEffect(() => {
    getMainPost();
  }, [getMainPost]);

  const myPageButtonClick = useCallback(() => {
    if (user) {
      history.push('/myPage');
    } else {
      localStorage.setItem('redir', match.url);
      history.push('/auth/login');
    }
  }, [user, history, match]);

  const searchBarClick = useCallback(() => {
    history.push('/search');
  }, [history]);

  useScrollTop();

  return (
    <>
      <Container color="white">
        <div>
          <BackgroundImage></BackgroundImage>
        </div>
        <div style={{ position: 'relative' }}>
          <MainLogo>
            <img src={MainLogoSvg} alt="logo" />
            <img src={MainLogoTitleSvg} alt="logoTitle" className="title" />
          </MainLogo>
          <FunctionContainer>
            <div className="functionTitle">뭐 먹을지 고민될 땐, 푸딩이 정해드릴게요!</div>
            <div className="functionRow">
              <Link className="function" to="/filter" style={{ animationDelay: '0' }}>
                <div className="imgHolder">
                  <img src={Filter} alt="" />
                </div>
                <div className="name">필터검색</div>
              </Link>
              <Link className="function" to="/yesno" style={{ animationDuration: '0.35s' }}>
                <div className="imgHolder">
                  <img src={YesNo} alt="" />
                </div>
                <div className="name">양자택일</div>
              </Link>
              <Link className="function" to="/rouletteList" style={{ animationDuration: '0.4s' }}>
                <div className="imgHolder">
                  <img src={Roulette} alt="" />
                </div>
                <div className="name">돌림판</div>
              </Link>
              <div className="function" onClick={myPageButtonClick} style={{ animationDuration: '0.45s' }}>
                <div className="imgHolder red">
                  <img src={MyPage} alt="" />
                </div>
                <div className="name">{user ? '마이푸딩' : '로그인'}</div>
              </div>
            </div>
          </FunctionContainer>
          <SearchBar onClick={searchBarClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z" />
            </svg>
            <input placeholder="검색어를 입력하세요" />
          </SearchBar>
          <CategoryContainer>
            {CategoryArray.map((category, index) =>
              category.img.length > 0 ? (
                <Link
                  className="category"
                  key={category.name}
                  to={`/result?detailCategory=${category.search}&isDetailCategory=true`}
                  style={{ animation: `fadeInScaleOut2 ${0.3 + index * 0.05}s ease` }}
                >
                  <div className="imgHolder">
                    <img src={category.img} alt={category.name} />
                  </div>
                  <div className="name">{category.name}</div>
                </Link>
              ) : (
                <div className="category" key={category.name} style={{ animation: `fadeInScaleOut2 ${0.3 + index * 0.05}s ease` }}>
                  <div className="imgHolder">
                    <img alt={category.name} style={{ visibility: 'hidden' }} />
                  </div>
                  <div className="name">{category.name}</div>
                </div>
              ),
            )}
          </CategoryContainer>
          <InstarContainer>
            <div className="title">FOODING’s PICK!</div>
            <div className="posts">
              {posts.data ? (
                posts.data.map((post) => (
                  <a href={post.link} key={post.image}>
                    <RoundContainer theme="image" imageLink={post.image} key={`${post.registerDate}`}>
                      <span>{post.title}</span>
                    </RoundContainer>
                  </a>
                ))
              ) : (
                <div className="loaderContainer">
                  <div className="loader loader-black loader-1"></div>
                </div>
              )}
            </div>
          </InstarContainer>
        </div>
      </Container>
      <AddShopContainer>
        <div className="subTitle">찾는 식당이 푸딩에 등록되어 있지 않나요?</div>
        <a href="https://forms.gle/G2AGwkTyaXeN7C1T6">
          <Button theme="white">식당 등록하기</Button>
        </a>
        <div className="info">
          © 2020
          <span className="bold"> Teaspoon </span>
          All rights reserved.
        </div>
      </AddShopContainer>
    </>
  );
}

export default withRouter(HomePage);
