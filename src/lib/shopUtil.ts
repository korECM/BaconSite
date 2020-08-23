import { Location, ShopCategory } from '../api/getShop';

export const categoryToString = (category: ShopCategory) => {
  switch (category) {
    case ShopCategory.Korean:
      return '한식';
    case ShopCategory.Japanese:
      return '일식';
    case ShopCategory.Chinese:
      return '중식';
    case ShopCategory.Western:
      return '양식';
    case ShopCategory.Fusion:
      return '퓨전';
    case ShopCategory.School:
      return '분식';
    case ShopCategory.other:
      return '기타';
    default:
      return '';
  }
};

export const locationToString = (location: Location) => {
  switch (location) {
    case Location.Front:
      return '정문 근처';
    case Location.Back:
      return '후문 근처';
    case Location.HsStation:
      return '중대 병원 근처';
    case Location.FrontFar:
      return '흑석역 근처';
    default:
      return '';
  }
};
