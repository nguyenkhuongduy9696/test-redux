import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormContext } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { commonService } from '../services/commonService';
import { helperService } from '../services/helperService';
import Loader from './Loader';

interface propTypes {
  name?: any,
  data?: any
}

const fileTypes = ['png', 'jpg', 'jpeg'];

const UploadImage = React.memo(({
  name = 'avatar', data
}: propTypes) => {
  const methods = useFormContext();
  const { register } = methods;
  const [image, setImage] = useState('');
  const uploadMutation = useMutation(image => commonService().uploadImage(image));

  const onClickButton = (event: React.MouseEvent<HTMLInputElement>) => {
    (event.target as HTMLInputElement).value = '';
  };

  const handleChooseFile = async (event: any) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file !== undefined) {
      const fileType = file.name.split('.')[file.name.split('.').length - 1];
      if (fileTypes.includes(fileType.toLowerCase())) {
        let img = '';
        await helperService().uploadImageBase64(file).then(async (res: any) => {
          await uploadMutation.mutateAsync(res, {
            onSuccess: async (response) => {
              img = response.cdn_image;
            },
            onError: () => {
              toast.error('Lưu ảnh lên máy chủ thất bại, vui lòng thử lại sau');
            }
          });
        });
        await setImage(img);
      } else {
        toast.error('Mời bạn chọn đúng file ảnh');
      }
    } else {
      setImage('');
    }
  };

  useEffect(() => {
    if (data) {
      setImage(data);
    }
  }, [data]);

  return (
    <div className="w-full">
      <div className={ `w-48 h-48 mx-auto ${image ? '' : 'border-2'} k-border-dashed rounded-md relative flex items-center justify-center` }>
        <input type="hidden" { ...register(name) } defaultValue={ image }/>
        {
          !uploadMutation.isLoading &&
          <input className="w-full opacity-0 absolute left-0 top-0 h-full cursor-pointer"
            onChange={ handleChooseFile }
            onClick={ onClickButton }
            type={ 'file' } title=''
          />
        }
        {

        }
        {
          uploadMutation.isLoading
            ? <>
              <div className="flex flex-col items-center">
                <Loader />
                <p className='animate-bounce font-bold'>Đang tải ảnh lên</p>
              </div>
            </>
            : !image
              ? <>
                <div className="flex flex-col items-center">
                  <span className='mb-2'><FontAwesomeIcon icon='images' size='2x' /></span>
                  <p className='font-bold'>Tải ảnh lên</p>
                </div>
              </>
              : <>
                <img src={ image } alt="" className='w-full h-full rounded-md'/>
              </>
        }
      </div>
    </div>
  );
});

export default UploadImage;
