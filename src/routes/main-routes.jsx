import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from '../components/app';

const MainRoutes = () => (
  <Routes>
    <Route path="//*" element={<App />} />
  </Routes>
);

export default MainRoutes;
