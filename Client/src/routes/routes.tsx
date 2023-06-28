//config
import config from '~/config';

//Pages
import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Village from '~/pages/Village';
import AdminSmallHolder from '~/pages/Admin/SmallHolder';
import AdminOrders from '~/pages/Admin/Orders';
import DetailVillage from '~/pages/DetailVillage';
import Product from '~/pages/Product';
import Introduce from '~/pages/Introduce';
import Contact from '~/pages/Contact';

const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.signin,
    component: SignIn,
  },
  {
    path: config.routes.signup,
    component: SignUp,
  },
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.villages,
    component: Village,
  },
  {
    path: config.routes.detailvillage,
    component: DetailVillage,
  },
  {
    path: config.routes.products,
    component: Product,
  },
  {
    path: config.routes.introduce,
    component: Introduce,
  },
  {
    path: config.routes.contact,
    component: Contact,
  },
];

const privateRoutes = [
  {
    path: config.routes.adminSmallHolder,
    component: AdminSmallHolder,
    admin: true,
  },
  {
    path: config.routes.adminOrders,
    component: AdminOrders,
    admin: true,
  },
  ...publicRoutes.map((a) => ({ ...a, admin: false })),
];

export { publicRoutes, privateRoutes };
