import axios from 'axios';
import { apiLink } from '../lib/getAPILink';

export interface LikeCommentInterface {
  message: string;
}

export async function likeCommentAPI(commentId: string) {
  const response = await axios.post<LikeCommentInterface>(
    apiLink() + `/shop/like/review/${commentId}`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function unlikeCommentAPI(commentId: string) {
  const response = await axios.post<LikeCommentInterface>(
    apiLink() + `/shop/unlike/review/${commentId}`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
}
