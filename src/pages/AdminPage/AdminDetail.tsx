import React, { useEffect, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import useDetail from '../../hooks/useDetail';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import palette from '../../styles/palette';
import { locationToString, categoryToString } from '../../lib/shopUtil';
import { Location, ShopCategory } from '../../api/getShop';
import Button from '../../components/common/Button';
import ButtonGroup from '../../components/common/ButtonGroup';
import { apiLink } from '../../lib/getAPILink';
import axios from 'axios';
import { stringify } from 'querystring';

const ShopTitle = styled.h1`
  font-size: 31px;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ShopImageContainer = styled.div`
  height: 60vw;
  max-height: 400px;
  width: 100%;

  background-color: transparent;

  -webkit-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
`;

interface ShopImageProps {
  imageLink: string;
}

const ShopImage = styled.div`
  display: flex;

  height: 100%;

  border-radius: 10px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${(props: ShopImageProps) =>
    props.imageLink &&
    css`
      background-image: url(${props.imageLink});
    `}
`;

const ShopInformationContainer = styled.form`
  margin-top: 20px;
  select {
    width: 100px;
    padding: 0 10px;
  }
`;
const ShopInformation = styled.div`
  color: ${palette.darkGray};

  display: flex;
  align-items: center;

  margin: 10px 0;

  span {
    margin-right: 10px;
    width: 70px;
  }
  input {
    flex: 1;
  }
  button.submit {
    border: none;
  }
`;

const MenuContainer = styled.div`
  .menu {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: black;
    div {
      flex: 1;
      margin-top: 10px;
      span {
        margin-right: 10px;
      }
    }
  }
`;

const CommentContainer = styled.div`
  color: ${palette.darkGray};
`;

const Comment = styled.div`
  margin: 15px 0;
  padding: 5px;

  border: 1px solid ${palette.middleGray};

  p {
    margin: 5px 0;
  }
`;

function AdminDetail({ match }: RouteComponentProps) {
  const shopId: string = (match.params as any).shopId;

  const { onShopRequest, onReviewRequest, shop, reviews } = useDetail(shopId);

  interface Form {
    name: string;
    address: string;
    location: Location;
    latitude: number;
    longitude: number;
    category: ShopCategory;
    contact: string;
    open: string;
    closed: string;
  }

  const [form, setForm] = useState<Form>({
    name: '',
    address: '',
    location: Location.None,
    latitude: 0,
    longitude: 0,
    category: ShopCategory.None,
    contact: '',
    open: '',
    closed: '',
  });

  interface Menu {
    title: string;
    price: number;
    _id: string;
  }

  const [menus, setMenus] = useState<Menu[]>([]);

  const [newMenu, setNewMenu] = useState<Menu>({
    title: '',
    price: 0,
    _id: '',
  });

  useEffect(() => {
    onShopRequest();
    onReviewRequest();
  }, [onShopRequest, onReviewRequest]);

  useEffect(() => {
    let s = shop.data;
    if (s) {
      setForm({
        name: s.name,
        address: s.address,
        location: s.location,
        latitude: s.latitude,
        longitude: s.longitude,
        category: s.category,
        contact: s.contact,
        open: s.open,
        closed: s.closed,
      });
      setMenus(s.menus);
    }
  }, [shop.data]);

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!shop.data) return;
      axios.put(`${apiLink()}/shop/${shop.data._id}`, form, {
        withCredentials: true,
      });
    },
    [form, shop.data],
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    },
    [form],
  );

  const onChangeSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    },
    [form],
  );

  const onMenuChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, menuIndex: number) => {
      setMenus(
        menus.map((menu, index) =>
          index === menuIndex
            ? {
                ...menu,
                [event.target.name]: event.target.value,
              }
            : menu,
        ),
      );
    },
    [menus],
  );

  const updateMenu = async (menuId: string, index: number) => {
    if (!menus[index]) return;
    await axios.put(
      `${apiLink()}/shop/menu/${menuId}`,
      { title: menus[index].title, price: menus[index].price },
      {
        withCredentials: true,
      },
    );
    onShopRequest();
  };

  const deleteMenu = async (menuId: string) => {
    await axios.delete(`${apiLink()}/shop/menu/${menuId}`, {
      withCredentials: true,
    });
    onShopRequest();
  };

  const onNewMenuChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewMenu({
        ...newMenu,
        [event.target.name]: event.target.value,
      });
    },
    [newMenu],
  );

  const addNewMenu = async () => {
    if (!shop.data) return;
    await axios.post(
      `${apiLink()}/shop/menu/${shop.data._id}`,
      {
        title: newMenu.title,
        price: newMenu.price,
      },
      {
        withCredentials: true,
      },
    );
    onShopRequest();
  };

  if (shop.loading) {
    return <p>로딩중</p>;
  }

  return shop.data ? (
    <Container color="white">
      <ShopImageContainer>
        <ShopImage
          imageLink={shop.data.shopImage.length > 0 ? shop.data.shopImage[0].imageLink : 'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'}
        ></ShopImage>
      </ShopImageContainer>
      <ShopInformationContainer onSubmit={onSubmit} method="post">
        <ShopInformation>
          <span>이름 : </span>
          <input name="name" value={form.name} onChange={onChange} />
        </ShopInformation>
        <ShopInformation>
          <span>주소 : </span>
          <input name="address" value={form.address} onChange={onChange} />
        </ShopInformation>
        <ShopInformation>
          <span>위치 : </span>
          <select value={form.location} name="location" onChange={onChangeSelect}>
            <option value={Location.Front}>{locationToString(Location.Front)}</option>
            <option value={Location.FrontFar}>{locationToString(Location.FrontFar)}</option>
            <option value={Location.HsStation}>{locationToString(Location.HsStation)}</option>
            <option value={Location.Back}>{locationToString(Location.Back)}</option>
          </select>
        </ShopInformation>
        <ShopInformation>
          <span>위도 : </span>
          <input name="latitude" value={form.latitude} onChange={onChange} />
        </ShopInformation>
        <ShopInformation>
          <span>경도 : </span>
          <input name="longitude" value={form.longitude} onChange={onChange} />
        </ShopInformation>
        <ShopInformation>
          <span>카테고리 : </span>
          <select name="category" value={form.category} onChange={onChangeSelect}>
            <option value={ShopCategory.Korean}>{categoryToString(ShopCategory.Korean)}</option>
            <option value={ShopCategory.Japanese}>{categoryToString(ShopCategory.Japanese)}</option>
            <option value={ShopCategory.Chinese}>{categoryToString(ShopCategory.Chinese)}</option>
            <option value={ShopCategory.Western}>{categoryToString(ShopCategory.Western)}</option>
            <option value={ShopCategory.Fusion}>{categoryToString(ShopCategory.Fusion)}</option>
            <option value={ShopCategory.School}>{categoryToString(ShopCategory.School)}</option>
            <option value={ShopCategory.other}>{categoryToString(ShopCategory.other)}</option>
          </select>
        </ShopInformation>
        <ShopInformation>
          <span>전화번호 : </span>
          <input name="contact" value={form.contact} onChange={onChange} />
        </ShopInformation>
        <ShopInformation>
          <span>오픈 : </span>
          <input name="open" value={form.open} onChange={onChange} />
        </ShopInformation>
        <ShopInformation>
          <span>클로즈 : </span>
          <input name="closed" value={form.closed} onChange={onChange} />
        </ShopInformation>
        <ButtonGroup rightAlign direction="row" gap="0">
          <Button theme="red">적용</Button>
        </ButtonGroup>
      </ShopInformationContainer>
      <MenuContainer>
        {shop.data.menus.map((menu, index) => (
          <div className="menu" key={menu._id}>
            {menus.length > 0 && (
              <>
                <div>
                  <div>
                    <span>이름</span>
                    <input name="title" value={menus[index].title} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onMenuChange(event, index)} />
                  </div>
                  <div>
                    <span>가격</span>
                    <input name="price" value={menus[index].price} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onMenuChange(event, index)} />
                  </div>
                </div>
                <ButtonGroup direction="row" gap="10px">
                  <Button theme="red" onClick={() => updateMenu(menu._id, index)}>
                    수정
                  </Button>
                  <Button theme="red" onClick={() => deleteMenu(menu._id)}>
                    삭제
                  </Button>
                </ButtonGroup>
              </>
            )}
          </div>
        ))}
        {shop.data.menus.length < 3 && (
          <div className="menu">
            {menus.length > 0 && (
              <>
                <div>
                  <div>
                    <span>이름</span>
                    <input name="title" value={newMenu.title} onChange={onNewMenuChange} />
                  </div>
                  <div>
                    <span>가격</span>
                    <input name="price" value={newMenu.price} onChange={onNewMenuChange} />
                  </div>
                </div>
                <ButtonGroup direction="row" gap="10px">
                  <Button theme="red" onClick={addNewMenu}>
                    추가
                  </Button>
                </ButtonGroup>
              </>
            )}
          </div>
        )}
      </MenuContainer>
      <CommentContainer>
        {reviews.data &&
          reviews.data.map((review) => (
            <Comment key={review._id}>
              <p>작성자 : {review.user.name}</p>
              <p>내용 : {review.comment}</p>
            </Comment>
          ))}
      </CommentContainer>
    </Container>
  ) : null;
}

export default withRouter(AdminDetail);
