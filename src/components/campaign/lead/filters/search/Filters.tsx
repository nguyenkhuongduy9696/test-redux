import { EMPLOYEE_FOR_DROPDOWN } from 'constants/queryKeys/employeeQueryKeys';

import React, { useState } from 'react';

import BaseButton from 'common/BaseButton';
import Dropdown from 'common/Dropdown';
import FilterContainer from 'common/FilterContainer';
import FilterDate from 'common/filters/FilterDate';
import FilterDropdown from 'common/filters/FilterDropdown';
import FilterMultiselect from 'common/filters/FilterMultiselect';
import { useQuery } from 'react-query';
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs';
import { employeeService } from 'services/employee/employeeService';
import { leadFilterParamState } from 'store/atoms/campaign/lead/lead';

const Filters = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const arrEmployeeStatus = [
    { id: 99, text: 'Tất cả' },
    { id: 1, text: 'Đã có nhân viên phụ trách' },
    { id: 2, text: 'Chưa có NV phụ trách' }
  ];

  const { data: employees } = useQuery(
    [EMPLOYEE_FOR_DROPDOWN, 'all'],
    () => employeeService().getDropdown('all'),
    { placeholderData: [] }
  );

  return (
    <div className='flex-0-0-auto lg:mr-2'>
      <Dropdown position='left' isDropdownFilter={ true }>
        <BaseButton iconLeft='filter'
          title='Thêm điều kiện lọc'
          iconRight='caret-down'
          className='btn-gray' />
        <FilterContainer>
          <Tabs forceRenderTabPanel={ true }
            selectedIndex={ tabIndex }
            onSelect={ (index: number) => setTabIndex(index) }>
            <TabList className='mx-2 mb-3 mt-1'>
              <Tab>Khách hàng</Tab>
            </TabList>
            <TabPanel>
              <div className="px-4 pb-2 flex k-flex-wrap">
                <div className="w-full md:w-1/2 md:pr-2">
                  <FilterDate filterParams={ leadFilterParamState }
                    filterKey='filterDate'
                    title='Ngày nhận Lead' />
                </div>
                <div className="w-full md:w-1/2 md:pl-2">
                  <FilterDropdown data={ arrEmployeeStatus }
                    filterParams={ leadFilterParamState }
                    filterKey='employeeStatus'
                    title='Trạng thái phụ trách'
                    animate={ false }
                    filterable={ false } />
                </div>
                <div className="w-full">
                  <FilterMultiselect data={ employees }
                    filterParams={ leadFilterParamState }
                    filterKey='employees'
                    animate={ false }
                    title='Nhân viên phụ trách'
                    placeholder='Chọn nhân viên phụ trách'/>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </FilterContainer>
      </Dropdown>
    </div>
  );
};

export default Filters;
