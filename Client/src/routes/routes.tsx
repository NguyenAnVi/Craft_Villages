//config
import config from '~/config';

//Pages

//Guest
import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Village from '~/pages/Village';
import Product from '~/pages/Product';
import ProductDetail from '~/pages/Product/ProductDetail';
import Introduce from '~/pages/Introduce';
import Contact from '~/pages/Contact';
import DetailVillage from '~/pages/Village/components/DetailVillage';
import DetailSmallHolder from '~/pages/DetailSmallHolder';

//Admin
import AdminMail from '~/pages/Admin/Mail';
import AdminOrders from '~/pages/Admin/Orders';
import AdminProduct from '~/pages/Admin/Product';
import AdminReport from '~/pages/Admin/Report';
import AdminVillage from '~/pages/Admin/Village';
import AdminDetailVillage from '~/pages/Admin/Village/components/DetailVillage';
import AdminSmallHolder from '~/pages/Admin/SmallHolder';
import AdminUser from '~/pages/Admin/User';
import AdminUserDetail from '~/pages/Admin/User/components/UserDetail';
import AdminUserCreate from '~/pages/Admin/User/components/UserCreate';

// AdminSmallHolder

import adminSmallHolderMainDetail from '~/pages/AdminSmallHolder/SmallHolder';
import adminSmallHolderProduct from '~/pages/AdminSmallHolder/Product';
import adminSmallHolderProductCreate from '~/pages/AdminSmallHolder/Product/components/ProductCreate';
import { adminSmallHolderProductDetailEdit } from '~/pages/AdminSmallHolder/Product/components/ProductDetailEdit';
import adminSmallHolderWorkers from '~/pages/AdminSmallHolder/Workers';
import adminSmallHolderWorkersCreate from '~/pages/AdminSmallHolder/Workers/components/WorkersCreate';
import adminSmallHolderWorkersDetailEdit from '~/pages/AdminSmallHolder/Workers/components/WorkersDetailEdit';
import adminSmallHolderUserDetail from '~/pages/AdminSmallHolder/User';
import adminSmallHolderMail from '~/pages/AdminSmallHolder/Mail';
// import adminSmallHolderReport from '~/pages/AdminSmallHolder/Report';

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
    path: config.routes.detailVillage,
    component: DetailVillage,
  },
  {
    path: config.routes.detailSmallHolder,
    component: DetailSmallHolder,
  },
  {
    path: config.routes.products,
    component: Product,
  },
  {
    path: config.routes.productDetail,
    component: ProductDetail,
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
    path: config.routesAdmin.adminMail,
    component: AdminMail,
    admin: true,
  },
  {
    path: config.routesAdmin.adminOrders,
    component: AdminOrders,
    admin: true,
  },
  {
    path: config.routesAdmin.adminProduct,
    component: AdminProduct,
    admin: true,
  },
  {
    path: config.routesAdmin.adminReport,
    component: AdminReport,
    admin: true,
  },
  {
    path: config.routesAdmin.adminVillage,
    component: AdminVillage,
    admin: true,
  },
  {
    path: config.routesAdmin.adminDetailVillage,
    component: AdminDetailVillage,
    admin: true,
  },
  {
    path: config.routesAdmin.adminSmallHolder,
    component: AdminSmallHolder,
    admin: true,
  },
  {
    path: config.routesAdmin.adminUser,
    component: AdminUser,
    admin: true,
  },
  {
    path: config.routesAdmin.adminUserDetail,
    component: AdminUserDetail,
    admin: true,
  },
  {
    path: config.routesAdmin.adminUserCreate,
    component: AdminUserCreate,
    admin: true,
  },
  ...publicRoutes.map((a) => ({ ...a, admin: false })),
];

const privateRoutesAdminSmallHolder = [
  {
    path: config.routesAdminSmallHolder.adminSmallHolderMainDetail,
    component: adminSmallHolderMainDetail,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderMail,
    component: adminSmallHolderMail,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderProduct,
    component: adminSmallHolderProduct,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderProductCreate,
    component: adminSmallHolderProductCreate,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderProductDetailEdit,
    component: adminSmallHolderProductDetailEdit,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderWorkers,
    component: adminSmallHolderWorkers,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderWorkersCreate,
    component: adminSmallHolderWorkersCreate,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderWorkersDetailEdit,
    component: adminSmallHolderWorkersDetailEdit,
    admin: true,
  },
  // {
  //   path: config.routesAdminSmallHolder.adminSmallHolderReport,
  //   components: adminSmallHolderReport,
  //   admin: true,
  // },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderUserDetail,
    component: adminSmallHolderUserDetail,
    admin: true,
  },
  ...publicRoutes.map((a) => ({ ...a, admin: false })),
];

export { publicRoutes, privateRoutes, privateRoutesAdminSmallHolder };
