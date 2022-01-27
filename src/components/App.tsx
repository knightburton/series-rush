import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRoute from './layout/PublicRoute';
import PrivateRoute from './layout/PrivateRoute';
import Layout from './layout/AppLayout';
import Account from './pages/Account';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

const App = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
