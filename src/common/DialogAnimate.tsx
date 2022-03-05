import React from 'react';

import { Fade } from '@progress/kendo-react-animation';

const DialogAnimate = ({ children } : {children: any}) => {
  return (
    <Fade transitionEnterDuration={ 250 } transitionExitDuration={ 200 }>
      {children}
    </Fade>
  );
};

export default DialogAnimate;
