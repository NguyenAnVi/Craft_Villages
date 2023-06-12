import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import styles from './SignUp.module.scss';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

type Props = {};

const SignUp = (props: Props) => {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const handelShowPass = () => {
    setShowPass(!showPass);
  };
  const handelShowPass2 = () => {
    setShowPass2(!showPass2);
  };

  return (
    <div className={cx('wrapper')}>
      <form className={cx('form-card')}>
        <h1>Đăng ký</h1>
        <h4>Tên đăng nhập</h4>
        <input type="text" />
        <label className={cx('pass-wrap')}>
          <h4>Mật khẩu</h4>
          <input
            type={showPass ? 'text' : 'password'}
            name="password"
            id="password"
          />
          <Button
            type="button"
            className={cx('show-pass')}
            onClick={handelShowPass}
          >
            {showPass ? (
              <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
            )}
          </Button>
        </label>
        <label className={cx('pass-wrap')}>
          <h4>Xác nhận mật khẩu</h4>
          <input
            type={showPass2 ? 'text' : 'password'}
            name="password"
            id="password"
          />
          <Button
            type="button"
            className={cx('show-pass')}
            onClick={handelShowPass2}
          >
            {showPass2 ? (
              <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
            )}
          </Button>
        </label>
        <div className="d-flex w-100 h-100 form-check">
          <input type="checkbox" id="accept" className="form-check-input" />
          <label htmlFor="accept">
            Đồng ý với
            <Link to={config.routes.signup}> Điều khoản sử dụng </Link>
            và <Link to={config.routes.signup}>Chính sách bảo mật</Link> của
            chúng tôi
          </label>
        </div>
        <Button type="submit" color="shadeYellow" border="circle">
          Đăng ký
        </Button>
        <div className={cx('footer')}>
          <p>
            Đã có tài khoản?
            <Link to={config.routes.signin}> Đăng nhập </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
