import { ACCESS_TOKEN } from 'constants/localStorage';

import axios from 'axios';
import { toast } from 'react-toastify';

import { helperService } from '../helperService';

export const privateAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60000
});

privateAxios.interceptors.request.use(configs => {
  const token = helperService().getCookie(ACCESS_TOKEN);
  if (token && typeof configs.headers === 'object') {
    configs.headers.Authorization = `Bearer ${token}`;
  }
  return configs;
},
error => {
  toast.error(error);
  return Promise.reject(error);
});

privateAxios.interceptors.response.use(response => {
  return response;
},
error => {
  if (error.response?.status === 401) {
    toast.error(error);
    helperService().removeCookie(ACCESS_TOKEN);
    window.location.replace('/auth/login');
  }
  return Promise.reject(error);
});
