import React, { Children, useRef, useState } from 'react';

import { Fade } from '@progress/kendo-react-animation';

import useOnClickOutSide from '../hook/usOnClickOutSide';

const Dropdown = React.memo(({
  children,
  position = 'right',
  isDropdownFilter = false,
  dropdownClassName = '',
  // eslint-disable-next-line no-unused-vars
  ...props
} : {
    children: any,
    position?: string,
    isDropdownFilter?: boolean,
    dropdownClassName?: string
}) => {
  const child = Children.toArray(children);
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useOnClickOutSide(ref, () => setShow(false));

  return (
    <div className={ `${dropdownClassName} dropdown relative` } ref={ ref }>
      <div onClick={ () => setShow(!show) }>
        { child[0] }
      </div>
      <Fade transitionEnterDuration={ 200 } transitionExitDuration={ 100 }>
        { show
          ? <div className={ `dropdown-container ${isDropdownFilter ? 'dropdown-filter' : ''} ${position === 'right' ? 'right-0' : 'left-0'}` }>
            { child[1] }
          </div>
          : null }
      </Fade>
    </div>
  );
});

export default Dropdown;
