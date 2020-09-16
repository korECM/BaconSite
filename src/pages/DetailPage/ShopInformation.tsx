import styled from 'styled-components';
import React from 'react';
import { ShopUIInterface } from '../../modules/detail';
import { MdPhone, MdLocationOn, MdRestaurantMenu, MdBusiness, MdAccessTime } from 'react-icons/md';
import palette from '../../styles/palette';
import ShopInformationElement from './ShopInformationElement';
import { categoryToString, foodCategoryToString, locationToString } from '../../lib/shopUtil';
import { FoodCategory, ShopCategory } from 'api/getShop';

const ShopInformationContainer = styled.div`
  font-weight: 100;
  font-size: 14px;
  color: ${palette.middleGray};
`;

interface ShopInformationProps {
  shop: ShopUIInterface;
}

function shopCategoryToString(shopCategory: ShopCategory) {
  switch (shopCategory) {
    case ShopCategory.Korean:
      return '한식을';
    case ShopCategory.Japanese:
      return '일식을';
    case ShopCategory.Chinese:
      return '중식을';
    case ShopCategory.Western:
      return '양식을';
    case ShopCategory.Fusion:
      return '퓨전 음식을';
    case ShopCategory.School:
      return '분식을';
    case ShopCategory.other:
      return '기타 음식을';
    default:
      return '';
  }
}

function shopAndFoodCategoryToString(shopCategory: ShopCategory, foodCategory: FoodCategory[]): string {
  console.log(foodCategory);
  if (foodCategory.length > 0) {
    let temp = [...foodCategory];
    let last = temp.pop()!;
    let rest = temp;
    if (shopCategory === ShopCategory.other) {
      return `${rest.map((category) => foodCategoryToString(category, false)).join(', ')}, ${foodCategoryToString(last, true)} 먹을 수 있어요`;
    } else {
      return `${categoryToString(shopCategory)} 그리고 ${rest.map((category) => foodCategoryToString(category, false)).join(', ')}${
        rest.length ? ',' : ''
      } ${foodCategoryToString(last, true)} 먹을 수 있어요`;
    }
  } else {
    return `${shopCategoryToString(shopCategory)} 먹을 수 있어요`;
  }
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
      tag: <span>{shopAndFoodCategoryToString(shop.category, shop.foodCategory)}</span>,
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
