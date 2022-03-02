import React from 'react';

import { useRecoilValue } from 'recoil';
import { sidebarCollapsed } from 'store/atoms/commonState';

import { useWindowDimensions } from '../hook/useWindowDimension';

const FilterContainer = ({ children }: any) => {
  // eslint-disable-next-line no-unused-vars
  const collapsed = useRecoilValue(sidebarCollapsed);
  // eslint-disable-next-line no-unused-vars
  const { screenWidth } = useWindowDimensions();

  return (
    <div className='width-search'
      // style={ { width: screenWidth < 768 ? 'calc(100vw - 20px)' : `calc(100vw - ${collapsed ? '130px' : '280px'})` } }
    >
      {children}
    </div>
  );
};

export default FilterContainer;
