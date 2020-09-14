// import React, { useEffect, useRef, useCallback } from 'react';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import { withRouter, RouteComponentProps, Route, Link } from 'react-router-dom';
import palette, { hexToRGB } from '../../styles/palette';
import Flag from '../../components/common/Flag';
import RestaurantCard from '../../components/common/RestaurantCard';
import Loader from '../../components/common/Loader';
import { Fade, Bounce } from 'react-awesome-reveal';
import { Animated } from 'react-animated-css';
import React, { Component } from 'react';
import Button from '../../components/common/Button';
import './TagButton.css';
import Title from 'lib/meta';

const ButtonBlock = styled.button`
  margin-right: -4px;
  background-color: #db2a37;
  color: white;
  margin-top: 50px;
  padding-left: 25px;
  padding-right: 25px;
  font-size: 15px;

  outline: none;
  border: none;

  border-radius: 12.5px;
  padding: 8.5px 27.5px;

  margin-bottom: 15px;
  margin: 3%;
  width: 100%;
  height: 50px;

  transition: background-color 0.2s ease;
  -webkit-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);

  font-family: 'Nanum Gothic';
  font-weight: 700;
`;

const TitleComment = styled.h1`
  font-family: 'Nanum Gothic';
  font-size: 30px;
  font-weight: 900;
  margin-top: 7px;
  margin-bottom: 0px;
  color: black;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const SubtitleComment = styled.h1`
  font-family: 'Nanum Gothic';
  font-size: 25px;
  font-weight: 100;
  margin-top: 7px;
  margin-bottom: 0px;
  color: ${palette.darkGray};
  padding-top: 30px;
  padding-bottom: 30px;
`;

const ButtonLine = styled.h1`
  display: 100%;
  font-family: 'Nanum Gothic';
  font-weight: 200;
  color: white;
  padding-bottom: 3px;

  vertical-align: center;
`;

const Divider = styled.div`
  border-bottom: 0px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 17px;
`;

let beClicked = false;
let selected_name = 'false';

interface Props extends RouteComponentProps {}

interface DataInterface {
  option: string[];
}

interface State {
  sorting_bool: boolean[];
  sortings: string[];
  category_bool: boolean[];
  categories: string[];
  food_bool: boolean[];
  foods: string[];
  price_bool: boolean[];
  prices: string[];
  place_bool: boolean[];
  places: string[];
  keyword_bool: boolean[];
  keywords: string[];
}

class FilterPage extends React.Component<Props, State> {
  state: State = {
    sorting_bool: [true, false, false],
    sortings: ['평점순', '추천순', '리뷰순'],
    category_bool: [false, false, false, false, false],
    categories: ['밥', '빵', '면', '고기', '기타'],
    food_bool: [false, false, false, false, false, false, false],
    foods: ['한식', '중식', '일식', '양식', '분식', '퓨전', '기타'],
    price_bool: [false, false, false, false],
    prices: ['5천원 이하', '1만원 이하', '1만원 대', 'Flex 가능'],
    place_bool: [false, false, false, false],
    places: ['정문', '후문', '중대병원', '흑석역'],
    keyword_bool: [false, false, false, false, false],
    keywords: ['가성비', '분위기', '단체', '혼밥', '밥약'],
  };

  //키워드에서 '맵찔' 제거함.

  changeSortingColor(i: number) {
    console.log(i);
    this.setState({
      sorting_bool: this.state.sorting_bool.map((item, index) => (index !== i ? (item = false) : (item = true))),
    });
  }

  changeCategoryColor(i: number) {
    console.log(i);
    this.setState({
      category_bool: this.state.category_bool.map((item, index) => (index !== i ? item : !item)),
    });
  }

  changeFoodColor(i: number) {
    console.log(i);
    this.setState({
      food_bool: this.state.food_bool.map((item, index) => (index !== i ? item : !item)),
    });
    // if (this.state.food_bool[5] == true) {
    //   this.setState({
    //     food_bool: this.state.food_bool.map((item, index) => true),
    //   });
    // }
  }

  changePlaceColor(i: number) {
    console.log(i);
    this.setState({
      place_bool: this.state.place_bool.map((item, index) => (index !== i ? item : !item)),
    });
  }

  changePriceColor(i: number) {
    console.log(i);
    this.setState({
      price_bool: this.state.price_bool.map((item, index) => (index !== i ? item : !item)),
    });
  }

  changeKeywordColor(i: number) {
    console.log(i);
    this.setState({
      keyword_bool: this.state.keyword_bool.map((item, index) => (index !== i ? item : !item)),
    });
  }

  moveHref = (data: DataInterface[]) => {
    beClicked = true;
    selected_name = 'true';
    this.props.history.push({
      pathname: '/result',
      search:
        '?order=' +
        data[0].option.join(',') +
        '&category=' +
        data[1].option.join(',') +
        '&foodCategory=' +
        data[2].option.join(',') +
        '&price=' +
        data[3].option.join(',') +
        '&location=' +
        data[4].option.join(',') +
        '&keyword=' +
        data[5].option.join(','),
    });
    console.log(data);
  };

  // data.map((data) => data.option)

  render() {
    const { moveHref } = this;
    const { sortings, foods, categories, prices, places, keywords } = this.state;

    const sortingList = sortings.map((sorting, i) => (
      <button
        className={`roundButton yHover ${this.state.sorting_bool[i] ? 'mainred' : ''}`}
        key={sorting}
        onClick={(e) => this.changeSortingColor(i)}
        style={{ height: 35, flex: 1 }}
      >
        <div style={TagTextStyle}>{sorting}</div>
      </button>
    ));

    const categoryList = categories.map((category, i) => (
      <button
        className={`roundButton yHover ${this.state.category_bool[i] ? 'mainred' : ''}`}
        key={category}
        onClick={(e) => this.changeCategoryColor(i)}
        style={{ height: 35, flex: 1 }}
      >
        <div style={TagTextStyle}>{category}</div>
      </button>
    ));

    const foodList = foods.map((food, i) => (
      <button
        className={`roundButton yHover ${this.state.food_bool[i] ? 'mainred' : ''}`}
        key={food}
        onClick={(e) => this.changeFoodColor(i)}
        style={{ height: 35, flex: 1 }}
      >
        <div style={TagTextStyle}>{food}</div>
      </button>
    ));

    const priceList = prices.map((price, i) => (
      <button
        className={`roundButton yHover ${this.state.price_bool[i] ? 'mainred' : ''}`}
        key={price}
        onClick={(e) => this.changePriceColor(i)}
        style={{ height: 35, flex: 1 }}
      >
        <div style={TagTextStyle}>{price}</div>
      </button>
    ));

    const placeList = places.map((place, i) => (
      <button
        className={`roundButton yHover ${this.state.place_bool[i] ? 'mainred' : ''}`}
        key={place}
        onClick={(e) => this.changePlaceColor(i)}
        style={{ height: 35, flex: 1 }}
      >
        <div style={TagTextStyle}>{place}</div>
      </button>
    ));

    const keywordList = keywords.map((keyword, i) => (
      <button
        className={`roundButton yHover ${this.state.keyword_bool[i] ? 'mainred' : ''}`}
        key={keyword}
        onClick={(e) => this.changeKeywordColor(i)}
        style={{ height: 35, flex: 1 }}
      >
        <div style={TagTextStyle}>{keyword}</div>
      </button>
    ));

    let data: DataInterface[] = [
      { option: [] } /* order : rate, recommended, review*/,
      { option: [] } /* food : korean, chinese, japanese, western, school, fusion, other, all*/,
      { option: [] } /* category : rice, bread, noodle, meat, etc*/,
      { option: [] } /* price : 5000, 10000, 20000, all*/,
      { option: [] } /* location : front, back, hs_station, front_far, all*/,
      { option: [] } /* keyword : costRatio,atmosphere,group,individual,riceAppointment,spicy*/,
    ];

    let order = ['rate', 'recommended', 'review'];
    let food = ['korean', 'chinese', 'japanese', 'western', 'school', 'fusion', 'other'];
    let category = ['rice', 'bread', 'noodle', 'meat', 'etc'];
    let price = ['5000', '10000', '15000', '20000'];
    let location = ['front', 'back', 'front_far', 'hs_station'];
    let keyword = ['costRatio', 'atmosphere', 'group', 'individual', 'riceAppointment'];

    var selectCheck = true;

    function orOperation(array: boolean[]) {
      var result = false;

      for (var i = 0; i < array.length; i++) result = result || array[i];

      return result;
    }

    //아래는 select가 한개라도 안된 항목이 있을 시 검색 자체가 불가능하도록 설정할 때 필요한 코드

    // if (orOperation(this.state.sorting_bool) === false) {
    //   selectCheck = false;
    // } else if (orOperation(this.state.food_bool) === false) {
    //   selectCheck = false;
    // } else if (orOperation(this.state.price_bool) === false) {
    //   selectCheck = false;
    // } else if (orOperation(this.state.place_bool) === false) {
    //   selectCheck = false;
    // } else if (orOperation(this.state.keyword_bool) === false) {
    //   selectCheck = false;
    // }

    // if (selectCheck === true) {
    for (var i = 0; i < this.state.sorting_bool.length; i++) {
      if (this.state.sorting_bool[i] === true) {
        data[0].option.push(order[i]);
      }
    }
    for (var i = 0; i < this.state.food_bool.length; i++) {
      if (this.state.food_bool[i] === true) {
        data[1].option.push(food[i]);
      }
    }
    for (var i = 0; i < this.state.category_bool.length; i++) {
      if (this.state.category_bool[i] === true) {
        data[2].option.push(category[i]);
      }
    }
    // if (this.state.food_bool[this.state.food_bool.length - 1] === true) {
    //   /*ALL이 TRUE면 */
    //   data[1].option = [];
    // }
    for (var i = 0; i < this.state.price_bool.length; i++) {
      if (this.state.price_bool[i] === true) {
        data[3].option.push(price[i]);
      }
    }
    for (var i = 0; i < this.state.place_bool.length; i++) {
      if (this.state.place_bool[i] === true) {
        data[4].option.push(location[i]);
      }
    }
    for (var i = 0; i < this.state.keyword_bool.length; i++) {
      if (this.state.keyword_bool[i] === true) {
        data[5].option.push(keyword[i]);
      }
    }
    console.log(data);
    // }

    var TagTextStyle = {
      fontSize: 30,
      flex: 1,
    };

    return (
      <Container color="white">
        <Title title="당신만을 위한 식당 - 푸딩" />
        <Header category="modal" headerColor="white" />
        <TitleComment>필터링 검색</TitleComment>
        <SubtitleComment>정렬</SubtitleComment>
        <ButtonLine>
          <div style={TagTextStyle}>{sortingList}</div>
        </ButtonLine>
        <Divider></Divider>
        <SubtitleComment>음식종류</SubtitleComment>
        <ButtonLine>
          <div style={TagTextStyle}>{foodList}</div>
        </ButtonLine>
        <Divider></Divider>
        <SubtitleComment>주재료</SubtitleComment>
        <ButtonLine>
          <div style={TagTextStyle}>{categoryList}</div>
        </ButtonLine>
        <Divider></Divider>
        <SubtitleComment>최저가격대</SubtitleComment>
        <ButtonLine>
          <div style={TagTextStyle}>{priceList}</div>
        </ButtonLine>
        <Divider></Divider>
        <SubtitleComment>위치</SubtitleComment>
        <ButtonLine>
          <div style={TagTextStyle}>{placeList}</div>
        </ButtonLine>
        <Divider></Divider>
        <SubtitleComment>키워드</SubtitleComment>
        <ButtonLine>
          <div style={TagTextStyle}>{keywordList}</div>
        </ButtonLine>
        <Divider></Divider>
        <Divider></Divider>
        <Divider></Divider>
        <Button theme="red" fullWidth onClick={() => moveHref(data)}>
          검색하기
        </Button>
      </Container>
    );
  }
}

export default FilterPage;
