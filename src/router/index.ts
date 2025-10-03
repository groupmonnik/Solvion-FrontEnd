import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import DefaultLayout from '../layouts/Default/';
import SignUpPage from '@/pages/public/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    Component: DefaultLayout,
    children: [{ index: true, Component: HomePage }],
  },
  {
    path: '/sign-up',
    Component: DefaultLayout,
    children: [{ index: true, Component: SignUpPage }],
  },
]);

export default router;
