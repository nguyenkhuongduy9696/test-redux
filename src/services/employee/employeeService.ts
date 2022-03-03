import { privateAxios } from '../axios/privateAxios';

export const employeeService = () => {
  const getDropdown = async (type = 'all', enable = 1) => {
    const { data } = await privateAxios.get(`/employee/combobox/${type}?enable=${enable}`);
    return data.data;
  };

  return { getDropdown };
};
