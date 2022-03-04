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
  disableClassName = 'btn-gray',
  onClick = null,
  enable = true,
  title,
  titleClassName = '',
  iconLeft,
  iconLeftClassName = 'mr-2',
  iconRight,
  iconRightClassName = '',
  children,
  ...props
} : buttonType) => {
  return (
    <button className={ `btn ${enable ? className : disableClassName}` } onClick={ enable ? onClick : null } { ...props }>
      { iconLeft && <FontAwesomeIcon icon={ iconLeft } className={ iconLeftClassName } /> }
      { title && <div className={ `${titleClassName} mr-2` }>{title}</div> }
      { children }
      { iconRight && <FontAwesomeIcon icon={ iconRight } className={ iconRightClassName } /> }
    </button>
  );
};

export default BaseButton;
