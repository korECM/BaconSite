import axios from 'axios';
import { apiLink } from '../lib/getAPILink';

export interface ReportInterface {
  message: string;
}

export interface ReportShopInterface {
  type: boolean[];
  comment: string;
}
export interface ShopID {
  foodCategory: string[];
  _id: string;
  name: string;
  mainImage: string;
  contact: string;
  address: string;
  category: string;
  open: string;
  closed: string;
  location: string;
  keyword: string;
  latitude: number;
  longitude: number;
  price: number;
  registerDate: string;
}

export enum ShopReportState {
  Issued = 'issued',
  Confirmed = 'confirmed',
  Rejected = 'rejected',
  Done = 'done',
}
export enum ReviewReportState {
  Issued = 'issued',
  Rejected = 'rejected',
  Done = 'done',
}

export enum ImageReportState {
  Issued = 'issued',
  Rejected = 'rejected',
  Done = 'done',
}

export interface ShopReportResponse {
  _id: string;
  comment: string;
  type: number[];
  shopId: ShopID;
  userId: string;
  registerDate: Date;
  state: ShopReportState;
}

export interface ReviewReportResponse {
  _id: string;
  comment: string;
  reviewId: ReviewID;
  userId: UserID;
  registerDate: Date;
  state: ReviewReportState;
}

export interface ImageReportResponse {
  _id: string;
  imageId: ImageID;
  userId: string;
  registerDate: Date;
  state: ImageReportState;
}

export interface ImageID {
  _id: string;
  imageLink: string;
  shopId: ShopID;
  type: string;
  registerDate: string;
  __v: number;
}

export interface ShopID {
  _id: string;
  name: string;
}

export interface ReviewID {
  like: any[];
  _id: string;
  user: User;
  shop: string;
  comment: string;
  registerDate: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
}

export interface UserID {
  likeShop: any[];
  _id: string;
  name: string;
  email: string;
  provider: string;
  gender: string;
  snsId: string;
  isAdmin: boolean;
  kakaoNameSet: boolean;
  registerDate: string;
  __v: number;
}

export async function getShopReportAPI() {
  const response = await axios.get<ShopReportResponse[]>(apiLink() + `/report/shop`, {
    withCredentials: true,
  });
  return response.data;
}
export async function getReviewReportAPI() {
  const response = await axios.get<ReviewReportResponse[]>(apiLink() + `/report/review`, {
    withCredentials: true,
  });
  return response.data;
}
export async function getImageReportAPI() {
  const response = await axios.get<ImageReportResponse[]>(apiLink() + `/report/image`, {
    withCredentials: true,
  });
  return response.data;
}

export async function reportShopAPI(shopId: string, data: ReportShopInterface) {
  const response = await axios.post<ReportInterface>(
    apiLink() + `/report/shop/${shopId}`,
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

export async function reportReviewAPI(reviewId: string, comment: string) {
  const response = await axios.post<ReportInterface>(
    apiLink() + `/report/review/${reviewId}`,
    {
      comment,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function reportImageAPI(imageId: string) {
  const response = await axios.post<ReportInterface>(
    apiLink() + `/report/image/${imageId}`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export interface MyReportResponse {
  title: string;
  text: string;
  registerDate: string;
  state: string;
}

export async function getMyReport() {
  const response = await axios.get<MyReportResponse[]>(apiLink() + `/report/my`, {
    withCredentials: true,
  });
  return response.data;
}
