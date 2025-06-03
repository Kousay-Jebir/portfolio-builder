import axios from 'axios';
import Cookies from 'js-cookie';

const createAxiosInstance = (baseURL : string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
    
  }, (error) => {
    return Promise.reject(error);
  });

  return instance;
};


const axiosMain = createAxiosInstance('/api/main');
const axiosBuilder = createAxiosInstance('/api/builder');
const axiosConsult = createAxiosInstance('/api/consulting');

export { axiosMain, axiosBuilder, axiosConsult };
