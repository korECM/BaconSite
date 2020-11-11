import { Location, ShopCategory, Keyword, FoodCategory, DetailFoodCategory } from '../api/getShop';

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

export const foodCategoryEnumToString = (category: FoodCategory) => {
  switch (category) {
    case FoodCategory.Rice:
      return '밥';
    case FoodCategory.Bread:
      return '빵';
    case FoodCategory.Noodle:
      return '면';
    case FoodCategory.Meat:
      return '고기';
    case FoodCategory.Etc:
      return '기타';
    default:
      return '';
  }
};

export const detailFoodCategoryToString = (category: DetailFoodCategory) => {
  switch (category) {
    case DetailFoodCategory.Asian:
      return '아시안';
    case DetailFoodCategory.Bakery:
      return '빵';
    case DetailFoodCategory.Chicken:
      return '치킨';
    case DetailFoodCategory.Chinese:
      return '중식';
    case DetailFoodCategory.Empty:
      return '';
    case DetailFoodCategory.Fastfood:
      return '패스트푸드';
    case DetailFoodCategory.Japanese:
      return '일식';
    case DetailFoodCategory.Korean:
      return '한식';
    case DetailFoodCategory.Meat:
      return '고깃집';
    case DetailFoodCategory.Pig:
      return '족발・보쌈';
    case DetailFoodCategory.Pizza:
      return '피자';
    case DetailFoodCategory.School:
      return '분식';
    case DetailFoodCategory.Steamed:
      return '찜';
    case DetailFoodCategory.Stew:
      return '탕';
    case DetailFoodCategory.Western:
      return '양식';
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

export const keywordToString = (keyword: keyof Keyword) => {
  switch (keyword) {
    case 'atmosphere':
      return '분위기';
    case 'costRatio':
      return '가성비';
    case 'group':
      return '단체';
    case 'individual':
      return '혼밥';
    case 'riceAppointment':
      return '밥약';
    // case 'spicy':
    //   return '매워요';
  }
};

export const foodCategoryToString = (category: FoodCategory, withPostFix: boolean = false): string => {
  switch (category) {
    case FoodCategory.Bread:
      return withPostFix ? '빵을' : '빵';
    case FoodCategory.Meat:
      return withPostFix ? '고기를' : '고기';
    case FoodCategory.Noodle:
      return withPostFix ? '면을' : '면';
    case FoodCategory.Rice:
      return withPostFix ? '밥을' : '밥';
    case FoodCategory.Etc:
      return withPostFix ? '그 외 기타를' : '그 외 기타';
    default:
      return '';
  }
};
