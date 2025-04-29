import axios from 'axios';

const createAxiosInstance = (baseURL : string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  // Add shared interceptors
  instance.interceptors.request.use((config) => {
    // You can add any global config here, e.g., logging, CSRF, etc.
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
