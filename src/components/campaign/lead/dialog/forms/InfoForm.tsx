import { GENDER_RADIO } from 'constants/constants';
import { AUTH_USER_INFO_KEY } from 'constants/queryKeys/commonQueryKeys';

import React from 'react';

import { DatePicker } from '@progress/kendo-react-dateinputs';
import { RadioGroup } from '@progress/kendo-react-inputs';
import BaseInput from 'common/BaseInput';
import BaseDropdownList from 'common/dropdown/BaseDropdownList';
import InputLabel from 'common/InputLabel';
import UploadImage from 'common/uploadImage/UploadImage';
import { Controller, useFormContext } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { helperService } from 'services/helperService';

const InfoForm: React.FC<{formValues: any}> = ({ formValues }) => {
  const queryClient = useQueryClient();
  const { data: { user: { branches } } } = queryClient.getQueryData<any>(AUTH_USER_INFO_KEY);
  const methods = useFormContext();
  const { register, control, formState: { errors } } = methods;
  const { values, setValues } = formValues;
  const { birthdate, sex } = values;

  const onChangeValue = (e: any, type: string) => {
    setValues((item: any) => {
      return {
        ...item,
        birthdate: type === 'birthdate' ? e.value : item.birthdate,
        sex: type === 'sex' ? e.value : item.sex
      };
    });
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
                { ...register('code', { required: true, validate: value => helperService().checkUniqueCode(value, 'contacts', 'code', '') }) }>
                { errors.code?.type === 'required' && <p className='input-error'>Mã Lead không được để trống</p> }
                { errors.code?.type === 'validate' && <p className='input-error'>Mã Lead đã tồn tại</p> }
              </BaseInput>
            </InputLabel>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-2">
            <InputLabel label='Tên Lead'>
              <BaseInput placeholder='Nhập tên Lead' errors={ errors }
                { ...register('name', { required: true }) }>
                { errors.name?.type === 'required' && <p className='input-error'>Tên Lead không được để trống</p> }
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
          <div className="w-full lg:w-1/2 lg:pr-2">
            <InputLabel label='Chi nhánh'>
              <Controller name='branch_id' control={ control }
                rules={ { validate: item => !!item && item?.id !== null } }
                render={ ({ field }) =>
                  <BaseDropdownList
                    { ...field }
                    data={ branches }
                    textField='name'
                    iconLeft={ [{ icon: 'location-dot', onClick: null }] }
                    errors={ errors }
                    name='branch_id'
                    filterable={ false }
                  /> }
              />
              { errors.branch_id?.type === 'validate' && <p className='input-error'>Mời bạn chọn chi nhánh</p> }
            </InputLabel>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoForm;
