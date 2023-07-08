import classNames from 'classnames/bind';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';
import Dropzone, { DropzoneState } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useParams } from 'react-router-dom';

import styles from './ProductDetailEdit.module.scss';
import Button from '~/components/Button';
import { updateProduct } from '~/features/product/productSlice';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
const cx = classNames.bind(styles);

type props = {};

export const ProductDetailEdit = (props: props) => {
  const { id } = useParams() as { id: string };

  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [product, setProduct] = useState<any | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const { products } = useAppSelector(
    (state) => state.persistedReducer.products,
  );

  const dispatch = useAppDispatch();

  const handleDrop = (acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setFile(reader.result as string);
    };
  };

  useEffect(() => {
    products.map((product) => {
      if (product._id === id) {
        setProduct(product);
        console.log(product);

        return;
      }
    });
  }, [id, products]);

  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  let productSchema = yup.object().shape({
    name: yup.string(),
    materials: yup.string(),
    price: yup.string(),
    type: yup.string(),
    qrCode: yup.string(),
    description: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      materials: '',
      price: 0,
      type: '',
      qrCode: '',
      description: '',
      // name: product.name as string,
      // materials: product.materials as string,
      // price: product.price as number,
      // type: product.type as string,
      // qrCode: product.qrCode as string,
      // description: product.description as string,
    },
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm }): Promise<void> => {
      try {
        let dataProduct: any = values;
        for (let prop in dataProduct) {
          if (dataProduct.hasOwnProperty(prop) && dataProduct[prop] === '') {
            delete dataProduct[prop];
          }
        }
        dataProduct = file
          ? { avatar: file, ...dataProduct }
          : { ...dataProduct };

        if (user?.accessToken) {
          const dataUpdate = {
            id: id as string,
            data: dataProduct as object,
            token: user.accessToken as string,
          };
          const res = await dispatch(updateProduct(dataUpdate));
          if (res) {
            toast.success(res.payload.message);
            setIsEdit(false);
            resetForm();
          }
        }
      } catch (err) {
        console.log(err);
        if (err) {
          toast.error(err.response.data.message);
        }
        resetForm();
      }
    },
  });
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('heading')}>
          <h2>Thông tin sản phẩm</h2>
          {!isEdit && (
            <Button color="shadeYellow" border="round" onClick={handleIsEdit}>
              Chỉnh sửa
            </Button>
          )}
        </div>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={productSchema}
          onSubmit={() => formik.handleSubmit()}
        >
          <form onSubmit={formik.handleSubmit}>
            <label>
              <h6>Tên sản phẩm:</h6>
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
                  placeholder="ex: Nón lá Việt Nam"
                />
              ) : (
                <p>{product?.name}</p>
              )}
            </label>
            {formik.errors.name && formik.touched.name && (
              <p className={cx('mess-error')}>{formik.errors.name}</p>
            )}
            <label>
              <h6>Chất liệu:</h6>
              {isEdit ? (
                <textarea
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
                  placeholder="ex: Tre"
                />
              ) : (
                <p>{product?.materials}</p>
              )}
            </label>
            {formik.errors.materials && formik.touched.materials && (
              <p className={cx('mess-error')}>{formik.errors.materials}</p>
            )}
            <label>
              <h6>Giá:</h6>
              {isEdit ? (
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.price && formik.touched.price
                      ? cx('input-error')
                      : ''
                  }
                  placeholder=""
                />
              ) : (
                <p>{product?.price}</p>
              )}
            </label>
            {formik.errors.price && formik.touched.price && (
              <p className={cx('mess-error')}>{formik.errors.price}</p>
            )}
            <label>
              <h6>Loại:</h6>
              {isEdit ? (
                <input
                  type="text"
                  name="type"
                  id="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.type && formik.touched.type
                      ? cx('input-error')
                      : ''
                  }
                  placeholder=""
                />
              ) : (
                <p>{product?.type}</p>
              )}
            </label>
            {formik.errors.type && formik.touched.type && (
              <p className={cx('mess-error')}>{formik.errors.type}</p>
            )}
            <label>
              <h6>Value mã QrCode:</h6>
              {isEdit ? (
                <>
                  <input
                    type="text"
                    name="qrCode"
                    id="qrCode"
                    value={formik.values.qrCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.qrCode && formik.touched.qrCode
                        ? cx('input-error')
                        : ''
                    }
                    placeholder=""
                  />
                </>
              ) : (
                <p>{`${product?.qrCode}`}</p>
              )}
            </label>
            <label>
              <h6>Mã nông hộ :</h6>
              <p>{`${product?.smallHolderId}`}</p>
            </label>
            <label>
              {product?.qrCode ? (
                <>
                  <h6>Mã QrCode:</h6>
                  <QRCodeCanvas
                    value={`${product?.qrCode}`}
                    className={cx('qrImage')}
                    size={200}
                    bgColor={'#ffffff'}
                    fgColor={'#000000'}
                    level={'L'}
                    includeMargin={false}
                    imageSettings={{
                      src: '',
                      x: undefined,
                      y: undefined,
                      height: 24,
                      width: 24,
                      excavate: true,
                    }}
                  />
                </>
              ) : (
                ''
              )}
            </label>
            {formik.errors.qrCode && formik.touched.qrCode && (
              <p className={cx('mess-error')}>{formik.errors.qrCode}</p>
            )}

            <label>
              <h6>Mô tả:</h6>
              {isEdit ? (
                <textarea
                  name="description"
                  id="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.description && formik.touched.description
                      ? cx('input-error')
                      : ''
                  }
                  placeholder=""
                />
              ) : (
                <p>{product?.description}</p>
              )}
            </label>
            {formik.errors.description && formik.touched.description && (
              <p className={cx('mess-error')}>{formik.errors.description}</p>
            )}

            {isEdit ? (
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }: DropzoneState) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {file ? (
                        <img
                          className={cx('fileUploadImage')}
                          src={file}
                          alt="preview"
                          style={{ maxWidth: '20%' }}
                        />
                      ) : (
                        <p className={cx('fileUpload')}>
                          <i>
                            Drag and drop an image here or click to select a
                            file
                          </i>
                        </p>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
            ) : (
              <img
                src={product?.avatar}
                className={cx('fileUploadedImage')}
                alt=""
                style={{ maxWidth: '70%' }}
              />
            )}
            {isEdit && (
              <div className={cx('form-btn')}>
                <Button type="submit" color="shadeYellow" border="round">
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
    </>
  );
};

export default ProductDetailEdit;
