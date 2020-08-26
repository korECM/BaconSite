import React, { useEffect, useState, useCallback, Dispatch } from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import { locationToString, categoryToString } from '../../lib/shopUtil';
import { ShopCategory, Location } from '../../api/getShop';
import Button from '../../components/common/Button';
import ButtonGroup from '../../components/common/ButtonGroup';
import { ShopUIInterface } from '../../modules/detail';
import axios from 'axios';
import { apiLink } from '../../lib/getAPILink';
import palette from '../../styles/palette';

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

interface AdminShopInformationProps {
  shop: ShopUIInterface;
  reload: () => any;
}

function AdminShopInformation({ shop, reload }: AdminShopInformationProps) {
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

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const updateData = async () => {
        await axios.put(`${apiLink()}/shop/${shop._id}`, form, {
          withCredentials: true,
        });
        reload();
      };
      updateData();
    },
    [form, shop, reload],
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    },
    [form],
  );

  useEffect(() => {
    setForm({
      name: shop.name,
      address: shop.address,
      location: shop.location,
      latitude: shop.latitude,
      longitude: shop.longitude,
      category: shop.category,
      contact: shop.contact,
      open: shop.open,
      closed: shop.closed,
    });
  }, [shop]);

  return (
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
        <select value={form.location} name="location" onChange={onChange}>
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
  );
}

export default AdminShopInformation;
