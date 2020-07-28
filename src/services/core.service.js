import axios from 'utils/axiosInstance';

export const listFiles = async id => {
  const files = await (await axios.get(`/folders/${id}`)).data;

  return files;
};

export const download = async (localPath, drivePath) => {
  const files = await (
    await axios.get(`/download?localPath=${localPath}&drivePath=${drivePath}`)
  ).data;

  return files;
};

export const getFolders = async () => {
  return (await axios.get('/folders')).data;
};

export const getFolder = async id => {
  return (await axios.get(`/folders/${id}`)).data;
};

export const deleteFolder = async id => {
  return (await axios.delete(`/folders/${id}`)).data;
};

export const autoSyncFolder = async id => {
  await axios.post(`/folders/${id}/autoSync`);
};

export const saveFolder = async folder => {
  return (await axios.put('/folders', { ...folder })).data;
};
