import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'common/Dropdown';
import { useRecoilState } from 'recoil';
import { sidebarCollapsed } from 'store/atoms/commonState';

const NavBar = React.memo(({ data } : {data: any}) => {
  const [collapsed, setCollapsed] = useRecoilState(sidebarCollapsed);

  const onSignOut = () => {

  };

  return (
    <>
      <div className="w-full bg-white navbar flex items-center justify-between">
        <div className='navbar-left'>
          <span className='cursor-pointer font-16 hover:text-gray-500'
            onClick={ () => setCollapsed(!collapsed) }>
            <FontAwesomeIcon icon='bars' />
          </span>
        </div>
        <div className="navbar-right pr-2 lg:pr-4">
          <Dropdown>
            <div className="w-auto flex items-center justify-between cursor-pointer">
              <span><FontAwesomeIcon icon='user-circle' size='lg' /></span>
              <div className='ml-3 flex items-center'>
                <span className='font-13'>{ data ? data.data?.user?.username : '' }</span>
                <div className='ml-2 cursor-pointer'>
                  <FontAwesomeIcon icon='caret-down' />
                </div>
              </div>
            </div>
            <ul>
              <li className="flex items-center w-auto">
                <div className="w-8">
                  <FontAwesomeIcon icon='user-circle' />
                </div>
                Tài khoản
              </li>
              <li className="flex" onClick={ onSignOut }>
                <div className="w-8">
                  <FontAwesomeIcon icon='right-from-bracket' />
                </div>
              Đăng xuất
              </li>
            </ul>
          </Dropdown>
        </div>
      </div>
    </>
  );
});

export default NavBar;
