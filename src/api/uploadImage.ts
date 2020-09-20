import axios from 'axios';
import { apiLink } from '../lib/getAPILink';

export interface ImageUploadResponseInterface {
  locations: string[];
}

export async function shopImageUpload(shopId: string, files: (File | Blob)[]) {
  const formData = new FormData();

  for (let index = 0; index < files.length; index++) {
    // const file = files.item(index);
    const file = files[index];
    if (file) formData.append('imgFile', file);
  }

  const response = await axios({
    method: 'post',
    url: apiLink() + '/shop/image/' + shopId,
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
}

export async function menuImageUpload(shopId: string, files: (File | Blob)[]) {
  const formData = new FormData();

  for (let index = 0; index < files.length; index++) {
    // const file = files.item(index);
    const file = files[index];
    if (file) formData.append('imgFile', file);
  }

  const response = await axios({
    method: 'post',
    url: apiLink() + '/shop/menuImage/' + shopId,
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
}
