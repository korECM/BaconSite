import styled from 'styled-components';
import React from 'react';
import { ShopUIInterface } from '../../modules/detail';
import { MdPhone, MdLocationOn, MdRestaurantMenu, MdBusiness, MdAccessTime } from 'react-icons/md';
import palette from '../../styles/palette';
import ShopInformationElement from './ShopInformationElement';
import { categoryToString, locationToString } from '../../lib/shopUtil';

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
      tag: <span>{shop.address}</span>,
    },
    {
      data: shop.category,
      icon: <MdRestaurantMenu />,
      tag: <span>{categoryToString(shop.category)}</span>,
    },
    {
      data: shop.open,
      icon: <MdAccessTime />,
      tag: (
        <div className="time">
          <span>{shop.open}</span>
          {shop.closed && <span>{shop.closed}</span>}
        </div>
      ),
    },
    {
      data: shop.location,
      icon: <MdBusiness />,
      tag: <span>{locationToString(shop.location)}</span>,
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
