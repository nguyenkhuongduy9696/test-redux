import axios from 'axios';

import { ACCESS_TOKEN } from '../../constants/localStorage';
import { helperServices } from '../helperServices';

export const privateAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60000
});

privateAxios.interceptors.request.use(configs => {
  const token = helperServices().getCookie(ACCESS_TOKEN);
  if (token && typeof configs.headers === 'object') {
    configs.headers.Authorization = `Bearer ${token}`;
  }
  return configs;
},
error => {
  console.log('Request error' + error);
  // return Promise.reject(error);
});

privateAxios.interceptors.response.use(response => {
  return response;
},
error => {
  console.log('Reponse error' + error);
});
