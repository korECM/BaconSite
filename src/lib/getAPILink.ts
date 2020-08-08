export const apiLink = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:8001' : 'http://3.35.10.78';
};
