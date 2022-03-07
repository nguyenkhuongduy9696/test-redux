import React, { useRef, useState } from 'react';

import { Dialog } from '@progress/kendo-react-dialogs';
import BaseButton from 'common/BaseButton';
import { useWindowDimensions } from 'hook/useWindowDimension';
import { useForm, FormProvider } from 'react-hook-form';

import FormGroup from './FormGroup';

interface propsTypes {
  title: string,
  onClose: any
}

const DialogLead = React.memo(({
  title,
  onClose
}: propsTypes) => {
  const ref = useRef(null);
  const { screenWidth } = useWindowDimensions();
  const methods = useForm({
    defaultValues: {

    }
  });
  const { handleSubmit } = methods;

  const [values, setValues] = useState({
    birthdate: null,
    sex: 0
  });

  const onSubmit = () => {

  };

  return (
    <>
      <div ref={ ref }>
        <Dialog title={ title } onClose={ onClose } width={ screenWidth > 1200 ? 1200 : 'calc(100% - 20px)' } appendTo={ ref.current }>
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
