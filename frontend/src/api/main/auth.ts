import axios from 'axios';
import { axiosMain } from '../axios';

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await axiosMain.post('/auth/register', userData);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const login = async (userCredentials: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axiosMain.post('/auth/login', userCredentials);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loginWithGoogle = async () => {
  try {
    const res = await axiosMain.get('/auth/google');
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}