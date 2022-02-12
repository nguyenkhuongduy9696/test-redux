import axios from 'axios';

interface headerItems {
  type: string,
  value: string
}

export const commonAxios = (headers = [], base_url = '', response_headers = []) => {
  const connect = axios.create({
    baseURL: base_url,
    timeout: 60000
  });
  connect.interceptors.request.use((config) => {
    headers.forEach((item: headerItems) => {
      if (typeof config.headers === 'object') {
        config.headers[item.type] = item.value;
      }
    });
    return config;
  },
  error => {
    console.log('Request error' + error);
    // return Promise.reject(error);
  });

  connect.interceptors.response.use((response) => {
    response_headers.forEach((item: headerItems) => {
      response.headers[item.type] = item.value;
    });
    return response;
  },
  error => {
    console.log('Reponse error' + error);
  });
  return connect;
};
