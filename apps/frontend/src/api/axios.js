import axios from 'axios';

const axiosMain = axios.create({
  baseURL: '/api/main',
  withCredentials: true,
});

const axiosBuilder = axios.create({
  baseURL: '/api/builder',
  withCredentials: true,
});

const axiosConsult = axios.create({
  baseURL: '/api/consult',
  withCredentials: true,
});

export { axiosMain, axiosBuilder, axiosConsult };
