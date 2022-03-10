
import { ACCESS_TOKEN } from 'constants/localStorage';
import { AUTH_USER_INFO_KEY } from 'constants/queryKeys/commonQueryKeys';

import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'common/Dropdown';
import { swal } from 'plugins/sweetAlert';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { helperService } from 'services/helperService';
import { sidebarCollapsed } from 'store/atoms/commonState';

import Notifications from '../header/Notifications';

const settings = [
  { id: 1, name: 'Thiết lập chung', url: '/admin/setting/main-setting#tab-product', icon: 'cog', onClick: null },
  { id: 2, name: 'Quản lý mẫu in', url: '/admin/setting/print-template', icon: 'print', onClick: null },
  { id: 3, name: 'Quản lý người dùng', url: '/admin/user/user', icon: 'user', onClick: null },
  { id: 4, name: 'Quản lý chi nhánh', url: '/admin/branch/branch', icon: 'map-marker-alt', onClick: null },
  { id: 9, name: 'Lịch sử thao tác', url: '/admin/audit-log/audit-log', icon: 'list', onClick: null },
  { id: 8, name: 'Quản lý mẫu tin', url: '/admin/setting/template', icon: 'fa-regular fa-envelope', onClick: null },
  { id: 10, name: 'Chiết khấu khuyến mãi', url: '/admin/sell-promotion/sell-promotion', icon: 'gift', onClick: null },
  { id: 11, name: 'Quản lý Voucher', url: '/admin/voucher/voucher', icon: 'money-bill', onClick: null },
  { id: 12, name: 'Quản lý Webhook', url: '/admin/webhook/webhook', icon: 'layer-group', onClick: null }
];

const NavBar = React.memo(({ data } : {data: any}) => {
  const queryClient = useQueryClient();
  const [collapsed, setCollapsed] = useRecoilState(sidebarCollapsed);
  const [menuSetting, setMenuSetting] = useState([...settings]);

  const onSignOut = () => {
    swal.fire({
      icon: 'question',
      title: 'Đăng xuất',
      text: 'Đăng xuất khỏi tài khoản này?'
    }).then(async (result) => {
      if (result.isConfirmed) {
        helperService().removeCookie(ACCESS_TOKEN);
        await queryClient.invalidateQueries(AUTH_USER_INFO_KEY);
      }
    });
  };

  useEffect(() => {
    if (data && data.meta?.status_code === 0 && data?.data?.user?.isSupperUser) {
      setMenuSetting([
        ...settings,
        { id: 13, name: 'Quản lý khách hàng', url: '/admin/tenant/tenant', icon: 'laptop-house', onClick: null }
      ]);
    }
  }, [data]);

  return (
    <>
      <div className="w-full bg-white border-b flex items-center justify-between p-4">
        <div className='navbar-left'>
          <span className='cursor-pointer font-16 hover:text-gray-500'
            onClick={ () => setCollapsed(!collapsed) }>
            <FontAwesomeIcon icon='bars' />
          </span>
        </div>
        <div className="navbar-right pr-2 lg:pr-4 flex items-center">
          <Notifications />
          <Dropdown>
            <div className="cursor-pointer border-r pr-4 hover:text-primary-500 ml-4" title='Thiết lập chung'>
              <span><FontAwesomeIcon icon='cog' size='lg' /></span>
            </div>
            <ul style={ { width: '13rem' } } className='py-3'>
              {
                menuSetting.map((item: any) => {
                  return (
                    <Link to={ item.url } key={ item.id }>
                      <li className="flex items-center w-auto">
                        <div className="w-7">
                          <FontAwesomeIcon icon={ item.icon } />
                        </div>
                        <span className='item-title'>{ item.name }</span>
                      </li>
                    </Link>
                  );
                })
              }
            </ul>
          </Dropdown>
          <Dropdown>
            <div className="w-auto flex items-center justify-between cursor-pointer ml-4">
              <span><FontAwesomeIcon icon='user-circle' size='lg' /></span>
              <div className='ml-3 flex items-center'>
                <span className='font-13'>{ data ? data.data?.user?.username : '' }</span>
                <div className='ml-2 cursor-pointer'>
                  <FontAwesomeIcon icon='caret-down' />
                </div>
              </div>
            </div>
            <ul className='py-3'>
              <li className="flex items-center w-auto">
                <div className="w-7">
                  <FontAwesomeIcon icon='user-circle' />
                </div>
                <span className='item-title'>Tài khoản</span>
              </li>
              <li className="flex" onClick={ onSignOut }>
                <div className="w-7">
                  <FontAwesomeIcon icon='right-from-bracket' />
                </div>
                <span className='item-title'>Đăng xuất</span>
              </li>
            </ul>
          </Dropdown>
        </div>
      </div>
    </>
  );
});

export default NavBar;
