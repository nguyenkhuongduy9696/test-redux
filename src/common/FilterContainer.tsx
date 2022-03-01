import React from 'react';

import { useRecoilValue } from 'recoil';
import { sidebarCollapsed } from 'store/atoms/commonState';

import { useWindowDimensions } from '../hook/useWindowDimension';

const FilterContainer = ({ children }: any) => {
  const collapsed = useRecoilValue(sidebarCollapsed);
  const { screenWidth } = useWindowDimensions();

  return (
    <div style={ { width: screenWidth < 768 ? 'calc(100vw - 20px)' : `calc(100vw - ${collapsed ? '130px' : '280px'})` } } >
      {children}
    </div>
  );
};

export default FilterContainer;
