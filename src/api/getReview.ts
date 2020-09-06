import axios from 'axios';
import { apiLink } from '../lib/getAPILink';

export interface ReviewInterface {
  _id: string;
  user: User;
  comment: string;
  score: number;
  registerDate: Date;
  didLike: boolean;
  likeNum: number;
}

export interface User {
  _id: string;
  name: string;
}

export interface CheckTodayReviewResponseInterface {
  message: string;
}

export async function getReview(reviewId: string) {
  const response = await axios.get<ReviewInterface[]>(apiLink() + `/shop/review/${reviewId}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getMyReview() {
  const response = await axios.get<ReviewInterface[]>(apiLink() + `/shop/myReview`, {
    withCredentials: true,
  });
  return response.data;
}

export async function checkTodayReviewAvailableAPI(shopId: string) {
  const response = await axios.get<CheckTodayReviewResponseInterface[]>(apiLink() + `/shop/review/checkToday/` + shopId, {
    withCredentials: true,
  });
  return response.data;
}
