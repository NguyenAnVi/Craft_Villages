import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import styles from './ProductDetail.module.scss';
import { useAppSelector } from '~/app/hooks';
import { getProduct } from '~/features/product/productService';

const cx = classNames.bind(styles);

const ProductDetail = () => {
  const { id } = useParams() as { id: string };
  const { user } = useAppSelector((state) => state.auth);
  const { products } = useAppSelector(
    (state) => state.persistedReducer.products,
  );

  const [product, setProduct] = useState([]) as any;

  useEffect(() => {
    products.map((product) => {
      if (product._id === id) {
        setProduct(product);
        return;
      }
    });
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>Chi tiết sản phẩm</div>
      <div className={cx('detail')}>
        <div className={cx('product')}>
          <img className={cx('product-image')} src={product.avatar} alt="" />
          <div className={cx('product-detail')}>
            <div className={cx('product-name')}>{product.name}</div>
            <p>Chất liệu: {product.materials}</p>
            <p>
              Giá:{' '}
              {product.price?.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
            </p>
            <p>Số lượng: 1000 cái</p>
            <p>Mô tả: {product.description}</p>
          </div>
        </div>
        <div className={cx('credit')}>
          <div>
            <p>Thuộc làng nghề:</p>
            <p>Địa chỉ:</p>
            <p>Email:</p>
            <p>Điện thoại:</p>
          </div>
          <div>
            <p className={cx('village-name')}>{product.smallHolderId}</p>
            <p>202 Nguyễn Huệ, Quận 2, Thành phố Hồ Chí Minh</p>
            <p>info@vnhandicraft.vn</p>
            <p>0983884266</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
