import { privateAxios } from './axios/privateAxios';

export const authServices = () => {
  const checkTenant = async (domain: string) => {
    const { data } = await privateAxios.get(`/tenant/tenant/${domain}?app_type=${process.env.REACT_APP_APP_TYPE}`);
    return data;
  };

  const getUserInfo = async () => {
    const { data } = await privateAxios.get('/user/me');
    return data;
  };

  return { checkTenant, getUserInfo };
};
