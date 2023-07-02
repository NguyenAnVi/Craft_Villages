//config
import config from '~/config';

//Pages

//Guest
import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Village from '~/pages/Village';
import Product from '~/pages/Product';
import Introduce from '~/pages/Introduce';
import Contact from '~/pages/Contact';
import DetailVillage from '~/pages/DetailVillage';

//Admin
import AdminMail from '~/pages/Admin/Mail';
import AdminOrders from '~/pages/Admin/Orders';
import AdminProduct from '~/pages/Admin/Product';
import AdminReport from '~/pages/Admin/Report';
import AdminDetailVillage from '~/pages/Admin/Village/components/DetailVillage';
import AdminUser from '~/pages/Admin/User';
import AdminUserCreate from '~/pages/Admin/User/components/UserCreate';

// AdminSmallHolder

import adminSmallHolderMain from '~/pages/AdminSmallHolder/SmallHolder';
import adminSmallHolderMainDetail from '~/pages/AdminSmallHolder/SmallHolder/components/SmallHolderDetail';
import adminSmallHolderMainEdit from '~/pages/AdminSmallHolder/SmallHolder/components/SmallHolderEdit';
import adminSmallHolderMail from '~/pages/AdminSmallHolder/Mail';
import adminSmallHolderReport from '~/pages/AdminSmallHolder/Report';
import adminSmallHolderProduct from '~/pages/AdminSmallHolder/Product';
import adminSmallHolderProductEdit from '~/pages/AdminSmallHolder/Product/components/ProductEdit';
import adminSmallHolderProductDetail from '~/pages/AdminSmallHolder/Product/components/ProductDetail';
import adminSmallHolderUser from '~/pages/AdminSmallHolder/User';
import adminSmallHolderUserEdit from '~/pages/AdminSmallHolder/User/components/UserEdit';
import adminSmallHolderUserDetail from '~/pages/AdminSmallHolder/User/components/UserDetail';

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
    path: config.routesAdmin.adminDetailVillage,
    component: AdminDetailVillage,
    admin: true,
  },
  {
    path: config.routesAdmin.adminUser,
    component: AdminUser,
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
    path: config.routesAdminSmallHolder.adminSmallHolderMail,
    component: adminSmallHolderMain,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderMainDetail,
    component: adminSmallHolderMainDetail,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderMainEdit,
    component: adminSmallHolderMainEdit,
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
    path: config.routesAdminSmallHolder.adminSmallHolderProductDetail,
    component: adminSmallHolderProductDetail,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderReport,
    components: adminSmallHolderReport,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderProductEdit,
    component: adminSmallHolderProductEdit,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderUser,
    component: adminSmallHolderUser,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderUserDetail,
    component: adminSmallHolderUserDetail,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderUserEdit,
    component: adminSmallHolderUserEdit,
    admin: true,
  },
  ...publicRoutes.map((a) => ({ ...a, admin: false })),
];

export { publicRoutes, privateRoutes, privateRoutesAdminSmallHolder };
