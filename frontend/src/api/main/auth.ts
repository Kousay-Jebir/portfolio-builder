import axios from 'axios';
import { axiosMain } from '../axios';

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  axiosMain
    .post('/auth/register', userData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const login = async (userCredentials: {
  email: string;
  password: string;
}) => {
  axiosMain
    .post('/auth/login', userCredentials)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const loginWithGoogle = async ()=>{
    axiosMain.get('/auth/google').then((res)=>{return res.data} ).catch((err)=>{console.log(err);
        throw err
    })
}