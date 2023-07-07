import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import styles from './DetailSmallHolder.module.scss';
import left from '~/assets/left.svg';
import right from '~/assets/right.svg';
import { useAppSelector } from '~/app/hooks';
import { getSmallHolder } from '~/features/smallHolder/smallHolderService';

const cx = classNames.bind(styles);

type Props = {};

const DetailSmallHolder = (props: Props) => {
  const { id } = useParams() as { id: string };
  const { user } = useAppSelector((state) => state.auth);

  const [smallHolder, setSmallHolder] = useState([]) as any;

  const fetchData = async () => {
    try {
      if (user?.accessToken) {
        const res = await getSmallHolder(id, user.accessToken);
        // console.log(res.data);

        setSmallHolder(res.data);
      }
    } catch (err) {
      console.error(err);
      if (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <h1>Xóm nghề đan rổ rế truyền thống ở xã Hòa Bình, huyện Chợ Mới</h1>

      <div className={cx('details')}>
        <div className={cx('title')}>
          <img className={cx('line', 'line-left')} src={left} />
          <p>Thông tin nông hộ</p>
          <img className={cx('line', 'line-right')} src={right} />
        </div>
        <div className={cx('detail')}>
          <ul>
            <li>Mã nông hộ: {smallHolder._id}</li>
            <li>Địa chỉ: {smallHolder.address}</li>
            <li>Tên người đại diện: {smallHolder.adminId}</li>
            <li>Số điện thoại: 0386666707 </li>
            <li>Email: chi9ne@gmail.com </li>
            <li>Số nhân công: {smallHolder.quantityWorkders} người</li>
            <li>Chuyên môn: {smallHolder.majorWork}</li>
            <li>Sản phẩm: Rổ rế</li>
            <li>Nguyên liệu: {smallHolder.materials}</li>
            <li>Kinh nghiệm: {smallHolder.exp} năm</li>
            <li>Sản lượng: {smallHolder.quantityProduct} sản phẩm/ngày</li>
          </ul>
        </div>
        <div className={cx('title')}>
          <img className={cx('line', 'line-left')} src={left} />
          <p>Thông tin người làm</p>
          <img className={cx('line', 'line-right')} src={right} />
        </div>
        <div className={cx('detail')}>
          <table>
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Tuổi</th>
                <th>Kinh nghiệm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nguyễn Văn An</td>
                <td>40</td>
                <td>10 năm</td>
              </tr>
              <tr>
                <td>Nguyễn Văn An</td>
                <td>40</td>
                <td>10 năm</td>
              </tr>
              <tr>
                <td>Nguyễn Văn An</td>
                <td>40</td>
                <td>10 năm</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={cx('title')}>
          <img className={cx('line', 'line-left')} src={left} />
          Sản phẩm
          <img className={cx('line', 'line-right')} src={right} />
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
        </div>
      </div>
    </div>
  );
};

export default DetailSmallHolder;
