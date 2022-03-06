import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface buttonType {
    className?: string,
    disableClassName?: string,
    enable?: boolean,
    onClick?: any,
    title?: string,
    titleClassName?: string,
    iconLeft?: any,
    iconLeftClassName?: string,
    iconRight?: any,
    iconRightClassName?: string,
    children?: any
}

const BaseButton = ({
  className = '',
  disableClassName = 'btn-disable',
  onClick = null,
  enable = true,
  title,
  titleClassName = 'font-bold',
  iconLeft,
  iconLeftClassName = 'mr-2',
  iconRight,
  iconRightClassName = 'ml-2',
  children,
  ...props
} : buttonType) => {
  return (
    <button className={ `btn leading-snug ${enable ? className : `btn-disable ${disableClassName}`}` }
      onClick={ enable ? onClick : null } { ...props }>
      { iconLeft && <FontAwesomeIcon icon={ iconLeft } className={ iconLeftClassName } /> }
      { title && <div className={ `font-13 ${titleClassName}` }>{title}</div> }
      { children }
      { iconRight && <FontAwesomeIcon icon={ iconRight } className={ iconRightClassName } /> }
    </button>
  );
};

export default BaseButton;
