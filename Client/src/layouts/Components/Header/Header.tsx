import classNames from 'classnames/bind';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  InputGroup,
} from 'react-bootstrap';

import styles from './Header.module.scss';
import config from '~/config';
import { Link, NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx('navbar')}>
      <div className={cx('inner')}>
        <div className={cx('left-header')}>
          <Link to={config.routes.home} className={cx('logo')}>
            CraftVillages
          </Link>
        </div>
        <div className={cx('center-header')}>
          <NavLink to={config.routes.villages} className={cx('navlink')}>
            Làng nghề
          </NavLink>
          <NavLink to={config.routes.products} className={cx('navlink')}>
            Sản phẩm
          </NavLink>
          <NavLink to={config.routes.home} className={cx('navlink')}>
            Giới thiệu
          </NavLink>
          <NavLink to={config.routes.home} className={cx('navlink')}>
            Liên hệ
          </NavLink>
        </div>
        <div className={cx('right-header')}></div>
      </div>
    </div>
  );
}

export default Header;

// eslint-disable-next-line no-lone-blocks
{
  /* <Navbar bg="warning" expand="lg" variant="warning">
  <Container>
    <Navbar.Brand href={config.routes.home}>CraftVillages</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href={config.routes.village}>Nông Hộ</Nav.Link>
        <Nav.Link href={config.routes.product}>Sản Phẩm</Nav.Link>
      </Nav>
      <Form className="d-flex">
        <InputGroup>
          <Button
            className="rounded-pill position-absolute"
            variant="inline-dark"
          >
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </Button>

          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 rounded-pill"
            aria-label="Search"
          />
        </InputGroup>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>; */
}
