import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import DefaultLayout from '../layouts/Default/';

const router = createBrowserRouter([
  {
    path: '/',
    Component: DefaultLayout,
    children: [{ index: true, Component: HomePage }],
  },
]);

export default router;
