import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import styles from './SignIn.module.scss';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

type Props = {};

const SignIn = (props: Props) => {
  const [showPass, setShowPass] = useState(false);

  const handelShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className={cx('wrapper')}>
      <form className={cx('form-card')}>
        <h1>Đăng nhập</h1>
        <h4>Tên đăng nhập</h4>
        <input type="text" name="username" id="username" />
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
            )}{' '}
          </Button>
        </label>
        <div className="d-flex w-100 form-check">
          <input type="checkbox" id="keepLogin" className="form-check-input" />
          <label htmlFor="keepLogin">Duy trì đăng nhập</label>
        </div>
        <Button type="submit" color="shadeYellow" border="circle">
          Đăng nhập
        </Button>
        <div className={cx('footer')}>
          <p>Quên mật khẩu?</p>
          <p>
            Chưa có tài khoản?
            <Link to={config.routes.signup}> Đăng ký ngay</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
