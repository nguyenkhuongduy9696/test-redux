import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { menu } from 'routers/menu';
import { sidebarCollapsed } from 'store/atoms/commonState';

import Avatar from 'assets/images/avatar.jpg';
import Logo from 'assets/images/logo-crm.jpg';
import LogoMini from 'assets/images/logo-mini.png';
import { SIDEBAR_COLLAPSE } from 'constants/localStorage';

const Sidebar = React.memo(() => {
  const collapsed = useRecoilValue(sidebarCollapsed);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSE, collapsed ? '1' : '0');
  }, [collapsed]);

  return (
    <nav className={ `sidebar sidebar-offcanvas flex-0-0-auto ${collapsed ? 'collapse-sidebar' : ''}` } id="sidebar">
      <div className="sidebar-brand-wrapper flex items-center justify-center">
        <a className="sidebar-brand brand-logo" href="/"><img src={ Logo } alt="logo"/></a>
        <a className="sidebar-brand brand-logo-mini hidden" href="/"><img src={ LogoMini } alt="logo"/></a>
      </div>
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <img className="w-10 h-10 rounded-full" src={ Avatar } alt="avatar" />
                <span className="count bg-primary-500" />
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">Henry Klein</h5>
                <span>Gold Member</span>
              </div>
            </div>
          </div>
        </li>
        {/* <li className="nav-item nav-category"> */}
        {/*  <span className="nav-link">Danh mục chức năng</span> */}
        {/* </li> */}
        {
          menu.map((item: any, index) => {
            return (
              <li className="nav-item menu-items" key={ index }>
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
                                <p className="nav-link sub">
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
                        <p className='px-4 py-2 font-bold hover:text-primary-500'>{item.title}</p>
                      </Link>
                    </div>
                }
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
});

export default Sidebar;
