import axios from 'axios';
import Cookies from 'js-cookie';

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = Cookies.get('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

  }, (error) => {
    return Promise.reject(error);
  });

  return instance;
};

const axiosMain = createAxiosInstance('http://localhost:5000/main');
const axiosBuilder = createAxiosInstance('http://localhost:5001/builder');
const axiosConsult = createAxiosInstance('http://localhost:5002/consulting');

export { axiosMain, axiosBuilder, axiosConsult };
