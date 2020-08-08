import styled from 'styled-components';
import React from 'react';
import { ShopUIInterface } from '../../modules/detail';
import { MdPhone, MdLocationOn, MdRestaurantMenu, MdBusiness } from 'react-icons/md';
import palette from '../../styles/palette';

const ShopInformationContainer = styled.div`
  font-weight: 100;
  font-size: 14px;
  color: ${palette.middleGray};
`;

const ShopInformationBlock = styled.div`
  display: flex;
  margin: 20px 0;
  a {
    margin-left: 10px;
  }
`;

interface ShopInformationProps {
  shop: ShopUIInterface;
}

function ShopInformation({ shop }: ShopInformationProps) {
  return (
    <ShopInformationContainer>
      {shop.contact && (
        <ShopInformationBlock>
          <MdPhone />
          <a href={`tel:${shop.contact}`}>{shop.contact}</a>
        </ShopInformationBlock>
      )}
      {shop.address && (
        <ShopInformationBlock>
          <MdLocationOn />
          <a>{shop.address}</a>
        </ShopInformationBlock>
      )}
      {shop.category && (
        <ShopInformationBlock>
          <MdRestaurantMenu />
          <a>{shop.category}</a>
        </ShopInformationBlock>
      )}
      {shop.location && (
        <ShopInformationBlock>
          <MdBusiness />
          <a>{shop.location}</a>
        </ShopInformationBlock>
      )}
    </ShopInformationContainer>
  );
}

export default ShopInformation;
