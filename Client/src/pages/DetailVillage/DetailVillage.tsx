import classNames from 'classnames/bind';

import styles from './DetailVillage.module.scss';
import left from '~/assets/left.svg';
import right from '~/assets/right.svg';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

type Props = {};

const DetailSmallHolder = (props: Props) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('heading')}>
        <div className={cx('image-cropper')}>
          <img
            src="https://langthangangiang.net/wp-content/uploads/2022/12/1-1024x576.jpg"
            alt=""
          />
        </div>
        <h1>Xóm nghề đan rổ rế truyền thống ở xã Hòa Bình, huyện Chợ Mới</h1>
      </div>
      <div className={cx('detail-body')}>
        <div className={cx('title')}>
          <img className={cx('line', 'line-left')} src={left} />
          <p>Giới thiệu về làng nghề</p>
          <img className={cx('line', 'line-right')} src={right} />
        </div>
        <div className={cx('details')}>
          <div className={cx('detail')}>
            <ul>
              <li>Ngày thành lập: 12/9/2016</li>
              <li>Chuyên môn: Đan đát</li>
              <li>Nguyên liệu: Tre, trúc, mây</li>
              <li>Số thành viên: 20 hộ dân</li>
              <li>Địa chỉ: Ấp A, xã Hòa Bình, huyện Chợ Mới, tỉnh An Giang</li>
              <li>Số điện thoại: 0386666707 (chị 9 Nê) </li>
            </ul>
            <img
              src="https://langthangangiang.net/wp-content/uploads/2022/12/1-1024x576.jpg"
              alt=""
            ></img>
          </div>
          <div className={cx('detail')}>
            <img
              src="https://langthangangiang.net/wp-content/uploads/2022/12/1-1024x576.jpg"
              alt=""
            />
            <div className={cx('description')}>
              <p>
                Nghề đan đát Hoà Bình có từ rất lâu rồi, nhiều ông bà làm nghề
                này từ 50-60 năm về trước, các gia đình đan đát rổ rế ở đây tập
                trung chủ yếu ở các khu dân cư xung quanh Nhà thờ Cái Đôi.
              </p>
              <p>
                Nguồn nguyên liệu chủ yếu xóm nghề sử dụng là các vật liệu có
                sẵn ở địa phương như tre, trúc,...
              </p>
            </div>
          </div>
          <div className={cx('detail')}>
            <div className={cx('description')}>
              <p>
                Xóm nghề chuyên sản xuất các sản phẩm như rổ, rế, xề,... cung
                cấp cho địa phương và một số tỉnh thành khác.
              </p>
              <p>
                Mỗi sản phẩm của làng nghề đan đát đều toát lên cái hồn quê qua
                sự khéo léo của người thợ. Họ trau chuốt, tỉ mỉ đến từng chi
                tiết, các sản phẩm rất chắc và bền, “tuổi thọ” có thể lên đến 5
                hoặc 10 năm.
              </p>
            </div>
            <img
              src="https://langthangangiang.net/wp-content/uploads/2022/12/1-1024x576.jpg"
              alt=""
            />
          </div>
        </div>
        <div className={cx('title')}>
          <img className={cx('line')} src={left} />
          Thành tích
          <img className={cx('line')} src={right} />
        </div>
        <div className={cx('achievement')}>
          <div className={cx('achievement-subtitle')}>
            Trong 3 năm qua, làng nghề đã đạt được các thành tích nổi trội như:
          </div>
          <div className={cx('achievement-item-wrap')}>
            <div className={cx('achievement-item')}>
              <p>Sản lượng</p>
              <p className={cx('achievement-item-number')}>45-55</p>
              <p>Sản phẩm/ ngày</p>
            </div>
            <div className={cx('achievement-item')}>
              <p>Sản xuất</p>
              <p className={cx('achievement-item-number')}>12345</p>
              <p>Sản phẩm</p>
            </div>
            <div className={cx('achievement-item')}>
              <p>Xuất khẩu</p>
              <p className={cx('achievement-item-number')}>4</p>
              <p>Quốc gia</p>
            </div>
          </div>
        </div>
        <div className={cx('title')}>
          <img className={cx('line')} src={left} />
          Sản phẩm chính
          <img className={cx('line')} src={right} />
        </div>
        <div className={cx('products')}>
          <Link className={cx('product-item')} to="#">
            <img
              className={cx('product-image')}
              src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg"
              alt=""
            />
            <div className={cx('product-link')}>Xem chi tiết</div>
            <div className={cx('product-title')}>Giỏ mây</div>
            <div className={cx('product-quantity')}>39.000đ</div>
          </Link>
          <Link className={cx('product-item')} to="#">
            <img
              className={cx('product-image')}
              src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg"
              alt=""
            />
            <div className={cx('product-link')}>Xem chi tiết</div>
            <div className={cx('product-title')}>Giỏ mây</div>
            <div className={cx('product-quantity')}>39.000đ</div>
          </Link>
          <Link className={cx('product-item')} to="#">
            <img
              className={cx('product-image')}
              src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg"
              alt=""
            />
            <div className={cx('product-link')}>Xem chi tiết</div>
            <div className={cx('product-title')}>Giỏ mây</div>
            <div className={cx('product-quantity')}>39.000đ</div>
          </Link>
          <Link className={cx('product-item')} to="#">
            <img
              className={cx('product-image')}
              src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg"
              alt=""
            />
            <div className={cx('product-link')}>Xem chi tiết</div>
            <div className={cx('product-title')}>Giỏ mây</div>
            <div className={cx('product-quantity')}>39.000đ</div>
          </Link>
          <Link className={cx('product-item')} to="#">
            <img
              className={cx('product-image')}
              src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg"
              alt=""
            />
            <div className={cx('product-link')}>Xem chi tiết</div>
            <div className={cx('product-title')}>Giỏ mây</div>
            <div className={cx('product-quantity')}>39.000đ</div>
          </Link>
        </div>
        <div className={cx('title')}>
          <img className={cx('line')} src={left} />
          Hình ảnh nổi bật
          <img className={cx('line')} src={right} />
        </div>
        <div className={cx('village-images')}></div>
      </div>
    </div>
  );
};

export default DetailSmallHolder;
