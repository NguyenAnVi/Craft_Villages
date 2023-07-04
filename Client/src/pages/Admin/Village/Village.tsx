import classNames from 'classnames/bind';
import { useState } from 'react';
import { Stack, Typography, Pagination } from '@mui/material';

import styles from './Village.module.scss';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

type Props = {};

const Village = (props: Props) => {
  let villages = [];
  const [table, setTable] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setTable(value);
  };

  const handleDelete = () => {
    alert('Deleted!');
  };

  for (let i = 0; i < 30; i++) {
    villages.push(
      <>
        <td>
          #{i}
          {i}
          {i}
          {i}
        </td>
        <td>
          Xóm nghề đan đát rổ truyền thống xã Hòa Bình, huyện Chợ Mới, tỉnh An
          Giang
        </td>
        <td>Ấp A, xã Hòa Bình, huyện Chợ Mới, An Giang</td>
        <td>Đan rổ</td>
        <td>
          <Button
            color="yellow"
            border="round"
            to={config.routesAdmin.adminDetailVillage}
          >
            Xem chi tiết
          </Button>
        </td>
        <td>
          <Button color="red" border="round" onClick={handleDelete}>
            Xóa
          </Button>
        </td>
      </>,
    );
  }

  return (
    <div className={cx('wrapper')}>
      <h3>Quản lý làng nghề</h3>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button color="green" border="round">
          Thêm làng nghề
        </Button>
      </div>
      <Stack className={cx('stack')} spacing={2}>
        <Typography component={'div'}>
          <table className={cx('table-custom')}>
            <thead>
              <tr>
                <th style={{ width: '15%' }}>Mã làng nghề</th>
                <th style={{ width: '25%' }}>Tên làng nghề</th>
                <th style={{ width: '25%' }}>Địa chỉ</th>
                <th style={{ width: '15%' }}>Chuyên môn</th>
                <th style={{ width: '10%' }}></th>
                <th style={{ width: '10%' }}></th>
              </tr>
            </thead>
            <tbody>
              {villages.map((village, index) => {
                if (index >= (table - 1) * 10 && index < table * 10 - 1) {
                  return <tr key={index}>{village}</tr>;
                }
              })}
            </tbody>
          </table>
        </Typography>
        <Pagination
          className={cx('pagination')}
          count={villages.length / 10}
          page={table}
          shape="rounded"
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
};

export default Village;
