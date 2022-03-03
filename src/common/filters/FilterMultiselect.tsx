import React from 'react';

import { useRecoilState } from 'recoil';

import BaseMultiselect from '../dropdown/BaseMultiselect';
import InputLabel from '../InputLabel';

interface propTypes extends React.ComponentPropsWithoutRef<any> {
  title?: string,
  data: any,
  filterParams: any,
  filterKey: string,
  filterable?: boolean
}

const FilterMultiselect = ({
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
          <BaseMultiselect data={ data }
            value={ value }
            onChange={ onChangeValue }
            filterable={ filterable }
            { ...props } />
        </div>
      </InputLabel>
    </>
  );
};

export default FilterMultiselect;
