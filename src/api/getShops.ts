import axios from 'axios';
import { apiLink } from '../lib/getAPILink';
import { Location, ShopCategory } from './getShop';

export interface ShopsInterface {
  _id: string;
  image: string[];
  name: string;
  contact: string;
  address: string;
  category: string;
  keyword: string;
  open: string;
  closed: string;
  location: string;
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
  locations?: Location[];
  categories?: ShopCategory[];
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
