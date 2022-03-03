import React from 'react';

import { useRecoilState } from 'recoil';

import BaseDropdownList from '../dropdown/BaseDropdownList';
import InputLabel from '../InputLabel';

interface propTypes extends React.ComponentPropsWithoutRef<any> {
  title?: string,
  data: any,
  filterParams: any,
  filterKey: string,
  filterable?: boolean
}

const FilterDropdown = ({
  title = 'Tìm kiếm',
  data,
  filterParams,
  filterKey,
  filterable = true,
  ...props
} : propTypes) => {
  const [filterState, setFilterState] = useRecoilState<any>(filterParams);
  const value: any = filterState[filterKey];

  const onChangeValue = (e: any) => {
    setFilterState((item: any) => {
      return {
        ...item,
        [filterKey]: e.value
      };
    });
  };

  return (
    <>
      <InputLabel label={ title }>
        <div className="mt-1.5">
          <BaseDropdownList data={ data }
            value={ value }
            onChange={ onChangeValue } { ...props }
            filterable={ filterable } />
        </div>
      </InputLabel>
    </>
  );
};

export default FilterDropdown;
