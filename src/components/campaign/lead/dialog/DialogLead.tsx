import { CURRENT_BRANCH } from 'constants/localStorage';

import React, { useEffect, useRef, useState } from 'react';

import { Dialog } from '@progress/kendo-react-dialogs';
import BaseButton from 'common/BaseButton';
import { useWindowDimensions } from 'hook/useWindowDimension';
import { useForm, FormProvider } from 'react-hook-form';
import { helperService } from 'services/helperService';

import FormGroup from './FormGroup';

interface propsTypes {
  title: string,
  onClose: any
}

interface inputs {
  code: string,
  name: string,
  mobile: string,
  email: string,
  branch_id: unknown
}

const DialogLead: React.MemoExoticComponent<any> = React.memo(({
  title,
  onClose
}: propsTypes) => {
  const ref = useRef<HTMLDivElement>(null);
  const currentBranch = JSON.parse(localStorage.getItem(CURRENT_BRANCH) || '');
  const { screenWidth } = useWindowDimensions();
  const methods = useForm<inputs>({
    defaultValues: {
      branch_id: currentBranch
    }
  });
  const { handleSubmit, setValue } = methods;

  const [values, setValues] = useState({
    birthdate: null,
    sex: 0
  });

  const { data: contactCode } = helperService().useGenerateCode('contacts', 'code', 'KH', '', true);

  useEffect(() => {
    setValue('code', contactCode.code);
  }, [contactCode]);

  const onSubmit = () => {

  };

  return (
    <>
      <div ref={ ref }>
        <Dialog title={ title } onClose={ onClose } appendTo={ ref.current }
          width={ screenWidth > 1200 ? 1200 : 'calc(100% - 20px)' }>
          <FormProvider { ...methods }>
            <FormGroup formValues={ { values, setValues } } />
          </FormProvider>
          <div className="dialog-actions">
            <BaseButton className='btn-gray' title='Lưu' iconLeft='save' onClick={ handleSubmit(onSubmit) } />
            <BaseButton className='btn-gray lg:ml-2' title='Đóng' iconLeft='times' onClick={ onClose } />
          </div>
        </Dialog>
      </div>

    </>
  );
});

export default DialogLead;
