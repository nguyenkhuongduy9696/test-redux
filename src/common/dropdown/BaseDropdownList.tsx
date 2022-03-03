import React, { useEffect, useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filterBy } from '@progress/kendo-data-query';
import { DropDownList } from '@progress/kendo-react-dropdowns';

import Logo from 'assets/images/default-avatar.png';

interface propTypes {
    data: Array<any>,
    iconLeft?: Array<any>,
    iconRight?: Array<any>,
    dataItemKey?: string,
    textField?: string,
    name?: string,
    errors?: any,
    filterable?: boolean,
    value?: any,
    onChange?: any,
    animate?: boolean,
    isPicture?: boolean,
    pictureKey?: string
}

const BaseDropdownList = React.forwardRef((
  {
    data,
    iconLeft,
    iconRight,
    dataItemKey = 'id',
    textField = 'text',
    name = '',
    errors,
    filterable = true,
    animate = true,
    isPicture = false,
    pictureKey = 'picture',
    ...props
  } : propTypes, ref) => {
  const [dataLocal, setDataLocal] = useState<object[]>([]);
  const refDropdown = useRef(null);

  const filterData = (filter: any) => {
    const dataList = data.slice();
    return filterBy(dataList, filter);
  };

  const filterChange = (event: any) => {
    setDataLocal(filterData(event.filter));
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setDataLocal(data);
    }
  }, [data]);

  const itemRender = (li: any, itemProps: any) => {
    const itemChildren = (
      <div className="w-full h-full border-0">
        <div className='font-12 w-full h-full flex justify-between items-center'>
          <div className='flex items-center'>
            {
              isPicture &&
                  <img src={ itemProps.dataItem[pictureKey] ? itemProps.dataItem[pictureKey] : Logo }
                    alt="" className='w-5 h-5 rounded-full mr-2'/>
            }
            {li.props.children}
          </div>
          {itemProps.selected
            ? <span className='font-13'>
              <FontAwesomeIcon icon={ 'check' } className='text-primary-500'/>
            </span>
            : ''}
        </div>
      </div>
    );
    return React.cloneElement(li, li.props, itemChildren);
  };

  return (
    <div className={ `w-full flex items-center border rounded-md px-1 mb-2 dropdown-wrapper ${errors ? errors?.[name] ? 'form-error' : '' : ''}` }
      ref={ refDropdown } >
      { iconLeft && iconLeft.map((item: {icon: any, onClick: any}, index: number) => {
        return (
          <span className='icon-button input-icon' key={ index } onClick={ () => item.onClick }>
            <FontAwesomeIcon icon={ item.icon } />
          </span>
        );
      }) }
      <DropDownList { ...props }
        ref={ ref }
        data={ dataLocal }
        dataItemKey={ dataItemKey }
        textField={ textField }
        style={ { flex: '1 1 auto' } }
        filterable={ filterable }
        onFilterChange={ filterChange }
        popupSettings={ { appendTo: refDropdown.current || undefined, animate: animate } }
        itemRender={ itemRender }
        // opened={ true }
      />
      { iconRight && iconRight.map((item: {icon: any, onClick: any}, index: number) => {
        return (
          <span className='icon-button' key={ index } onClick={ () => item.onClick }>
            <FontAwesomeIcon icon={ item.icon } />
          </span>
        );
      }) }
    </div>
  );
});

export default BaseDropdownList;
