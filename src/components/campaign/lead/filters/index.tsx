import React from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BaseButton from 'common/BaseButton';
import BaseInput from 'common/BaseInput';
import Dropdown from 'common/Dropdown';
import FilterContainer from 'common/FilterContainer';

const LeadScreenFilter = () => {
  return (
    <>
      <div className="w-full md:w-1/2 lg:flex items-center mb-4">
        <div className='flex-0-0-auto lg:mr-4'>
          <Dropdown position='left'>
            <BaseButton iconLeft='filter' title='Thêm điều kiện lọc' className='btn-primary' />
            <FilterContainer>
              <div className="px-4 py-2">
                          sadsad
              </div>
            </FilterContainer>
          </Dropdown>
        </div>
        <div className="w-full flex-1-1-auto">
          <BaseInput placeholder='Tìm kiếm' baseInputClassName='mb-0'
            inputWrapperClassName='px-2 py-1.5 border rounded-md shadow-lg'
            iconLeft={ [{ icon: 'search', onClick: null }] }/>
        </div>
      </div>
    </>
  );
};

export default LeadScreenFilter;
