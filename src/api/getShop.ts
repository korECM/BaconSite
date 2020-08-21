import axios from 'axios';
import { apiLink } from '../lib/getAPILink';

export enum ShopCategory {
  Korean = 'korean',
  Japanese = 'japanese',
  Chinese = 'chinese',
  Western = 'western',
  Fusion = 'fusion',
  School = 'school',
  other = 'other',
}

export enum Location {
  Front = 'front',
  Back = 'back',
  HsStation = 'hs_station',
  FrontFar = 'front_far',
}

export interface ShopInterface {
  _id: string;
  shopImage: Image[];
  menuImage: Image[];
  menus: Menu[];
  name: string;
  contact: string;
  address: string;
  category: ShopCategory;
  keyword: Keyword;
  open: string;
  closed: string;
  location: Location;
  latitude: number;
  longitude: number;
  registerDate: string;
  scoreAverage: number;
  reviewCount: number;
  likerCount: number;
  didLike: boolean;
}

export interface Menu {
  _id: string;
  title: string;
  price: number;
}

export interface Image {
  _id: string;
  imageLink: string;
}

export interface Keyword {
  atmosphere: number;
  costRatio: number;
  group: number;
  individual: number;
  riceAppointment: number;
  spicy: number;
}

export async function getShop(shopId: string) {
  const response = await axios.get<ShopInterface>(apiLink() + `/shop/${shopId}`, {
    withCredentials: true,
  });
  return response.data;
}
