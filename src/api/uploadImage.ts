import axios from 'axios';
import { apiLink } from '../lib/getAPILink';

export interface ImageUploadResponseInterface {
  locations: string[];
}

export async function imageUpload(shopId: string, files: FileList) {
  const formData = new FormData();

  for (let index = 0; index < files.length; index++) {
    const file = files.item(index);
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
  });
  console.log(response.data);
  return response.data;
}
