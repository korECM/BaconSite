import React, { useEffect, useState, useCallback, Dispatch } from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import { locationToString, categoryToString, foodCategoryEnumToString, detailFoodCategoryToString } from '../../lib/shopUtil';
import { ShopCategory, Location, FoodCategory, DetailFoodCategory } from '../../api/getShop';
import Button from '../../components/common/Button';
import ButtonGroup from '../../components/common/ButtonGroup';
import { ShopUIInterface } from '../../modules/detail';
import axios from 'axios';
import { apiLink } from '../../lib/getAPILink';
import palette from '../../styles/palette';
import { AdminElementInterface } from './AdminDetail';

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

interface AdminShopInformationProps extends AdminElementInterface {
  shop: ShopUIInterface;
}

function AdminShopInformation({ shop, reload, confirmAlert }: AdminShopInformationProps) {
  interface Form {
    name: string;
    address: string;
    location: Location;
    latitude: number;
    longitude: number;
    price: number;
    category: ShopCategory;
    foodCategory: FoodCategory[];
    detailFoodCategory: DetailFoodCategory[];
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
    price: 0,
    category: ShopCategory.None,
    foodCategory: [],
    detailFoodCategory: [],
    contact: '',
    open: '',
    closed: '',
  });

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!confirmAlert()) return;
      const updateData = async () => {
        await axios.put(`${apiLink()}/shop/${shop._id}`, form, {
          withCredentials: true,
        });
        reload();
      };
      updateData();
    },
    [form, shop, reload, confirmAlert],
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (event.target.name === 'foodCategory') {
        setForm({
          ...form,
          foodCategory: form.foodCategory.includes(event.target.value as any)
            ? form.foodCategory.filter((e) => e !== event.target.value)
            : form.foodCategory.concat(event.target.value as any),
        });
      } else if (event.target.name === 'detailFoodCategory') {
        setForm({
          ...form,
          detailFoodCategory: form.detailFoodCategory.includes(event.target.value as any)
            ? form.detailFoodCategory.filter((e) => e !== event.target.value)
            : form.detailFoodCategory.concat(event.target.value as any),
        });
      } else {
        setForm({
          ...form,
          [event.target.name]: event.target.value,
        });
      }
    },
    [form],
  );

  const deleteShop = async () => {
    if (!confirmAlert()) return;
    await axios.delete(`${apiLink()}/shop/${shop._id}`, {
      withCredentials: true,
    });
  };

  useEffect(() => {
    setForm({
      name: shop.name,
      address: shop.address,
      location: shop.location,
      latitude: shop.latitude,
      longitude: shop.longitude,
      price: shop.price,
      category: shop.category,
      foodCategory: shop.foodCategory,
      detailFoodCategory: shop.detailFoodCategory,
      contact: shop.contact,
      open: shop.open,
      closed: shop.closed,
    });
  }, [shop]);

  return (
    <>
      <ShopInformationContainer onSubmit={onSubmit} method="post">
        <ShopInformation>
          <span>이름 : </span>
          <input name="name" value={form.name} onChange={onChange} autoComplete="off" />
        </ShopInformation>
        <ShopInformation>
          <span>주소 : </span>
          <input name="address" value={form.address} onChange={onChange} autoComplete="off" />
        </ShopInformation>
        <ShopInformation>
          <span>위치 : </span>
          <select value={form.location} name="location" onChange={onChange}>
            <option value={Location.Front}>{locationToString(Location.Front)}</option>
            <option value={Location.FrontFar}>{locationToString(Location.FrontFar)}</option>
            <option value={Location.HsStation}>{locationToString(Location.HsStation)}</option>
            <option value={Location.Back}>{locationToString(Location.Back)}</option>
          </select>
        </ShopInformation>
        <ShopInformation>
          <span>위도 : </span>
          <input name="latitude" value={form.latitude} onChange={onChange} autoComplete="off" />
        </ShopInformation>
        <ShopInformation>
          <span>경도 : </span>
          <input name="longitude" value={form.longitude} onChange={onChange} autoComplete="off" />
        </ShopInformation>
        <ShopInformation>
          <span>가격 : </span>
          <input name="price" value={form.price} onChange={onChange} autoComplete="off" />
        </ShopInformation>
        <ShopInformation>
          <span>카테고리 : </span>
          <select name="category" value={form.category} onChange={onChange}>
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
          <span>음식 카테고리 : </span>
          <select name="foodCategory" value={form.foodCategory} onChange={onChange} multiple>
            <option value={FoodCategory.Rice}>{foodCategoryEnumToString(FoodCategory.Rice)}</option>
            <option value={FoodCategory.Bread}>{foodCategoryEnumToString(FoodCategory.Bread)}</option>
            <option value={FoodCategory.Noodle}>{foodCategoryEnumToString(FoodCategory.Noodle)}</option>
            <option value={FoodCategory.Meat}>{foodCategoryEnumToString(FoodCategory.Meat)}</option>
            <option value={FoodCategory.Etc}>{foodCategoryEnumToString(FoodCategory.Etc)}</option>
          </select>
        </ShopInformation>
        <ShopInformation>
          <span>자세한 카테고리 : </span>
          <select name="detailFoodCategory" value={form.detailFoodCategory} onChange={onChange} multiple>
            {Object.values(DetailFoodCategory)
              .filter((category) => category !== DetailFoodCategory.Empty)
              .map((category) => (
                <option value={category}>{detailFoodCategoryToString(category)}</option>
              ))}
          </select>
        </ShopInformation>
        <ShopInformation>
          <span>전화번호 : </span>
          <input name="contact" value={form.contact} onChange={onChange} autoComplete="off" />
        </ShopInformation>
        <ShopInformation>
          <span>오픈 : </span>
          <input name="open" value={form.open} onChange={onChange} autoComplete="off" />
        </ShopInformation>
        <ShopInformation>
          <span>클로즈 : </span>
          <input name="closed" value={form.closed} onChange={onChange} autoComplete="off" />
        </ShopInformation>
        <ButtonGroup rightAlign direction="row" gap="30px">
          <Button theme="red">적용</Button>
        </ButtonGroup>
      </ShopInformationContainer>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button theme="text" onClick={deleteShop}>
          가게 삭제
        </Button>
      </div>
    </>
  );
}

export default AdminShopInformation;
