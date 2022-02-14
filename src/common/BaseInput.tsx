import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonProps extends React.ComponentPropsWithoutRef<'input'> {
    iconLeft?: any,
    iconRight?: any,
    inputType?: string,
    baseInputClassName?: string,
    inputWrapperClassName?: string,
    inputClassName?: string,
    label?: string
}

const BaseInput = React.forwardRef<HTMLInputElement, ButtonProps>((
  {
    placeholder = '',
    iconLeft,
    iconRight,
    inputType = 'text',
    baseInputClassName = '',
    inputWrapperClassName = '',
    inputClassName = '',
    label,
    ...props
  }, ref
) => {
  return (
    <div className={ `mb-3 ${baseInputClassName}` }>
      { label && <label className='font-bold font-13'>{ label }</label> }
      <div className={ `mt-1.5 px-2 py-1.5 border rounded-md flex items-center input-wrapper ${inputWrapperClassName}` }>
        {
          iconLeft && iconLeft.map((item: {icon: any, onClick: any}, index: number) => {
            return (
              <span className='pl-1 text-gray-500 input-icon' key={ index }
                onClick={ () => item.onClick }>
                <FontAwesomeIcon icon={ item.icon } />
              </span>
            );
          })
        }
        <input { ...props } type={ inputType } placeholder={ placeholder } ref={ ref }
          className={ `w-full focus:outline-none px-2 ${inputClassName}` }
        />
        {
          iconRight && iconLeft.map((item: {icon: any, onClick: any}, index: number) => {
            return (
              <span className='pr-1 text-gray-500 input-icon' key={ index }
                onClick={ () => item.onClick }>
                <FontAwesomeIcon icon={ item.icon } />
              </span>
            );
          })
        }
      </div>
    </div>
  );
});

export default BaseInput;
