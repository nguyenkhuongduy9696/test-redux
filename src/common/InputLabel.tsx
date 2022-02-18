import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface propTypes {
    wrapperClassName?: string,
    label?: string,
    required?: boolean,
    tooltip?: string,
    children: any
}

const InputLabel = ({
  wrapperClassName = '',
  label,
  required = false,
  tooltip,
  children
} : propTypes) => {
  return (
    <div className={ `mb-3 ${wrapperClassName}` }>
      { label && <label className='font-bold font-13'>
        { label }
        { required ? <span className='text-pink-600'>*</span> : '' }
        { tooltip && <FontAwesomeIcon icon='circle-info' /> }
      </label> }
      {children}
    </div>
  );
};

export default InputLabel;
