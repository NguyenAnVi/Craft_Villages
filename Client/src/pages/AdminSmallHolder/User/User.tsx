import classNames from 'classnames/bind';

import styles from './User.module.scss';

const cx = classNames.bind(styles);
type props = {}
const User = (props: props) => {
    return <div className={cx('wrapper')}> User</div>;
}

export default User;
