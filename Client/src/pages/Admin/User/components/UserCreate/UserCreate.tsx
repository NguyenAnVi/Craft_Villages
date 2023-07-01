import classNames from 'classnames/bind';

import styles from './UserCreate.module.scss';

const cx = classNames.bind(styles);

const UserCreate = () => {
    return <div className={cx('wrapper')}> User Create</div>;
}

export default UserCreate;
