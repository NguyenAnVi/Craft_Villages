import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import config from '~/config';
import { Link, NavLink } from 'react-router-dom';
import Button from '~/components/Button';
import Search from '~/components/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
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
          <Button color="yellow" border="circle">
            Đăng nhập
          </Button>
        </div>
        <label htmlFor="nav-mobile-input" className={cx('navbars-btn')}>
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </label>
        <input
          type="checkbox"
          name=""
          className={cx('nav-input')}
          id="nav-mobile-input"
        ></input>
        <label htmlFor="nav-mobile-input" className={cx('nav-overlay')}></label>
        <div className={cx('nav-mobile')}>
          <label htmlFor="nav-mobile-input" className={cx('nav-mobile-close')}>
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </label>

          <NavLink to={config.routes.home} className={cx('logo')}>
            CraftVillages
          </NavLink>
          <div className={cx('search-mobile')}>
            <Search />
          </div>
          <NavLink
            to={config.routes.villages}
            className={(nav) => cx('navlink-mobile', { active: nav.isActive })}
          >
            Làng nghề
          </NavLink>
          <NavLink
            to={config.routes.products}
            className={(nav) => cx('navlink-mobile', { active: nav.isActive })}
          >
            Sản phẩm
          </NavLink>
          <NavLink
            to={config.routes.introduce}
            className={(nav) => cx('navlink-mobile', { active: nav.isActive })}
          >
            Giới thiệu
          </NavLink>
          <NavLink
            to={config.routes.contact}
            className={(nav) => cx('navlink-mobile', { active: nav.isActive })}
          >
            Liên hệ
          </NavLink>
          <div className={cx('auth-btn')}>
            <Button color="secondary" border="circle">
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
