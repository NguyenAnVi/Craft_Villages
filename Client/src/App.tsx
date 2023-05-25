import { Routes, Route } from 'react-router-dom';

import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';

function App() {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
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
