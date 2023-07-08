import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import styles from './DetailSmallHolder.module.scss';
import left from '~/assets/left.svg';
import right from '~/assets/right.svg';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { getSmallHolder } from '~/features/smallHolder/smallHolderService';
import { getUser } from '~/features/user/userService';
import { getAllProduct } from '~/features/product/productService';
import { AsyncResource } from 'async_hooks';
import config from '~/config/index';

const cx = classNames.bind(styles);

type Props = {};

const DetailSmallHolder = (props: Props) => {
  const { id } = useParams() as { id: string };
  const { user } = useAppSelector((state) => state.auth);
  const { smallHolders } = useAppSelector(
    (state) => state.persistedReducer.smallHolders,
  );

  const dispatch = useAppDispatch();

  const [smallHolder, setSmallHolder] = useState({}) as any;
  const [productList, setProductList] = useState([]);
  const [workerList, setWorkerList] = useState([]);
  const [adminSmallHolder, setAdminSmallHolder] = useState({}) as any;

  useEffect(() => {
    smallHolders.map(async (smallHolder) => {
      if (smallHolder._id === id) {
        setSmallHolder(smallHolder);
        const res = await getSmallHolder(
          smallHolder._id as string,
          user?.accessToken as string,
        );
        setAdminSmallHolder(res.data.userData);
        setWorkerList(res.data.workerData);
        setProductList(res.data.productData);
        return;
      }
    });
  }, [id]);

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
            <li>Tên người đại diện: {adminSmallHolder.name}</li>
            <li>Số điện thoại: {adminSmallHolder.phone} </li>
            <li>Email: {adminSmallHolder.email} </li>
            <li>Số nhân công: {smallHolder.workersId?.length} người</li>
            <li>Chuyên môn: {smallHolder.majorWork}</li>
            <li>
              Nguyên liệu:
              {smallHolder.materials?.map((item: string) => `${item} `) &&
                ' Chưa rõ'}
            </li>
            <li>Kinh nghiệm: {smallHolder.exp}</li>
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
                <th>Giới tính</th>
                <th>Tuổi</th>
                <th>Kinh nghiệm</th>
              </tr>
            </thead>
            <tbody>
              {workerList.map((worker: any) => {
                return (
                  <tr key={worker._id}>
                    <td>{worker.fullName}</td>
                    <td>{worker.gender}</td>
                    <td>{worker.age}</td>
                    <td>{worker.exp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={cx('title')}>
          <img className={cx('line', 'line-left')} src={left} />
          Sản phẩm
          <img className={cx('line', 'line-right')} src={right} />
        </div>
        <div className={cx('products')}>
          {productList.map((product: any) => {
            return (
              <Link
                className={cx('product-item')}
                to={config.routes.productD + product._id}
                key={product._id}
              >
                <img
                  className={cx('product-image')}
                  src={product.avatar}
                  alt=""
                />
                <div className={cx('product-link')}>Xem chi tiết</div>
                <div className={cx('product-title')}>{product.name}</div>
                <div className={cx('product-quantity')}>
                  {product.price?.toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailSmallHolder;
