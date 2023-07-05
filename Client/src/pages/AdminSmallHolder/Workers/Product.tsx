import classNames from 'classnames/bind';

import styles from './Product.module.scss';

const cx = classNames.bind(styles);
type props = {}
const Product = (props: props) => {
    return <div className={cx('wrapper')}> Product</div>;
}

export default Product;
