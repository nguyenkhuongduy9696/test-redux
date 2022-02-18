import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import Avatar from 'assets/images/avatar.jpg';
import Logo from 'assets/images/logo-crm.jpg';

import { menu } from '../../routers/menu';

const Sidebar = React.memo(() => {
  return (
    <nav className="sidebar sidebar-offcanvas flex-0-0-auto" id="sidebar">
      <div className="sidebar-brand-wrapper hidden lg:flex items-center justify-center">
        <a className="sidebar-brand brand-logo" href="/"><img src={ Logo } alt="logo"/></a>
        <a className="sidebar-brand brand-logo-mini" href="/"><span>N</span></a>
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
                  <p className="nav-link">
                    <span className="menu-icon">
                      <FontAwesomeIcon icon={ item.icon } />
                    </span>
                    <span className="menu-title cursor-pointer">{ item.title }</span>
                    {
                      item.subMenu.length > 0 &&
                      <span className="menu-arrow cursor-pointer">
                        <FontAwesomeIcon icon='chevron-down' />
                      </span>
                    }
                  </p>
                </Link>
                {
                  item.subMenu.length > 0 &&
                    <div className="collapse" id="ui-basic">
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
