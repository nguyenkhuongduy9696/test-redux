import React from 'react';

import BaseButton from 'common/BaseButton';
import Dropdown from 'common/Dropdown';
import FilterContainer from 'common/FilterContainer';
import FilterDate from 'common/filters/FilterDate';
import { leadFilterParamState } from 'store/atoms/campaign/lead/lead';

const Filters = () => {
  return (
    <div className='flex-0-0-auto lg:mr-4'>
      <Dropdown position='left'>
        <BaseButton iconLeft='filter' title='Thêm điều kiện lọc' className='btn-primary' />
        <FilterContainer>
          <div className="px-4 pb-2 pt-4">
            <div className="w-full md:w-1/2 md:pr-2">
              <FilterDate filterParams={ leadFilterParamState } filterKey='filterDate' />
            </div>
          </div>
        </FilterContainer>
      </Dropdown>
    </div>
  );
};

export default Filters;
