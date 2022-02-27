import React from 'react';

import { useRecoilValue } from 'recoil';
import { sidebarCollapsed } from 'store/atoms/commonState';

const FilterContainer = ({ children }: any) => {
  const collapsed = useRecoilValue(sidebarCollapsed);

  return (
    <div style={ { width: `calc(100vw - ${collapsed ? '130px' : '280px'})` } } >
      {children}
    </div>
  );
};

export default FilterContainer;
