import axios from 'axios';
import { apiLink } from '../lib/getAPILink';

export interface ReportInterface {
  message: string;
}

export interface ReportShopInterface {
  type: boolean[];
  comment: string;
}

export async function reportShopAPI(shopId: string, data: ReportShopInterface) {
  const response = await axios.post<ReportInterface>(
    apiLink() + `/shop/report/${shopId}`,
    {
      type: data.type.map((t, i) => (t ? i : -1)).filter((t) => t >= 0),
      comment: data.comment,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function reportReviewAPI(reviewId: string) {
  const response = await axios.post<ReportInterface>(
    apiLink() + `/shop/review/report/${reviewId}`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
}
