import moment from 'moment';
import { getCookie as typeScriptGetCookie, setCookie as typeScriptSetCookie, removeCookie as typeScriptRemoveCookie } from 'typescript-cookie';

const formatTime = (time: any) => {
  return moment(time).format('YYYY-MM-DD');
};

const addDay = (time: any, day: any) => {
  return moment(time).add(day, 'days').format('YYYY-MM-DD');
};

const subtractDay = (time: any, day: any) => {
  return moment(time).subtract(day, 'days').format('YYYY-MM-DD');
};

const getQuarterRange = (quarter: any) => {
  const start = moment().quarter(quarter).startOf('quarter').format('YYYY-MM-DD');
  const end = moment().quarter(quarter).endOf('quarter').format('YYYY-MM-DD');
  return { start, end };
};

const today = new Date();
const currentQuarter = moment().quarter();

export const helperService = () => {
  const getCookie = (name: string) => {
    return typeScriptGetCookie(name);
  };

  const setCookie = (name: string, value: string, expires: any) => {
    if (value) {
      typeScriptSetCookie(name, value, { expires: expires, path: '/' });
    }
  };

  const removeCookie = (name: string, path = '/') => {
    typeScriptRemoveCookie(name, { path: path });
  };

  const getTenant = () => {
    let tenant = window.location.host.split('.')[0];
    if (tenant === 'demo-v3') {
      tenant = 'hosco';
    }
    return tenant;
  };

  const findValueById = (id: any, data: any, keyId = 'id') => {
    if (!data || data.length === 0) {
      return null;
    }
    return data.find((item: any) => item[keyId] === id);
  };

  const getFilterStateTime = (time: any) => {
    if (time.type === 1) {
      const { from, to } = time.value;
      return {
        from: moment(from).format('YYYY-MM-DD'),
        to: moment(to).format('YYYY-MM-DD')
      };
    } else {
      const { value } = time;
      if (value === 11) {
        return {
          from: formatTime(today),
          to: formatTime(today)
        };
      } else if (value === 12) {
        return {
          from: subtractDay(today, 1),
          to: subtractDay(today, 1)
        };
      } else if (value === 21) {
        const diff = today.getDay();
        if (diff === 0) {
          return {
            from: subtractDay(today, 6),
            to: formatTime(today)
          };
        } else {
          return {
            from: subtractDay(today, diff - 1),
            to: addDay(today, 7 - diff)
          };
        }
      } else if (value === 22) {
        const diff = today.getDay();
        if (diff === 0) {
          return {
            from: subtractDay(today, 13),
            to: subtractDay(today, 6)
          };
        } else {
          return {
            from: subtractDay(today, 6 + diff),
            to: subtractDay(today, diff)
          };
        }
      } else if (value === 23) {
        return {
          from: subtractDay(today, 7),
          to: formatTime(today)
        };
      } else if (value === 31) {
        return {
          from: formatTime(new Date(today.getFullYear(), today.getMonth(), 1)),
          to: formatTime(new Date(today.getFullYear(), today.getMonth() + 1, 0))
        };
      } else if (value === 32) {
        return {
          from: formatTime(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
          to: formatTime(new Date(today.getFullYear(), today.getMonth(), 0))
        };
      } else if (value === 33) {
        return {
          from: moment(today).subtract(1, 'month').format('YYYY-MM-DD'),
          to: formatTime(today)
        };
      } else if (value === 41) {
        return {
          from: getQuarterRange(currentQuarter).start,
          to: getQuarterRange(currentQuarter).end
        };
      } else if (value === 42) {
        return {
          from: getQuarterRange(currentQuarter - 1).start,
          to: getQuarterRange(currentQuarter - 1).end
        };
      } else if (value === 51) {
        return {
          from: formatTime(new Date(new Date().getFullYear(), 0, 1)),
          to: formatTime(new Date(new Date().getFullYear(), 11, 31))
        };
      } else if (value === 52) {
        return {
          from: formatTime(new Date(new Date().getFullYear() - 1, 0, 1)),
          to: formatTime(new Date(new Date().getFullYear() - 1, 11, 31))
        };
      } else {
        return {
          from: '',
          to: ''
        };
      }
    }
  };

  return { getCookie, getTenant, setCookie, removeCookie, findValueById, getFilterStateTime };
};
