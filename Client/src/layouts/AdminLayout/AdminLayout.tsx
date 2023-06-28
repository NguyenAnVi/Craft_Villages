import classNames from 'classnames/bind';

import Sidebar from '~/layouts/Components/Sidebar';
import styles from './AdminLayout.module.scss';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
}

function AdminLayout({ children }: Props) {
  return (
    <div className={cx('container')}>
      <Sidebar />
      <div className={cx('content')}>{children}</div>
    </div>
  );
}

export default AdminLayout;
