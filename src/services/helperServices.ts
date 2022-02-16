import { getCookie as typeScriptGetCookie, setCookie as typeScriptSetCookie } from 'typescript-cookie';

export const helperServices = () => {
  const getCookie = (name: string) => {
    return typeScriptGetCookie(name);
  };

  const setCookie = (name: string, value: string, expires: any) => {
    if (value) {
      typeScriptSetCookie(name, value, { expires: expires / 3600 });
    }
  };

  const getTenant = () => {
    let tenant = window.location.host.split('.')[0];
    if (tenant === 'demo-v3') {
      tenant = 'hosco';
    }
    return tenant;
  };

  return { getCookie, getTenant, setCookie };
};
