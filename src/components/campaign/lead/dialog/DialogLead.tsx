import React, { useRef } from 'react';

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

  return (
    <>
      <div ref={ ref }>
        <Dialog title={ title } onClose={ onClose } width={ screenWidth > 1200 ? 1200 : 'calc(100% - 20px)' } appendTo={ ref.current }>
          <FormProvider { ...methods }>
            <FormGroup />
          </FormProvider>
          <div className="dialog-actions">
            <BaseButton className='btn-primary' title='Lưu' iconLeft='save' />
            <BaseButton className='btn-gray lg:ml-2' title='Đóng' iconLeft='times' />
          </div>
        </Dialog>
      </div>

    </>
  );
});

export default DialogLead;
