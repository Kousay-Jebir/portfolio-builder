import { axiosMain } from '../axios';

export const getConnectedUser = async () => {
  try {
    const res = await axiosMain.get('/user');
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createProfile = async (profileData: any) => {
  try {
    const res = await axiosMain.post('/user/profile', profileData,{ headers: {
        'Content-Type': 'multipart/form-data',
      },});
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getSubscriptionState = async (userId:string) => {
  try {
    const res = await axiosMain.get(`/user/${userId}/subscription`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getProfile = async () => {
  try {
    const res = await axiosMain.get(`/user/profile`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
