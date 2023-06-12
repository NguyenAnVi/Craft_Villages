//config
import config from '~/config';

//Pages
import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Village from '~/pages/Village';
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

const privateRoutes: never[] = [];

export { publicRoutes, privateRoutes };
