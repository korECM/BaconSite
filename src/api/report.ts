import axios from 'axios';
import { apiLink } from '../lib/getAPILink';

export interface ReportInterface {
  message: string;
}

export interface ReportShopInterface {
  type: boolean[];
  comment: string;
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
  comment: string;
  type: number[];
  shopId: string;
  userId: string;
  registerDate: Date;
  state: ShopReportState;
}

export interface ReviewReportResponse {
  comment: string;
  reviewId: string;
  userId: string;
  registerDate: Date;
  state: ReviewReportState;
}

export interface ImageReportResponse {
  imageId: string;
  userId: string;
  registerDate: Date;
  state: ImageReportState;
}

export async function getShopReportAPI() {
  const response = await axios.get<ShopReportResponse>(apiLink() + `/report/shop`, {
    withCredentials: true,
  });
  return response.data;
}
export async function getReviewReportAPI() {
  const response = await axios.get<ReviewReportResponse>(apiLink() + `/report/review`, {
    withCredentials: true,
  });
  return response.data;
}
export async function getImageReportAPI() {
  const response = await axios.get<ImageReportResponse>(apiLink() + `/report/image`, {
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
