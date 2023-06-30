import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import config from '~/config';
import { Link, NavLink } from 'react-router-dom';
import Button from '~/components/Button';
import Search from '~/components/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { logout, reset } from '~/features/auth/authSlice';
import { toast } from "react-toastify"
const cx = classNames.bind(styles);

function Header() {
  const { user, message, isSuccessLogout } = useAppSelector(
    (state) => state.auth,
  );
  const [navBarMobile, setNavBarMobile] = useState(false);
  const dispatch = useAppDispatch()
  const isNavMobile = () => {
    setNavBarMobile(!navBarMobile);
  };

  useEffect(() => {
    if (isSuccessLogout) {
      toast.success(message)
    }
    dispatch(reset())
  }, [message, isSuccessLogout, dispatch])
  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div className={cx('navbar')}>
      <div className={cx('inner')}>
        <div className={cx('left-header')}>
          <Link to={config.routes.home} className={cx('logo')}>
            CraftVillages
          </Link>
        </div>
        <div className={cx('center-header')}>
          <NavLink
            to={config.routes.villages}
            className={(nav) => cx('navlink', { active: nav.isActive })}
          >
            Làng nghề
          </NavLink>
          <NavLink
            to={config.routes.products}
            className={(nav) => cx('navlink', { active: nav.isActive })}
          >
            Sản phẩm
          </NavLink>
          <NavLink
            to={config.routes.introduce}
            className={(nav) => cx('navlink', { active: nav.isActive })}
          >
            Giới thiệu
          </NavLink>
          <NavLink
            to={config.routes.contact}
            className={(nav) => cx('navlink', { active: nav.isActive })}
          >
            Liên hệ
          </NavLink>
        </div>
        <div className={cx('right-header')}>
          <Search />
          {user ? (<Button color="yellow" border="circle" onClick={handleLogout} > Logout </Button>) : (<Button color="yellow" border="circle" to={config.routes.signin}>
            Đăng nhập
          </Button>)
          }
        </div>
        <Button className={cx('navbars-btn')} onClick={isNavMobile}>
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </Button>
        {navBarMobile && (
          <div onClick={isNavMobile} className={cx('nav-overlay')}></div>
        )}
        <div
          className={
            navBarMobile === true
              ? cx('nav-mobile', 'active')
              : cx('nav-mobile')
          }
        >
          <Button className={cx('nav-mobile-close')} onClick={isNavMobile}>
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </Button>

          <NavLink
            to={config.routes.home}
            onClick={isNavMobile}
            className={cx('logo')}
          >
            CraftVillages
          </NavLink>
          <div className={cx('search-mobile')}>
            <Search />
          </div>
          <NavLink
            to={config.routes.villages}
            onClick={isNavMobile}
            className={(nav) => cx('navlink-mobile', { active: nav.isActive })}
          >
            Làng nghề
          </NavLink>
          <NavLink
            to={config.routes.products}
            onClick={isNavMobile}
            className={(nav) => cx('navlink-mobile', { active: nav.isActive })}
          >
            Sản phẩm
          </NavLink>
          <NavLink
            to={config.routes.introduce}
            onClick={isNavMobile}
            className={(nav) => cx('navlink-mobile', { active: nav.isActive })}
          >
            Giới thiệu
          </NavLink>
          <NavLink
            to={config.routes.contact}
            onClick={isNavMobile}
            className={(nav) => cx('navlink-mobile', { active: nav.isActive })}
          >
            Liên hệ
          </NavLink>
          <div className={cx('auth-btn')}>
            <Button
              to={config.routes.signin}
              color="secondary"
              border="circle"
              onClick={isNavMobile}
            >
              Đăng nhập
            </Button>
            <Button color="white" border="circle">
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
