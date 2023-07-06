import classNames from 'classnames/bind';

import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);

const ProductDetail = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>Chi tiết sản phẩm</div>
      <div className={cx('detail')}>
        <div className={cx('product')}>
          <img
            className={cx('product-image')}
            src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg"
            alt=""
          />
          <div className={cx('product-detail')}>
            <div className={cx('product-name')}>Rổ tre tròn cỡ lớn (40cm)</div>
            <p>Kích thước: Cao 10 cm, đường kính 40 cm</p>
            <p>Chất liệu: Tre tự nhiên</p>
            <p>Số lượng: 1000 cái</p>
            <p>Giá: 39.000 đ</p>
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
            <p className={cx('village-name')}>
              Xóm nghề đan rổ rế truyền thống ở xã Hòa Bình, huyện Chợ Mới
            </p>
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
