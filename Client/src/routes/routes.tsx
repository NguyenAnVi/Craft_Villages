//config
import config from 'src/config';

//Pages
import Home from 'src/pages/Home';
import Village from 'src/pages/Village';
import Product from 'src/pages/Product';

const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.village,
    component: Village,
  },
  {
    path: config.routes.product,
    component: Product,
  },
];

const privateRoutes: never[] = [];

export { publicRoutes, privateRoutes };
