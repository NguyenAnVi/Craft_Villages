import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Stack, Typography, Pagination } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { error } from 'console';
import { toast } from 'react-toastify';
import { ToastHeader } from 'react-bootstrap';
import moment from 'moment';

import styles from './User.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import { getAllUser } from '~/features/user/userService';
import { useAppSelector } from '~/app/hooks';

const cx = classNames.bind(styles);

type Props = {};

const UserList = (props: Props) => {
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  const [userList, setUserList] = useState([]);

  const fetchData = async () => {
    try {
      if (user?.accessToken) {
        const res = await getAllUser(user.accessToken);
        // console.log(res.data);

        setUserList(res.data);
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

  const handleDelete = (id: string) => {
    alert(id);
  };

  const [table, setTable] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setTable(value);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('smallholder')}>
        <h3>Quản lý tài khoản</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color="green"
            border="round"
            to={config.routesAdmin.adminUserCreate}
          >
            Thêm tài khoản
          </Button>
        </div>

        <Stack className={cx('stack')} spacing={2}>
          <table className={cx('table-custom')}>
            <thead>
              <tr>
                <th style={{ width: '15%' }}>ID</th>
                <th style={{ width: '20%' }}>FullName</th>
                <th style={{ width: '20%' }}>Email</th>
                <th style={{ width: '10%' }}>Role</th>
                <th style={{ width: '15%' }}>CreatedAt</th>
                <th style={{ width: '10%' }}></th>
                <th style={{ width: '10%' }}></th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item: any, index) => {
                if (index >= (table - 1) * 10 && index < table * 10 - 1) {
                  return (
                    <tr key={index}>
                      <td>{item._id}</td>

                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td>{item.isAdmin ? 'Admin' : 'User'}</td>
                      <td>
                        {moment(Date.parse(item.createdAt)).format(
                          'DD/MM/YYYY',
                        )}
                      </td>
                      <td>
                        <Button
                          color="yellow"
                          border="round"
                          to={`/admin/user/detail/${item._id}`}
                        >
                          Xem chi tiết
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="red"
                          border="round"
                          onClick={() => handleDelete(item._id)}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>

          <Pagination
            className={cx('pagination')}
            count={Math.ceil(userList.length / 10)}
            page={table}
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default UserList;
