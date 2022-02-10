import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRoute from './layout/PublicRoute';
import PrivateRoute from './layout/PrivateRoute';
import Layout from './layout/AppLayout';
import Profile from './pages/Profile';
import Account from './pages/Account';
import AccountInformation from './pages/Account/Information';
import AccountManagement from './pages/Account/Management';
import AccountSecurity from './pages/Account/Security';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

const App = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="sign-in" element={<SignIn />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="account" element={<Account />}>
            <Route path="information" element={<AccountInformation />} />
            <Route path="security" element={<AccountSecurity />} />
            <Route path="management" element={<AccountManagement />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
