import axios from 'axios';
import { apiLink } from '../lib/getAPILink';

export interface LikeInterface {
  message: string;
}

export async function likeShopAPI(shopId: string) {
  const response = await axios.post<LikeInterface>(
    apiLink() + `/shop/like/${shopId}`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function unlikeShopAPI(shopId: string) {
  const response = await axios.post<LikeInterface>(
    apiLink() + `/shop/unlike/${shopId}`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
}
