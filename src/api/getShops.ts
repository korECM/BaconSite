import axios from 'axios';
import { apiLink } from '../lib/getAPILink';
import { Location, ShopCategory, Keyword } from './getShop';

export interface ShopsInterface {
  _id: string;
  shopImage: string[];
  name: string;
  contact: string;
  address: string;
  category: string;
  keyword: Keyword;
  open: string;
  closed: string;
  location: Location;
  latitude: number;
  longitude: number;
  registerDate: Date;
  price: number;
  menuImage: string[];
  scoreAverage: number;
  reviewCount: number;
  likerCount: number;
}

export interface getShopsInterface {
  locations?: string[];
  categories?: string[];
}

export async function getShops(options: getShopsInterface) {
  const response = await axios.get<ShopsInterface[]>(
    apiLink() +
      `/shop/?location=${options.locations ? `${options.locations.join(',')}` : ''}&category=${options.categories ? options.categories.join(',') : ''}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
}
