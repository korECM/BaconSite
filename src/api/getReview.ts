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

export async function getReview(reviewId: string) {
  const response = await axios.get<ReviewInterface>(apiLink() + `/shop/review/${reviewId}`, {
    withCredentials: true,
  });
  return response.data;
}
