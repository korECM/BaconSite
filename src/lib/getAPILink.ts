export const apiLink = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:8001' : 'http://13.209.7.44';
};
