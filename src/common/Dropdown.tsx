import React, { Children, useRef, useState } from 'react';

import { Fade } from '@progress/kendo-react-animation';

import useOnClickOutSide from '../hook/usOnClickOutSide';

// eslint-disable-next-line no-unused-vars
const Dropdown = React.memo(({ children, ...props }) => {
  const child = Children.toArray(children);
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useOnClickOutSide(ref, () => setShow(false));

  return (
    <div className='dropdown relative' ref={ ref }>
      <div onClick={ () => setShow(!show) }>
        { child[0] }
      </div>
      <Fade transitionEnterDuration={ 200 } transitionExitDuration={ 100 }>
        { show ? <div className="dropdown-container"> { child[1] } </div> : null }
      </Fade>
    </div>
  );
});

export default Dropdown;
