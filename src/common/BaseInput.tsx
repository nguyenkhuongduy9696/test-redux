import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonProps extends React.ComponentPropsWithoutRef<'input'> {
    iconLeft?: any,
    iconRight?: any,
    inputType?: string,
    baseInputClassName?: string,
    inputWrapperClassName?: string,
    inputClassName?: string,
    errors?: any,
    name?: string,
}

const BaseInput = React.forwardRef<HTMLInputElement, ButtonProps>((
  {
    placeholder = '',
    iconLeft,
    iconRight,
    inputType = 'text',
    baseInputClassName = 'mb-3',
    inputWrapperClassName = 'mt-1.5 px-2 py-1.5 border rounded-md',
    inputClassName = '',
    children,
    name = '',
    errors,
    ...props
  }, ref
) => {
  return (
    <div className={ `${baseInputClassName}` }>
      <div className={ `${inputWrapperClassName} flex items-center input-wrapper ${errors?.[name] && 'form-error'}` }>
        {
          iconLeft && iconLeft.map((item: {icon: any, onClick: any}, index: number) => {
            return (
              <span className='pl-1 text-gray-500 input-icon cursor-pointer' key={ index }
                onClick={ () => item.onClick }>
                <FontAwesomeIcon icon={ item.icon } />
              </span>
            );
          })
        }
        <input { ...props } type={ inputType } placeholder={ placeholder } name={ name } ref={ ref }
          className={ `${inputClassName} w-full focus:outline-none px-2` }
        />
        {
          iconRight && iconRight.map((item: {icon: any, onClick: any}, index: number) => {
            return (
              <span className='pr-1 text-gray-500 input-icon cursor-pointer' key={ index }
                onClick={ () => item.onClick }>
                <FontAwesomeIcon icon={ item.icon } />
              </span>
            );
          })
        }
      </div>
      { children }
    </div>
  );
});

export default BaseInput;
