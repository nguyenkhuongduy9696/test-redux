import { getCookie as typeScriptGetCookie } from 'typescript-cookie';

export const helperServices = () => {
  const getCookie = (name: string) => {
    return typeScriptGetCookie(name);
  };

  const getTenant = () => {
    let tenant = window.location.host.split('.')[0];
    if (tenant === 'demo-v3') {
      tenant = 'hosco';
    }
    return tenant;
  };

  return { getCookie, getTenant };
};
