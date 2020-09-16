import axios from 'axios';
import { apiLink } from '../lib/getAPILink';

export interface ReviewWriteInterface {
  message: string;
}

interface RequestInterface {
  score: string;
  comment: string;
  keywords: {
    atmosphere: boolean;
    costRatio: boolean;
    group: boolean;
    individual: boolean;
    riceAppointment: boolean;
    // spicy: boolean;
  };
}

export async function writeReviewAPI(shopId: string, data: RequestInterface) {
  const response = await axios.post<ReviewWriteInterface>(apiLink() + `/shop/review/${shopId}`, data, {
    withCredentials: true,
  });
  return response.data;
}
