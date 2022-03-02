import { privateAxios } from 'services/axios/privateAxios';

interface getListProps {
  page?: number,
  pageLimit?: number,
  fromDate?: string,
  toDate?: string
}

export const leadService = () => {
  const getList = async ({
    page, pageLimit,
    fromDate = '',
    toDate = ''
  }: getListProps) => {
    const query = `page=${page}&pageLimit=${pageLimit}` +
                  `&from_date=${fromDate}&to_date=${toDate}`;
    const { data } = await privateAxios.get('/contact/contact/?' + query);
    return {
      ...data,
      data: data.data.map((d: any) => {
        return {
          ...d,
          checked: false,
          expanded: false
        };
      })
    };
  };

  const getItem = async (id: number) => {
    const { data } = await privateAxios.get(`/contact/contact/${id}`);
    return data.data;
  };

  const createItem = async (params: any) => {
    const { data } = await privateAxios.post('/contact/contact', { ...params });
    return data;
  };

  const editItem = async (params: any) => {
    const { id, makeValue } = params;
    const { data } = await privateAxios.put(`/contact/contact/${id}`, { ...makeValue });
    return data;
  };

  const deleteItem = async (id: number) => {
    const { data } = await privateAxios.delete(`/contact/contact/${id}`);
    return data.meta;
  };

  return { getList, getItem, createItem, editItem, deleteItem };
};
