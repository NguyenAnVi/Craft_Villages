import classNames from 'classnames/bind';

import styles from './UserDetail.module.scss';

const cx = classNames.bind(styles);
type props = {}
const UserDetail = (props: props) => {
    return <div className={cx('wrapper')}> UserDetail</div>;
}

export default UserDetail;
