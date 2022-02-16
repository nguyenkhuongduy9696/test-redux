import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface buttonType {
    className: string,
    disableClassName: string,
    enable: boolean,
    onClick: any,
    title: string,
    titleClassName: string,
    iconLeft: any,
    iconLeftClassName: string,
    iconRight: any,
    iconRightClassName: string,
    children: any
}

const BaseButton = ({
  className,
  disableClassName = 'btn-gray',
  onClick = null,
  enable,
  title,
  titleClassName,
  iconLeft,
  iconLeftClassName,
  iconRight,
  iconRightClassName,
  children,
  ...props
} : buttonType) => {
  return (
    <button className={ `btn ${enable ? className : disableClassName}` } onClick={ enable ? onClick : null } { ...props }>
      { iconLeft && <FontAwesomeIcon icon={ iconLeft } className={ iconLeftClassName } /> }
      { title && <span className={ titleClassName }>{title}</span> }
      { children }
      { iconRight && <FontAwesomeIcon icon={ iconRight } className={ iconRightClassName } /> }
    </button>
  );
};

export default BaseButton;
