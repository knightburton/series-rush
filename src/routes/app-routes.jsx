import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Landing from '../components/pages/landing';
import SignIn from '../components/pages/sign-in';
import SignUp from '../components/pages/sign-up';
import ForgotPassword from '../components/pages/forgot-password';

import Profile from '../components/pages/profile';
import PersonalInformation from '../components/pages/profile/personal-information';
import ChangePassword from '../components/pages/profile/change-password';
import DangerZone from '../components/pages/profile/danger-zone';

import Dashboard from '../components/pages/dashboard';

import CollectionsView from '../components/pages/collections/collections-view';
import CollectionsEdit from '../components/pages/collections/collections-edit';

import Search from '../components/pages/search';

import ProtectedRoute from './protected-route';

import { APP_PATHS } from '../constants/paths';

const AppRoutes = () => (
  <Routes>
    <Route exact path={APP_PATHS.LANDING.path} element={<Landing />} />
    <ProtectedRoute exact reverse path={APP_PATHS.SIGN_IN.path} element={<SignIn />} />
    <ProtectedRoute exact reverse path={APP_PATHS.SIGN_UP.path} element={<SignUp />} />
    <ProtectedRoute exact reverse path={APP_PATHS.FORGOT_PASSWORD.path} element={<ForgotPassword />} />
    <ProtectedRoute exact path={APP_PATHS.DASHBOARD.path} element={<Dashboard />} />

    <ProtectedRoute path={APP_PATHS.PROFILE.path} element={<Profile />}>
      <Route path={APP_PATHS.PROFILE_PERSONAL_INFORMATION.path} element={<PersonalInformation />} />
      <Route path={APP_PATHS.PROFILE_CHANGE_PASSWORD.path} element={<ChangePassword />} />
      <Route path={APP_PATHS.PROFILE_DANGER_ZONE.path} element={<DangerZone />} />
      <Navigate to={APP_PATHS.PROFILE_PERSONAL_INFORMATION.to} replace />
    </ProtectedRoute>

    <ProtectedRoute path={APP_PATHS.COLLECTIONS.path} element={<Outlet />}>
      <Route path={APP_PATHS.COLLECTIONS_TYPE.path} element={<Outlet />}>
        <Route exact path="/" element={<CollectionsView />} />
        <Route exact path={APP_PATHS.COLLECTIONS_EDIT.path} element={<CollectionsEdit />} />
      </Route>
      <Navigate to={APP_PATHS.COLLECTIONS_TV.to} replace />
    </ProtectedRoute>

    <ProtectedRoute path={APP_PATHS.SEARCH.path} element={<Search />} />
    <Navigate to={APP_PATHS.LANDING.to} replace />
  </Routes>
);

export default AppRoutes;
