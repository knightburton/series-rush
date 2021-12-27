import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/AppLayout';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

const App = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
