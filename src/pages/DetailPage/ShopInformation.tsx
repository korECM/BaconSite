import styled from 'styled-components';
import React from 'react';
import { ShopUIInterface } from '../../modules/detail';
import { MdPhone, MdLocationOn, MdRestaurantMenu, MdBusiness } from 'react-icons/md';
import palette from '../../styles/palette';
import ShopInformationElement from './ShopInformationElement';

const ShopInformationContainer = styled.div`
  font-weight: 100;
  font-size: 14px;
  color: ${palette.middleGray};
`;

interface ShopInformationProps {
  shop: ShopUIInterface;
}

function ShopInformation({ shop }: ShopInformationProps) {
  const dataList = [
    {
      data: shop.contact,
      icon: <MdPhone />,
      tag: <a href={`tel:${shop.contact}`}>{shop.contact}</a>,
    },
    {
      data: shop.address,
      icon: <MdLocationOn />,
      tag: <a>{shop.address}</a>,
    },
    {
      data: shop.category,
      icon: <MdRestaurantMenu />,
      tag: <a>{shop.category}</a>,
    },
    {
      data: shop.location,
      icon: <MdBusiness />,
      tag: <a>{shop.location}</a>,
    },
  ].filter((e) => e.data);

  return (
    <ShopInformationContainer>
      {dataList.map((content, index) => (
        <ShopInformationElement key={content.data} content={content} index={index} />
      ))}
    </ShopInformationContainer>
  );
}

export default ShopInformation;
