import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { menu } from 'routers/menu';
import { currentMenuId, sidebarCollapsed } from 'store/atoms/commonState';

import Avatar from 'assets/images/avatar.jpg';
import Logo from 'assets/images/logo-crm.jpg';
import LogoMini from 'assets/images/logo-mini.png';
import { SIDEBAR_COLLAPSE } from 'constants/localStorage';

const Sidebar = React.memo(({ data } : {data: any}) => {
  const location = useLocation();

  const collapsed = useRecoilValue(sidebarCollapsed);
  const [menuId, setMenuId] = useRecoilState(currentMenuId);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSE, collapsed ? '1' : '0');
  }, [collapsed]);

  useEffect(() => {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].subMenu.length === 0) {
        if (menu[i].path === location.pathname) {
          setMenuId(menu[i].id);
        }
      } else {
        for (let j = 0; j < menu[i].subMenu.length; j++) {
          if (menu[i].subMenu[j].subPath === location.pathname) {
            setMenuId(Math.floor(menu[i].subMenu[j].id / 100));
          }
        }
      }
    }
  }, [location.pathname]);

  return (
    <nav className={ `sidebar sidebar-offcanvas flex-0-0-auto ${collapsed ? 'collapse-sidebar' : ''}` } id="sidebar">
      <div className="sidebar-brand-wrapper flex items-center justify-center">
        <a className="sidebar-brand brand-logo" href="/"><img src={ Logo } alt="logo"/></a>
        <a className="sidebar-brand brand-logo-mini hidden" href="/"><img src={ LogoMini } alt="logo"/></a>
      </div>
      <ul className="nav flex flex-col">
        <li className="nav-item profile flex-0-0-auto">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <img className="w-10 h-10 rounded-full" src={ data ? data.data?.user?.picture : Avatar } alt="avatar" />
                <span className="count bg-primary-500" />
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">{ data ? data.data?.user?.username : '' }</h5>
                <span>{data ? data.data?.user?.designation : ''}</span>
              </div>
            </div>
          </div>
        </li>
        {/* <li className="nav-item nav-category"> */}
        {/*  <span className="nav-link">Danh mục chức năng</span> */}
        {/* </li> */}
        <div className="h-full flex-1-1-auto menu">
          {
            menu.map((item: any, index) => {
              return (
                <li className={ `nav-item menu-items ${item.id === menuId ? 'menu-active' : ''}` } key={ index }>
                  <Link to={ item.subMenu.length > 0 ? '#' : item.path } >
                    <p className="nav-link parent-link">
                      <span className="menu-icon parent-icon">
                        <FontAwesomeIcon icon={ item.icon } />
                      </span>
                      <span className="menu-title cursor-pointer parent-title">{ item.title }</span>
                      {/* { */}
                      {/*  item.subMenu.length > 0 && */}
                      {/*  <span className="menu-arrow cursor-pointer"> */}
                      {/*    <FontAwesomeIcon icon='chevron-down' /> */}
                      {/*  </span> */}
                      {/* } */}
                    </p>
                  </Link>
                  {
                    item.subMenu.length > 0
                      ? <div className="collapse" id="ui-basic">
                        <p className='px-4 pt-4 pb-0 font-bold single-menu-collapse'>{item.title}</p>
                        <ul className="nav flex-column sub-menu">
                          {
                            item.subMenu.map((i: any) => {
                              return (
                                <Link to={ i.subPath } key={ i.id } >
                                  <p className={ `nav-link sub ${i.subPath === location.pathname ? 'menu-active' : ''}` }>
                                    <span className="menu-icon">
                                      <FontAwesomeIcon icon={ i.subIcon } />
                                    </span>
                                    <span className="menu-title cursor-pointer">{ i.subTitle }</span>
                                    <span className="menu-arrow cursor-pointer">
                                    </span>
                                  </p>
                                </Link>
                              );
                            })
                          }
                        </ul>
                      </div>
                      : <div className="collapse single-menu-collapse" id="ui-basic">
                        <Link to={ item.path } >
                          <p className='px-4 py-2 hover:text-primary-500'>{item.title}</p>
                        </Link>
                      </div>
                  }
                </li>
              );
            })
          }
        </div>
      </ul>
    </nav>
  );
});

export default Sidebar;
