import { GENDER_RADIO } from 'constants/constants';

import React from 'react';

import { DatePicker } from '@progress/kendo-react-dateinputs';
import { RadioGroup } from '@progress/kendo-react-inputs';
import BaseInput from 'common/BaseInput';
import InputLabel from 'common/InputLabel';
import UploadImage from 'common/uploadImage/UploadImage';
import { useFormContext } from 'react-hook-form';

const InfoForm = ({ formValues } : {formValues: any}) => {
  const methods = useFormContext();
  const { register, formState: { errors } } = methods;
  const { values } = formValues;
  const { birthdate, sex } = values;

  // eslint-disable-next-line no-unused-vars
  const onChangeValue = (e: any, type: string) => {

  };

  return (
    <>
      <div className="k-dialog-body flex flex-wrap">
        <div className="w-full lg:w-1/5">
          <UploadImage />
        </div>
        <div className="w-full lg:w-4/5 flex flex-row flex-wrap">
          <div className="w-full lg:w-1/2 lg:pr-2">
            <InputLabel label='Mã Lead'>
              <BaseInput placeholder='Mã Lead tự động' errors={ errors }
                { ...register('code') }>
              </BaseInput>
            </InputLabel>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-2">
            <InputLabel label='Tên Lead'>
              <BaseInput placeholder='Nhập tên Lead' errors={ errors }
                { ...register('name', { required: true }) }>
                { errors.name?.type === 'required' && <p className='pt-1 input-error'>Tên Lead không được để trống</p> }
              </BaseInput>
            </InputLabel>
          </div>
          <div className="w-full lg:w-1/2 lg:pr-2">
            <InputLabel label='Điện thoại'>
              <BaseInput placeholder='Số điện thoại' errors={ errors }
                { ...register('mobile') }>
              </BaseInput>
            </InputLabel>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-2">
            <InputLabel label='Email'>
              <BaseInput placeholder='Email' errors={ errors }
                { ...register('email') }>
              </BaseInput>
            </InputLabel>
          </div>
          <div className="w-full lg:w-1/2 lg:pr-2">
            <InputLabel label='Ngày sinh'>
              <div className="py-1.5 mb-2">
                <DatePicker value={ birthdate } placeholder='Nhập ngày sinh'
                  onChange={ (e) => onChangeValue(e, 'birthdate') } />
              </div>
            </InputLabel>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-2">
            <InputLabel label='Giới tính'>
              <div className="py-1.5 mb-2">
                <RadioGroup value={ sex } data={ GENDER_RADIO } layout='horizontal'
                  onChange={ (e) => onChangeValue(e, 'sex') } />
              </div>
            </InputLabel>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoForm;
