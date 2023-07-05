import classNames from 'classnames/bind';

import styles from './Report.module.scss';

const cx = classNames.bind(styles);
type props = {}
const Report = (props: props) => {
    return <div className={cx('wrapper')}> Report</div>;
}

export default Report;
