import axios, { AxiosResponse } from 'axios';
import { apiLink } from '../lib/getAPILink';
import { Location, Keyword, FoodCategory } from './getShop';

export interface ShopsInterface {
  _id: string;
  mainImage: string;
  shopImage: Image[];
  name: string;
  contact: string;
  address: string;
  category: string;
  foodCategory: FoodCategory[];
  keyword: Keyword;
  open: string;
  closed: string;
  location: Location;
  latitude: number;
  longitude: number;
  registerDate: Date;
  price: number;
  menuImage: Image[];
  topKeyword: KeywordElement[];
  scoreAverage: number;
  likerCount: number;
}

type KeywordElement = keyof Keyword;

export interface getShopsInterface {
  order?: string;
  location?: string;
  category?: string;
  foodCategory?: string;
  detailCategory?: string;
  price?: string;
  keyword?: string;
  name?: string;
}

// Generated by https://quicktype.io

export interface Image {
  _id: string;
  imageLink: string;
}

export async function getShops(options: getShopsInterface, isDetail?: boolean) {
  let response: AxiosResponse<ShopsInterface[]>;
  if (isDetail) {
    response = await axios.get<ShopsInterface[]>(apiLink() + `/shop/detailCategory?detailCategory=${options.detailCategory || ''}`, {
      withCredentials: true,
    });
  } else {
    response = await axios.get<ShopsInterface[]>(
      apiLink() +
        `/shop/?location=${options.location || ''}&order=${options.order || ''}&category=${options.category || ''}&foodCategory=${
          options.foodCategory || ''
        }&price=${options.price || ''}&keyword=${options.keyword || ''}&name=${options.name || ''}`,
      {
        withCredentials: true,
      },
    );
  }
  return response.data;
}

export async function getMyShops() {
  const response = await axios.get<ShopsInterface[]>(apiLink() + `/shop/myShop`, {
    withCredentials: true,
  });
  return response.data;
}
