import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Stack, Typography, Pagination } from '@mui/material';

import styles from './SmallHolder.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

type Props = {};

const SmallHolderList = (props: Props) => {
  let smallHolders = [];
  const [table, setTable] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setTable(value);
  };

  for (let i = 0; i < 30; i++) {
    smallHolders.push(
      <>
        <td>
          #{i}
          {i}
          {i}
          {i}
        </td>

        <td>chị 9 Nê</td>
        <td>0386666707</td>
        <td>chi9ne@gmail.com</td>
        <td>10 người</td>
        <td>Tre, trúc, mây</td>
        <td>5 sản phẩm/ngày</td>
        <td>
          <Button color="yellow" border="round">
            Xem chi tiết
          </Button>
        </td>
        <td>
          <Button color="red" border="round">
            Xóa
          </Button>
        </td>
      </>,
    );
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('smallholder')}>
        <h3>Quản lý nông hộ</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button color="green" border="round">
            Thêm nông hộ
          </Button>
        </div>

        <Stack className={cx('stack')} spacing={2}>
          <Typography component={'div'}>
            <table className={cx('table-custom')}>
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>Mã nông hộ</th>
                  <th style={{ width: '12%' }}>Người đại diện</th>
                  <th style={{ width: '10%' }}>Số điện thoại</th>
                  <th style={{ width: '10%' }}>Email</th>
                  <th style={{ width: '10%' }}>Số thành viên</th>
                  <th style={{ width: '10%' }}>Nguyên liệu</th>
                  <th style={{ width: '10%' }}>Sản lượng</th>
                  <th style={{ width: '10%' }}></th>
                  <th style={{ width: '10%' }}></th>
                </tr>
              </thead>
              <tbody>
                {smallHolders.map((item, index) => {
                  if (index >= (table - 1) * 10 && index < table * 10 - 1) {
                    return <tr key={index}>{item}</tr>;
                  }
                })}
              </tbody>
            </table>
          </Typography>
          <Pagination
            className={cx('pagination')}
            count={smallHolders.length / 10}
            page={table}
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default SmallHolderList;
