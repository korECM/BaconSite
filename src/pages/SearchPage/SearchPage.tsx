import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import Container from 'components/layout/Container';
import Header from 'components/layout/Header';
import palette, { hexToRGB } from 'styles/palette';
import axios from 'axios';
import { apiLink } from 'lib/getAPILink';
import debounce from 'lodash/debounce';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useScrollTop } from 'components/common/ScrollToTopController';

const SearchPageBlock = styled.div``;

const SearchBar = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
  margin-bottom: 15px;
  height: 40px;
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

const ResultContainer = styled.div`
  .keyword {
    display: flex;
    align-items: center;
    color: black;
    height: 50px;
    padding-left: 20px;
    border-bottom: 0.8px solid ${hexToRGB(palette.middleGray, 0.3)};
    font-weight: lighter;

    .red {
      color: ${palette.mainRed};
      font-weight: bolder;
    }

    .shopInfo {
      color: ${palette.middleGray};
      font-size: 0.7rem;
      margin-left: 10px;
    }
  }
`;

interface ResponseInterface {
  shops: Shop[];
  menus: Menu[];
}
interface Menu {
  name: string;
  menu: string;
  id: string;
}

interface Shop {
  name: string;
  id: string;
}

interface TextInterface {
  text: string;
  highlighted: boolean;
}

interface DataInterface {
  text: TextInterface[];
  shop: string;
  id: string;
}

function SearchPage({ history }: RouteComponentProps) {
  const [value, setValue] = useState('');
  const [data, setData] = useState<DataInterface[]>([]);

  const debounceSearch = useCallback(
    debounce(async (keyword: string) => {
      if (keyword.length === 0) {
      } else {
        try {
          const response = await axios.get<ResponseInterface>(apiLink() + `/shop/search/${keyword}`, {
            withCredentials: true,
          });
          console.log(response.data);
          let rawData: DataInterface[] = [];
          response.data.shops.forEach((shop) => {
            let tempText: TextInterface[] = [];
            let count = 0;
            while (true) {
              let index = shop.name.indexOf(keyword, count);
              if (index === -1) {
                tempText.push({
                  highlighted: false,
                  text: shop.name.substring(count),
                });
                break;
              } else {
                tempText.push({
                  highlighted: false,
                  text: shop.name.substring(count, index),
                });
                tempText.push({
                  highlighted: true,
                  text: shop.name.substring(index, index + keyword.length),
                });
                count = index + keyword.length;
              }
            }
            rawData.push({
              shop: '',
              text: tempText,
              id: shop.id,
            });
          });
          response.data.menus.forEach((menu) => {
            let tempText: TextInterface[] = [];
            let count = 0;
            while (true) {
              let index = menu.menu.indexOf(keyword, count);
              if (index === -1) {
                tempText.push({
                  highlighted: false,
                  text: menu.menu.substring(count),
                });
                break;
              } else {
                tempText.push({
                  highlighted: false,
                  text: menu.menu.substring(count, index),
                });
                tempText.push({
                  highlighted: true,
                  text: menu.menu.substring(index, index + keyword.length),
                });
                count = index + keyword.length;
              }
            }
            rawData.push({
              shop: menu.name,
              text: tempText,
              id: menu.id,
            });
          });
          setData(rawData);
        } catch (error) {
          console.error(error);
        }
      }
    }, 300),
    [],
  );
  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      setValue(value);
      if (value.trim().length > 0) debounceSearch(value.trim());
    },
    [debounceSearch],
  );

  const onKeywordClick = useCallback(
    (keyword: string) => {
      console.log(keyword);
      setValue('');
      setData([]);
      history.push({
        pathname: '/shop/' + keyword,
      });
    },
    [history],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      if (value !== '' && value.length < 20) {
        //10글자로 제한
        if (value.length > 0) {
          history.push({
            pathname: '/result',
            search: 'name=' + value + '&search=true',
          });
        }
        setValue('');
      }
    },
    [value, history],
  );

  useScrollTop();

  return (
    <Container color="white">
      <Header category="modal" headerColor="white" />
      <SearchBar onSubmit={onSubmit}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
          <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z" />
        </svg>
        <input placeholder="검색어를 입력하세요" onChange={onInputChange} value={value} />
      </SearchBar>
      <ResultContainer>
        {data.map((d, index) => (
          <div className="keyword" key={d.text.map((d) => d.text).join(`${index}`)} onClick={() => onKeywordClick(d.id)}>
            {d.text.map((dataElem, index) => (
              <span className={dataElem.highlighted ? 'red' : ''} key={dataElem.text + index}>
                {dataElem.text}
              </span>
            ))}
            {d.shop.length > 0 && <span className="shopInfo">{d.shop}</span>}
          </div>
        ))}
      </ResultContainer>
    </Container>
  );
}

export default withRouter(SearchPage);
