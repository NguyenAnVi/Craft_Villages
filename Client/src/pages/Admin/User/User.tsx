import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Stack, Typography, Pagination } from '@mui/material';
import { NavLink } from 'react-router-dom';
import config from '~/config';
import styles from './User.module.scss';
import Button from '~/components/Button';
import { getAllUser } from "~/features/user/userService"
import { useAppSelector } from '~/app/hooks';
import { ToastHeader } from 'react-bootstrap';
import { error } from 'console';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

type Props = {};

const UserList = (props: Props) => {
  const { user } = useAppSelector((state) => state.auth)
  const [userList, setUserList] = useState([])

  const fetchData = async () => {
    try {
      if (user?.accessToken) {
        const res = await getAllUser(user.accessToken)
        console.log(res.data);

        setUserList(res.data)
      }
    }
    catch (err) {
      console.error(err);
      if (err) {
        toast.error(err.response.data.message);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

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
        <td>chi9ne@gmail.com</td>
        <td>user</td>
        <td>001</td>
        <td>07/04/2023</td>
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
        <h3>Quản lý tài khoản</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button color="green" border="round">
            <NavLink to={config.routesAdmin.adminUserCreate} className={(nav) => cx('navlink', { active: nav.isActive })}>
              Thêm tài khoản
            </NavLink>
          </Button>
        </div>

        <Stack className={cx('stack')} spacing={2}>
          <Typography component={'div'}>
            <table className={cx('table-custom')}>
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>ID</th>
                  <th style={{ width: '10%' }}>Họ và tên</th>
                  <th style={{ width: '10%' }}>Email</th>
                  <th style={{ width: '10%' }}>Role</th>
                  <th style={{ width: '10%' }}>Nông hộ quản lý</th>
                  <th style={{ width: '10%' }}>Ngày tạo</th>
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

export default UserList;
