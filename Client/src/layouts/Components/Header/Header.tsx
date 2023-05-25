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

import config from '~/config';

function Header() {
  return (
    <>
      <Navbar bg="warning" expand="lg" variant="warning">
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
      </Navbar>
    </>
  );
}

export default Header;
