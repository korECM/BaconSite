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
  span {
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
          <span>{shop.contact}</span>
        </ShopInformationBlock>
      )}
      {shop.address && (
        <ShopInformationBlock>
          <MdLocationOn />
          <span>{shop.address}</span>
        </ShopInformationBlock>
      )}
      {shop.category && (
        <ShopInformationBlock>
          <MdRestaurantMenu />
          <span>{shop.category}</span>
        </ShopInformationBlock>
      )}
      {shop.location && (
        <ShopInformationBlock>
          <MdBusiness />
          <span>{shop.location}</span>
        </ShopInformationBlock>
      )}
    </ShopInformationContainer>
  );
}

export default ShopInformation;
