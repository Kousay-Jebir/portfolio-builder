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

export const createProfile = async (profileData: {
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  status: string;
  contacts: object;
  socialLinks: object;
  file: any;
}) => {
  try {
    const res = await axiosMain.post('/user/profile', profileData);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
