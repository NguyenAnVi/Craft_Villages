import classNames from 'classnames/bind';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';

import styles from './SmallHolderDetail.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

type Props = {};

const Village = (props: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {});

  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  let smallHolderSchema = yup.object().shape({
    name: yup.string().required('Tên nông hộ không được trống'),
    address: yup.string().required('Địa chỉ không được trống'),
    username: yup.string().required('Tên người đại diện không được trống'),
    phone: yup.string().required('Số điện thoại không được trống'),
    email: yup
      .string()
      .email('Nhập sai định dạng email')
      .required('Email không được trống'),
    major: yup.string().required('Chuyên môn không được trống'),
    labornumber: yup.number().required('Số nhân công không được trống'),
    materials: yup.string().required('Chất liệu không được trống'),
    images: yup.string().required('Sản phẩm cần phải thêm'),
    QR: yup.string().required(),
    introduction: yup.string().required('Giới thiệu không được trống'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      username: '',
      phone: '',
      email: '',
      major: '',
      laborNumber: 0,
      materials: '',
      images: '',
      QR: '',
      introduction: '',
    },
    validationSchema: smallHolderSchema,
    onSubmit: (values): void => {
      console.log('Form data', values);
    },
  });
  return (
    <div className={cx('wrapper')}>
      <div className={cx('heading')}>
        <h2>
          Xóm nghề đan đát rổ truyền thống xã Hòa Bình, huyện Chợ Mới, tỉnh An
          Giang
        </h2>
        {!isEdit && (
          <Button color="shadeYellow" border="round" onClick={handleIsEdit}>
            Chỉnh sửa
          </Button>
        )}
      </div>
      <Formik
        initialValues={formik.initialValues}
        validationSchema={smallHolderSchema}
        onSubmit={() => formik.handleSubmit()}
      >
        <form>
          <label>
            <h6>Tên nông hộ:</h6>
            {isEdit ? (
              <textarea
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.name && formik.touched.name
                    ? cx('input-error')
                    : ''
                }
                placeholder="Xóm nghề đan đát rổ truyền thống xã Hòa Bình, huyện Chợ Mới, tỉnh An Giang"
              />
            ) : (
              <p>
                Xóm nghề đan đát rổ truyền thống xã Hòa Bình, huyện Chợ Mới,
                tỉnh An Giang
              </p>
            )}
          </label>
          {formik.errors.name && formik.touched.name && (
            <p className={cx('mess-error')}>{formik.errors.name}</p>
          )}
          <label>
            <h6>Địa chỉ nông hộ:</h6>
            {isEdit ? (
              <textarea
                name="address"
                id="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.address && formik.touched.address
                    ? cx('input-error')
                    : ''
                }
                placeholder="Ấp A, xã Hòa Bình, huyện Chợ Mới, An Giang"
              />
            ) : (
              <p>Ấp A, xã Hòa Bình, huyện Chợ Mới, An Giang</p>
            )}
          </label>
          {formik.errors.address && formik.touched.address && (
            <p className={cx('mess-error')}>{formik.errors.address}</p>
          )}
          <label>
            <h6>Tên người đại diện:</h6>
            {isEdit ? (
              <input
                type="text"
                name="username"
                id="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.username && formik.touched.username
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            ) : (
              <p>Chưa cập nhật</p>
            )}
          </label>
          {formik.errors.username && formik.touched.username && (
            <p className={cx('mess-error')}>{formik.errors.username}</p>
          )}
          <label>
            <h6>Số điện thoại người đại diện:</h6>
            {isEdit ? (
              <input
                type="text"
                name="phone"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.phone && formik.touched.phone
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            ) : (
              <p>Chưa cập nhật</p>
            )}
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <p className={cx('mess-error')}>{formik.errors.phone}</p>
          )}
          <label>
            <h6>Email người đại diện:</h6>
            {isEdit ? (
              <input
                type="text"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.email && formik.touched.email
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            ) : (
              <p>Chưa cập nhật</p>
            )}
          </label>
          {formik.errors.email && formik.touched.email && (
            <p className={cx('mess-error')}>{formik.errors.email}</p>
          )}
          <label>
            <h6>Chuyên môn nông hộ:</h6>
            {isEdit ? (
              <input
                type="text"
                name="major"
                id="major"
                value={formik.values.major}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.major && formik.touched.major
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            ) : (
              <p>Chưa cập nhật</p>
            )}
          </label>
          {formik.errors.major && formik.touched.major && (
            <p className={cx('mess-error')}>{formik.errors.major}</p>
          )}
          <label>
            <h6>Số nhân công:</h6>
            {isEdit ? (
              <input
                type="text"
                name="laborNumber"
                id="laborNumber"
                value={formik.values.laborNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.laborNumber && formik.touched.laborNumber
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            ) : (
              <p>Chưa cập nhật</p>
            )}
          </label>
          {formik.errors.laborNumber && formik.touched.laborNumber && (
            <p className={cx('mess-error')}>{formik.errors.laborNumber}</p>
          )}
          <label>
            <h6>Chất liệu sử dụng:</h6>
            {isEdit ? (
              <input
                type="text"
                name="materials"
                id="materials"
                value={formik.values.materials}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.materials && formik.touched.materials
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            ) : (
              <p>Chưa cập nhật</p>
            )}
          </label>
          {formik.errors.materials && formik.touched.materials && (
            <p className={cx('mess-error')}>{formik.errors.materials}</p>
          )}
          <label>
            <h6>Ảnh nông hộ:</h6>
            {isEdit ? (
              <div className={cx('thumbnails')}>
                <div className={cx('images')}>
                  <img src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg" />
                  <img src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg" />
                </div>
                <input
                  type="file"
                  name="images"
                  id="images"
                  value={formik.values.images}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.images && formik.touched.images
                      ? cx('input-error', 'custom-file-input')
                      : cx('custom-file-input')
                  }
                />
              </div>
            ) : (
              <div className={cx('thumbnails')}>
                <div className={cx('images')}>
                  <img src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg" />
                  <img src="https://lzd-img-global.slatic.net/g/p/97b7e675dd7c37d52d8cd11e38c4654a.jpg_720x720q80.jpg" />
                </div>
              </div>
            )}
          </label>
          {formik.errors.images && formik.touched.images && (
            <p className={cx('mess-error')}>{formik.errors.images}</p>
          )}
          <label>
            <h6>Giới thiệu:</h6>
            {isEdit ? (
              <textarea
                name="introduction"
                id="introduction"
                value={formik.values.introduction}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.introduction && formik.touched.introduction
                    ? cx('input-error')
                    : ''
                }
                placeholder=""
              />
            ) : (
              <p>Chưa cập nhật</p>
            )}
          </label>
          {formik.errors.introduction && formik.touched.introduction && (
            <p className={cx('mess-error')}>{formik.errors.introduction}</p>
          )}
          {isEdit && (
            <div className={cx('form-btn')}>
              <Button
                type="submit"
                color="shadeYellow"
                border="round"
                onClick={handleIsEdit}
              >
                Lưu
              </Button>
              <Button color="secondary" border="round" onClick={handleIsEdit}>
                Hủy
              </Button>
            </div>
          )}
        </form>
      </Formik>
    </div>
  );
};

export default Village;
