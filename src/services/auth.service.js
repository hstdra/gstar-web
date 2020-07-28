import axios from 'utils/axiosInstance';

const getUserInfo = async () => {
  const user = await axios.get('auth/profile');

  return user.data;
};

const getAuthUrl = async () => {
  const auth = await axios.get('/authUrl');

  return auth.data.url;
};

const logout = async () => {
  localStorage.clear();

  await axios.get('/auth/logout');
};

export default {
  getUserInfo,
  getAuthUrl,
  logout
};
