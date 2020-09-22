const origin = 'd3s32mx82uelsl';
const thumbnail = 'd3h426dbn3bk90';

export const originToThumbnail = (url: string): string => {
  return url.replace(origin, thumbnail);
};
