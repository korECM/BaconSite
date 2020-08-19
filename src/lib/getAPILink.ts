export const apiLink = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:8001' : 'https://api.caufooding.com';
};
