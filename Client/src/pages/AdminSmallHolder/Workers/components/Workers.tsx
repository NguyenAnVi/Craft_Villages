import classNames from 'classnames/bind';

import styles from './Workers.module.scss';

const cx = classNames.bind(styles);
type props = {}
const Workers = (props: props) => {
    return <div className={cx('wrapper')}> Workers</div>;
}

export default Workers;
