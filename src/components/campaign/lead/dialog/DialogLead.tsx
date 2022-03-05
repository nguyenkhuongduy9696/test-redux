import React, { useRef } from 'react';

import { Dialog } from '@progress/kendo-react-dialogs';

interface propsTypes {
  title: string,
  onClose: any
}

const DialogLead = React.memo(({
  title,
  onClose
}: propsTypes) => {
  const ref = useRef(null);
  return (
    <>
      <div ref={ ref }>
        <Dialog title={ title } onClose={ onClose } appendTo={ ref.current }>
          ádsadsadsad
        </Dialog>
      </div>

    </>
  );
});

export default DialogLead;
