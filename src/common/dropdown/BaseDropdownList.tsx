import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filterBy } from '@progress/kendo-data-query';
import { DropDownList } from '@progress/kendo-react-dropdowns';

interface propTypes {
    data: Array<any>,
    defaultItem?: any,
    iconLeft?: Array<any>,
    iconRight?: Array<any>,
    dataItemKey?: string,
    textField?: string,
    name?: string,
    errors?: any,
    filterable?: boolean
}

const BaseDropdownList = React.forwardRef((
  {
    data,
    defaultItem = null,
    iconLeft,
    iconRight,
    dataItemKey = 'id',
    textField = 'text',
    name = '',
    errors,
    filterable = true,
    ...props
  } : propTypes, ref) => {
  const [dataLocal, setDataLocal] = useState<object[]>([]);

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

  return (
    <div className={ `w-full flex items-center border rounded-md px-1 mb-2 dropdown-wrapper ${errors ? errors?.[name] ? 'form-error' : '' : ''}` }>
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
        defaultItem={ defaultItem }
        dataItemKey={ dataItemKey }
        textField={ textField }
        style={ { flex: '1 1 auto' } }
        filterable={ filterable }
        onFilterChange={ filterChange }
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
