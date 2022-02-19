import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState } from 'recoil';
import { sidebarCollapsed } from 'store/atoms/commonState';

const NavBar = React.memo(() => {
  const [collapsed, setCollapsed] = useRecoilState(sidebarCollapsed);

  return (
    <>
      <div className="w-full bg-white navbar">
        <span className='cursor-pointer font-16 hover:text-gray-500'
          onClick={ () => setCollapsed(!collapsed) }>
          <FontAwesomeIcon icon='bars' />
        </span>
      </div>
    </>
  );
});

export default NavBar;
