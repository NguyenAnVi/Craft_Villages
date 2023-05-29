import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import config from '~/config';
import { Link, NavLink } from 'react-router-dom';
import Button from '~/components/Button';
import Search from '~/components/Search';

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
      </div>
    </div>
  );
}

export default Header;
