import { Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import AdminLayout from '~/layouts/AdminLayout';

function App() {
  const isAdmin = true;

  return (
    <div className="App">
      <Routes>
        {isAdmin
          ? privateRoutes.map((route, index) => {
              let Page = route.component;
              let Layout = AdminLayout;

              if (!route.admin) {
                Layout = DefaultLayout;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })
          : publicRoutes.map((route, index) => {
              let Page = route.component;
              let Layout = DefaultLayout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
      </Routes>
    </div>
  );
}

export default App;
