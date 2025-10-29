import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import DefaultLayout from '../layouts/Default/';
import SingInPage from '@/pages/public/SignIn';
import SignUpPage from '@/pages/public/SignUp';
import ProfilePage from '@/pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    Component: DefaultLayout,
    children: [{ index: true, Component: HomePage }],
  },
  {
    path: '/sign-in',
    Component: DefaultLayout,
    children: [{ index: true, Component: SingInPage }],
  },
  {
    path: '/sign-up',
    Component: DefaultLayout,
    children: [{ index: true, Component: SignUpPage }],
  },
  {
    path: '/perfil',
    Component: DefaultLayout,
    children: [{ index: true, Component: ProfilePage }],
  },
]);

export default router;
