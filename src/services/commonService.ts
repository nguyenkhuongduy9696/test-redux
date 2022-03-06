import { privateAxios } from './axios/privateAxios';

export const commonService = () => {
  const generateCode = async (tableName: string, columnName: string, prefix = '', defaults = '') => {
    const params = {
      tableName: tableName,
      columnName: columnName,
      prefix: prefix,
      default: defaults

    };
    const { data } = await privateAxios.post('/common/gencode', { ...params });
    return data.data;
  };

  const uploadImage = async (image: any) => {
    const { data } = await privateAxios.post('/upload/image-upload-base64',
      {
        image_base64: image
      }
    );
    return data;
  };

  return { generateCode, uploadImage };
};
